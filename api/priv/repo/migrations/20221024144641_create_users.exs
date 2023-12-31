defmodule Api.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :username, :string
      add :email, :string
      add :password, :string
      add :role, :string, default: "USER"
      add :teams, {:array, :integer}, default: []

      timestamps()
    end

    create unique_index(:users, :email)
    create unique_index(:users, :username)
  end
end
