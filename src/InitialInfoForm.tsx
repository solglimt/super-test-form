import { UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CountryDropdown from "./CountryDropdown";
import Input from "./Input";

type CountryOption = {
  label: string;
  value: string;
};

export type InitialInfoFormValues = {
  email: string;
  username: string;
  country: CountryOption | string;
  phone: string;
};

interface InitialInfoFormProps {
  form: UseFormReturn<InitialInfoFormValues>;
}

const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number
const PHONE_PATTERN = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

function InitialInfoForm({ form }: InitialInfoFormProps) {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/password");
  };

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = form;

  return (
    <form
      className="form blue-box"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Input<InitialInfoFormValues>
        control={control}
        name="username"
        rules={{
          required: {
            value: true,
            message: "Username is required.",
          },
          minLength: {
            value: 4,
            message: "Username should be at least 4 characters long.",
          },
          maxLength: {
            value: 12,
            message: "Username should be at most 12 characters long.",
          },
        }}
        type="text"
        label="Username"
        placeholder="Input username"
      />
      <Input<InitialInfoFormValues>
        control={control}
        name="email"
        rules={{
          required: {
            value: true,
            message: "Email is required.",
          },
          pattern: {
            value: EMAIL_PATTERN,
            message: "Email should be a valid email address.",
          },
        }}
        type="email"
        label="Email"
        placeholder="Input email"
      />
      <Input<InitialInfoFormValues>
        control={control}
        name="phone"
        rules={{
          required: {
            value: true,
            message: "Phone is required.",
          },
          pattern: {
            value: PHONE_PATTERN,
            message: "Phone should be a valid phone number.",
          },
        }}
        type="tel"
        label="Phone"
        placeholder="Input phone"
      />
      <CountryDropdown control={control} />
      <button disabled={!isValid} className="button" type="submit">
        Continue
      </button>
    </form>
  );
}

export default InitialInfoForm;
