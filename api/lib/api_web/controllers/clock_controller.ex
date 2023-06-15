defmodule ApiWeb.ClockController do
  use ApiWeb, :controller

  alias Api.Account
  alias Api.Account.Clock

  action_fallback ApiWeb.FallbackController

  def index(conn, _params) do
    clocks = Account.list_clocks()
    render(conn, "index.json", clocks: clocks)
  end

  def create(conn, %{"userId" => userId}) do
    isClockExists = Account.is_exist_clock!(userId)
    time = NaiveDateTime.local_now
    cond do
      isClockExists ->
        clock = Account.get_clock!(userId)
        if clock.status == true do
          Account.create_workingtime(%{start: clock.time, end: time, user: userId})
        end
        Account.update_clock(clock, %{time: time, status: !clock.status})
        newClock = Account.get_clock!(userId)
        render(conn, "show.json", clock: newClock)
      !isClockExists ->
        with {:ok, %Clock{} = clock}<- Account.create_clock(%{time: time, user: userId}) do
          conn
          |> put_status(:created)
          |> render("show.json", clock: clock)
        end
      end
  end

  def show(conn, %{"userId" => userId}) do
    clock = Account.get_clock!(userId)
    render(conn, "show.json", clock: clock)
  end

  def update(conn, %{"id" => id, "clock" => clock_params}) do
    clock = Account.get_clock!(id)

    with {:ok, %Clock{} = clock} <- Account.update_clock(clock, clock_params) do
      render(conn, "show.json", clock: clock)
    end
  end

  def delete(conn, %{"id" => id}) do
    clock = Account.get_clock!(id)

    with {:ok, %Clock{}} <- Account.delete_clock(clock) do
      send_resp(conn, :no_content, "")
    end
  end
    end
