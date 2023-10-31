import { useEffect, useState } from "react";
import { Controller, Control } from "react-hook-form";
import { InitialInfoFormValues } from "../InitialInfoForm";
import Select, { MenuListProps, Options } from "react-select";
import SimpleBar from "simplebar-react";
import ErrorIcon from "../ErrorIcon";
import "./index.css";

const COUNTRY_URL = import.meta.env.VITE_COUNTRY_URL;

interface CountryDropdownProps {
  control: Control<InitialInfoFormValues>;
}

interface Country {
  name: {
    common: string;
  };
  cca2: string;
}

function MenuList({
  children,
  innerProps,
  innerRef,
}: MenuListProps<InitialInfoFormValues["country"]>) {
  return (
    <SimpleBar
      autoHide={false}
      scrollableNodeProps={{
        ...innerProps,
        ref: innerRef,
      }}
      style={{ maxHeight: 200, marginTop: "8px" }}
    >
      {children}
    </SimpleBar>
  );
}

function IndicatorsContainer() {
  return <img src="src/assets/arrow_down.svg" alt="arrow down" />;
}

function CountryDropdown({ control }: CountryDropdownProps) {
  const [options, setOptions] = useState<
    Options<InitialInfoFormValues["country"]>
  >([]);

  useEffect(() => {
    async function loadOptions() {
      try {
        const response = await fetch(COUNTRY_URL);
        const data: Country[] = await response.json();
        const options = data
          .map((item: Country) => ({
            label: item.name.common,
            value: item.cca2,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));

        setOptions(options);
      } catch (err) {
        console.error("An error occurred while loading options:", err);
      }
    }

    loadOptions();
  }, []);

  return (
    <Controller
      name="country"
      rules={{
        required: {
          value: true,
          message: "Country is required.",
        },
      }}
      control={control}
      render={({ field, fieldState }) => (
        <div className="form-group">
          <label className="form-label" htmlFor="country">
            Country
          </label>
          <Select
            {...field}
            inputId="country"
            placeholder="Select country"
            options={options}
            unstyled
            components={{
              MenuList,
              IndicatorsContainer: fieldState.error
                ? ErrorIcon
                : IndicatorsContainer,
            }}
            classNames={{
              option: (state) =>
                `country-option ${
                  state.isSelected ? "country-option--selected" : ""
                }`,
            }}
            styles={{
              container: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: "var(--white)",
                color: "var(--midnight-ink)",
                height: "40px",
                textAlign: "left",
              }),
              control: (baseStyles) => ({
                ...baseStyles,
                paddingLeft: "16px",
                paddingRight: "12px",
              }),
              placeholder: (baseStyles) => ({
                ...baseStyles,
                color: "var(--soft-lilac)",
              }),
              option: (baseStyles) => ({
                ...baseStyles,
                alignItems: "center",
                backgroundColor: "var(--white)",
                display: "flex",
                height: "40px",
                paddingLeft: "16px",
              }),
              noOptionsMessage: (baseStyles) => ({
                ...baseStyles,
                alignItems: "center",
                backgroundColor: "var(--white)",
                display: "flex",
                height: "40px",
                paddingLeft: "16px",
              }),
            }}
          />
          {fieldState.error && (
            <div className="form-error">{fieldState.error.message}</div>
          )}
        </div>
      )}
    />
  );
}

export default CountryDropdown;
