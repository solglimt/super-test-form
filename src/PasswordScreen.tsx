import PasswordForm, { PasswordFormValues } from "./PasswordForm";
import { UseFormReturn } from "react-hook-form";
import Stepper from "./Stepper";
import Header from "./Header";

interface PasswordScreenProps {
  passwordForm: UseFormReturn<PasswordFormValues>;
}

function PasswordScreen({ passwordForm }: PasswordScreenProps) {
  return (
    <>
      <Header subheaderText="Password screen" />
      <PasswordForm form={passwordForm} />
      <Stepper screenIndex={1} />
    </>
  );
}

export default PasswordScreen;
