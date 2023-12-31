defmodule Api.AccountFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Api.Account` context.
  """

  @doc """
  Generate a user.
  """
  def user_fixture(attrs \\ %{}) do
    {:ok, user} =
      attrs
      |> Enum.into(%{
        email: "some email",
        username: "some username",
        password: "some password",
        role: "some role",
        teams: "some teams"
      })
      |> Api.Account.create_user()

    user
  end

  @doc """
  Generate a clock.
  """
  def clock_fixture(attrs \\ %{}) do
    {:ok, clock} =
      attrs
      |> Enum.into(%{
        status: true,
        time: ~N[2022-10-23 14:58:00]
      })
      |> Api.Account.create_clock()

    clock
  end

  @doc """
  Generate a workingtime.
  """
  def workingtime_fixture(attrs \\ %{}) do
    {:ok, workingtime} =
      attrs
      |> Enum.into(%{
        end: ~N[2022-10-23 14:59:00],
        start: ~N[2022-10-23 14:59:00]
      })
      |> Api.Account.create_workingtime()

    workingtime
  end
end
