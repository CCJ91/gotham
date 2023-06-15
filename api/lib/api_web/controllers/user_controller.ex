defmodule ApiWeb.UserController do
  use ApiWeb, :controller

  alias Api.Account
  alias Api.Account.User

  action_fallback ApiWeb.FallbackController

  def teams(conn, %{"userId" => userId}) do
    user = Account.get_user!(userId)

    res = Enum.reduce user.teams, [], fn x, valx ->
      users = Account.get_teams(%{"team" => x})
      team = Enum.reduce users, [], fn y, valy ->
        valy ++ [y.id]
      end
      valx ++ [%{x => team}]
    end
    render(conn, "teams.json", teams: res)
  end

  def index(conn, %{"email" => email, "username" => username}) do
    users = Account.get_listuser(%{"email" => email, "username" => username})
    render(conn, "index.json", users: users)
  end

  def index(conn, %{"email" => email}) do
    users = Account.get_listuser(%{"email" => email})
    render(conn, "index.json", users: users)
  end

  def index(conn, %{"username" => username}) do
    users = Account.get_listuser(%{"username" => username})
    render(conn, "index.json", users: users)
  end

  def index(conn, _params) do
    users = Account.get_listuser()
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Account.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Account.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Account.get_user!(id)
    with {:ok, %User{} = user} <- Account.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Account.get_user!(id)
    with {:ok, %User{}} <- Account.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
