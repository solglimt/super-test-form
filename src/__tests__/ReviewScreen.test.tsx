import { render, screen, renderHook } from "@testing-library/react";
import { InitialInfoFormValues } from "../InitialInfoForm";
import { describe, it, expect } from "vitest";
import ReviewScreen from "../ReviewScreen";
import { useForm } from "react-hook-form";

describe("<ReviewScreen />", async () => {
  it("should render expected elements", async () => {
    const { result } = renderHook(() =>
      useForm<InitialInfoFormValues>({
        values: {
          username: "mynameisjohndoe",
          email: "johndoe@gmail.com",
          phone: "+13157614414",
          country: { label: "Spain", value: "ES" },
        },
      })
    );

    render(<ReviewScreen initialInfoForm={result.current} />);

    // headings
    screen.getByRole("heading", { level: 1, name: "Super test form" });
    screen.getByRole("heading", { level: 2, name: "Review screen" });

    // stepper
    expect(screen.getByTestId("stepper-screen-0").textContent).toBe(
      "Initial info"
    );
    expect(screen.getByTestId("stepper-screen-1").textContent).toBe(
      "Password screen"
    );
    expect(screen.getByTestId("stepper-screen-2").textContent).toBe("Review");

    // input values
    screen.getByText("Username");
    screen.getByText("mynameisjohndoe");

    screen.getByText("Email");
    screen.getByText("johndoe@gmail.com");

    screen.getByText("Phone");
    screen.getByText("+13157614414");

    screen.getByText("Country");
    screen.getByText("Spain");

    // complete button
    screen.getByRole("button", { name: "Complete" });
  });
});
