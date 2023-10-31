import { InitialInfoFormValues } from "./InitialInfoForm";
import { UseFormReturn } from "react-hook-form";
import Stepper from "./Stepper";
import Header from "./Header";
import Review from "./Review";

interface ReviewScreenProps {
  initialInfoForm: UseFormReturn<InitialInfoFormValues>;
}

function ReviewScreen({ initialInfoForm }: ReviewScreenProps) {
  const { username, email, phone, country } = initialInfoForm.watch();

  return (
    <>
      <Header subheaderText="Review screen" />
      <Review
        username={username}
        email={email}
        phone={phone}
        country={typeof country === "string" ? country : country.label}
      />
      <Stepper screenIndex={2} />
    </>
  );
}

export default ReviewScreen;
