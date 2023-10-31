import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { InitialInfoFormValues } from "./InitialInfoForm";
import { PasswordFormValues } from "./PasswordForm";
import InitialInfoScreen from "./InitialInfoScreen";
import PasswordScreen from "./PasswordScreen";
import ReviewScreen from "./ReviewScreen";
import "./App.css";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const initialInfoForm = useForm<InitialInfoFormValues>({
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      country: "",
    },
    mode: "onBlur",
  });

  const passwordForm = useForm<PasswordFormValues>({
    defaultValues: {
      password: "",
      repeatPassword: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (pathname !== "/" && !initialInfoForm.formState.isValid) {
      navigate("/", { replace: true });
    }
  }, [pathname, navigate, initialInfoForm.formState.isValid]);

  return (
    <Routes>
      <Route
        path="/"
        element={<InitialInfoScreen initialInfoForm={initialInfoForm} />}
      />
      <Route
        path="/password"
        element={<PasswordScreen passwordForm={passwordForm} />}
      />
      <Route
        path="/review"
        element={<ReviewScreen initialInfoForm={initialInfoForm} />}
      />
    </Routes>
  );
}

export default App;
