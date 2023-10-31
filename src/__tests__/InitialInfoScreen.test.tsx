import { render, screen, renderHook } from "@testing-library/react";
import { describe, it, expect, vitest, Mock } from "vitest";
import { InitialInfoFormValues } from "../InitialInfoForm";
import InitialInfoScreen from "../InitialInfoScreen";
import { BrowserRouter } from "react-router-dom";
import { useForm } from "react-hook-form";

window.fetch = vitest.fn(() =>
  Promise.resolve({
    json: async () => [{ label: "United States", value: "US" }],
  })
) as Mock;

describe("<InitialInfoScreen />", async () => {
  it("should render expected elements", async () => {
    const { result } = renderHook(() =>
      useForm<InitialInfoFormValues>({
        defaultValues: {
          username: "",
          email: "",
          phone: "",
          country: "",
        },
      })
    );

    render(
      <BrowserRouter>
        <InitialInfoScreen initialInfoForm={result.current} />
      </BrowserRouter>
    );

    // headings
    screen.getByRole("heading", { level: 1, name: "Super test form" });
    screen.getByRole("heading", { level: 2, name: "Initial info" });

    // stepper
    expect(screen.getByTestId("stepper-screen-0").textContent).toBe(
      "Initial info"
    );
    expect(screen.getByTestId("stepper-screen-1").textContent).toBe(
      "Password screen"
    );
    expect(screen.getByTestId("stepper-screen-2").textContent).toBe("Review");

    // form inputs
    screen.getByLabelText("Username");
    screen.getByLabelText("Email");
    screen.getByLabelText("Phone");
    screen.getByLabelText("Country");

    // submit button
    screen.getByRole("button", { name: "Continue" });
  });
});
