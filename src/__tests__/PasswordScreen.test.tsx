import { render, screen, renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PasswordFormValues } from "../PasswordForm";
import PasswordScreen from "../PasswordScreen";
import { BrowserRouter } from "react-router-dom";
import { useForm } from "react-hook-form";

describe("<PasswordScreen />", async () => {
  it("should render expected elements", async () => {
    const { result } = renderHook(() =>
      useForm<PasswordFormValues>({
        defaultValues: {
          password: "",
          repeatPassword: "",
        },
      })
    );

    render(
      <BrowserRouter>
        <PasswordScreen passwordForm={result.current} />
      </BrowserRouter>
    );

    // headings
    screen.getByRole("heading", { level: 1, name: "Super test form" });
    screen.getByRole("heading", { level: 2, name: "Password screen" });

    // stepper
    expect(screen.getByTestId("stepper-screen-0").textContent).toBe(
      "Initial info"
    );
    expect(screen.getByTestId("stepper-screen-1").textContent).toBe(
      "Password screen"
    );
    expect(screen.getByTestId("stepper-screen-2").textContent).toBe("Review");

    // form inputs
    screen.getByLabelText("Password");
    screen.getByLabelText("Repeat password");

    // submit button
    screen.getByRole("button", { name: "Continue" });
  });
});
