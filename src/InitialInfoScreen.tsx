import InitialInfoForm, { InitialInfoFormValues } from "./InitialInfoForm";
import { UseFormReturn } from "react-hook-form";
import Stepper from "./Stepper";
import Header from "./Header";

interface InitialInfoScreenProps {
  initialInfoForm: UseFormReturn<InitialInfoFormValues>;
}

function InitialInfoScreen({ initialInfoForm }: InitialInfoScreenProps) {
  return (
    <>
      <Header subheaderText="Initial info" />
      <InitialInfoForm form={initialInfoForm} />
      <Stepper screenIndex={0} />
    </>
  );
}

export default InitialInfoScreen;
