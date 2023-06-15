defmodule ApiWeb.WorkingtimeController do
  use ApiWeb, :controller

  alias Api.Account
  alias Api.Account.Workingtime

  action_fallback ApiWeb.FallbackController

  def index(conn, %{"userId" => userId, "start" => start, "end" => endTime}) do
    workingtimes = Account.get_listworkingtimes(%{"userId" => userId, "start" => start, "end" => endTime})
    render(conn, "index.json", workingtimes: workingtimes)
  end

  def index(conn, %{"userId" => userId, "start" => start}) do
    workingtimes = Account.get_listworkingtimes(%{"userId" => userId, "start" => start})
    render(conn, "index.json", workingtimes: workingtimes)
  end

  def index(conn, %{"userId" => userId, "end" => endTime}) do
    workingtimes = Account.get_listworkingtimes(%{"userId" => userId, "end" => endTime})
    render(conn, "index.json", workingtimes: workingtimes)
  end

  def index(conn, %{"userId" => userId}) do
    workingtimes = Account.get_listworkingtimes(%{"userId" => userId})
    render(conn, "index.json", workingtimes: workingtimes)
  end

  def index(conn, _params) do
    workingtimes = Account.get_listworkingtimes()
    render(conn, "index.json", workingtimes: workingtimes)
  end

  def create(conn, %{"workingtime" => workingtime_params, "userId" => userId}) do
    completed_params = Map.put(workingtime_params, "user", userId)
    with {:ok, %Workingtime{} = workingtime} <- Account.create_workingtime(completed_params) do
      conn
      |> put_status(:created)
      |> render("show.json", workingtime: workingtime)
    end
  end

  def show(conn, %{"id" => id, "userId" => userId}) do
    workingtime = Account.get_workingtime_by_user(userId, id)
    render(conn, "show.json", workingtime: workingtime)
  end

  def update(conn, %{"id" => id, "workingtime" => workingtime_params}) do
    workingtime = Account.get_workingtime!(id)
    with {:ok, %Workingtime{} = workingtime} <- Account.update_workingtime(workingtime, workingtime_params) do
      render(conn, "show.json", workingtime: workingtime)
    end
  end

  def delete(conn, %{"id" => id}) do
    workingtime = Account.get_workingtime!(id)
    with {:ok, %Workingtime{}} <- Account.delete_workingtime(workingtime) do
      send_resp(conn, :no_content, "")
    end
  end
end
