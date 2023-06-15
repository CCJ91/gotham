defmodule Api.Account.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Api.AuthTokens.AuthToken

  @derive {Jason.Encoder, except: [:__meta__, :auth_tokens, :password]}
  schema "users" do
    field :email, :string
    field :username, :string
    field :password, :string
    field :role, Ecto.Enum, values: [:ADMIN, :USER], default: :USER
    field :teams, {:array, :integer}

    has_many :auth_tokens, AuthToken

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :email, :password, :role, :teams])
    |> validate_required([:username, :email, :password])
    |> validate_format(:email, ~r/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    |> validate_format(:password, ~r/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*.\/?&])[A-Za-z\d@$!%*.\/?&]{8,}$/)
    |> unique_constraint([:email, :username])
    |> hash_password
  end

  defp hash_password(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} -> put_change(changeset, :password, Pbkdf2.hash_pwd_salt(password))
      _ -> changeset
    end
  end
end
