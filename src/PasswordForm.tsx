import { UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "./Input";

export type PasswordFormValues = {
  password: string;
  repeatPassword: string;
};

interface PasswordFormProps {
  form: UseFormReturn<PasswordFormValues>;
}

function PasswordForm({ form }: PasswordFormProps) {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/review");
  };

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = form;

  return (
    <form className="form blue-box" onSubmit={handleSubmit(onSubmit)}>
      <Input<PasswordFormValues>
        control={control}
        name="password"
        rules={{
          required: {
            value: true,
            message: "Password is required.",
          },
          minLength: {
            value: 8,
            message: "Password should be at least 8 characters long.",
          },
          maxLength: {
            value: 16,
            message: "Password should be at most 16 characters long.",
          },
        }}
        type="password"
        label="Password"
        placeholder="Input password"
      />
      <Input<PasswordFormValues>
        control={control}
        name="repeatPassword"
        rules={{
          required: {
            value: true,
            message: "Repeat password is required.",
          },
          validate: (value, formValues) =>
            value === formValues.password ||
            "Repeat password should match the password field.",
        }}
        type="password"
        label="Repeat password"
        placeholder="Repeat password"
      />
      <button disabled={!isValid} className="button" type="submit">
        Continue
      </button>
    </form>
  );
}

export default PasswordForm;
