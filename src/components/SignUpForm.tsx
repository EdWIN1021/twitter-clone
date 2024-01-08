import { useMemo, useContext, ChangeEvent } from "react";

import TextInput from "../ui/TextInput";
import DropDown from "../ui/DropDown";
import { StepperContext } from "../ui/Stepper";
import { monthData, dayData, yearData } from "../constants";
import { SignUpProps } from "../types";

const SignUpForm: React.FC<SignUpProps> = ({ inputFields, setInputFields }) => {
  const { nextStep } = useContext(StepperContext);

  const { name, email, year, month, day } = inputFields;
  const isDisabled = useMemo(
    () => !year || !day || !month || !name || !email,
    [year, day, month, email, name],
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setInputFields({
      ...inputFields,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mx-auto flex max-w-[400px] flex-col">
      <h2 className="my-7 text-3xl font-bold">Create your account</h2>

      <div className="flex flex-col gap-5">
        <TextInput
          label="Name"
          value={name}
          id="name"
          name="name"
          type="text"
          onChange={handleChange}
        />

        <TextInput
          label="Email"
          value={email}
          id="email"
          name="email"
          type="email"
          onChange={handleChange}
        />
      </div>

      <h3 className="mb-2 mt-10 font-bold">Date of birth</h3>
      <p className="text-sm text-label">
        This will not be shown publicly. Confirm your own age, even if this
        account is for a business, a pet, or something else.
      </p>

      <div className="mt-4 flex gap-3 ">
        <DropDown
          variant="lg"
          type="Month"
          name="month"
          data={monthData}
          value={month}
          onChange={handleChange}
        />
        <DropDown
          variant="sm"
          type="Day"
          name="day"
          data={dayData}
          value={day}
          onChange={handleChange}
        />
        <DropDown
          variant="md"
          type="Year"
          name="year"
          data={yearData}
          value={year}
          onChange={handleChange}
        />
      </div>

      <button
        onClick={() => nextStep()}
        disabled={isDisabled}
        className={`text-lg font-bold text-white ${
          isDisabled ? "bg-[rgba(0,0,0,0.5)]" : "bg-[rgba(15,20,25,1)]"
        }  mb-2 mt-20 w-full cursor-pointer rounded-full py-3.5`}
      >
        Next
      </button>
    </div>
  );
};

export default SignUpForm;
