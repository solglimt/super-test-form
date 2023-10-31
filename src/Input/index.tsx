import {
  Path,
  Control,
  FieldValues,
  useController,
  RegisterOptions,
} from "react-hook-form";
import ErrorIcon from "../ErrorIcon";
import "./index.css";

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  placeholder: string;
  rules: RegisterOptions;
  type: "text" | "email" | "password" | "tel";
}

function Input<T extends FieldValues>({
  name,
  type,
  rules,
  label,
  control,
  placeholder,
}: InputProps<T>) {
  const { field, fieldState } = useController({
    name,
    control,
    rules,
  });

  return (
    <div className="form-group">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <div className="form-input-wrapper">
        <input
          id={name}
          type={type}
          className="form-input"
          placeholder={placeholder}
          aria-invalid={Boolean(fieldState.error)}
          {...field}
        />
        {fieldState.error && <ErrorIcon />}
      </div>
      {fieldState.error && (
        <div className="form-error">{fieldState.error.message}</div>
      )}
    </div>
  );
}

export default Input;
