import Stepper, { Step } from "../ui/Stepper";
import SignUpForm from "../components/SignUpForm";
import SignUpPasswordForm from "../components/SignUpPasswordForm";
import Overlay from "../ui/Overlay";
import Modal from "../ui/Modal";
import { useState } from "react";

const SignUp = () => {
  const [inputFields, setInputFields] = useState({
    email: "",
    name: "",
    year: "",
    day: "",
    month: "",
    password: "",
  });

  const resetFields = () => {
    setInputFields({
      email: "",
      name: "",
      year: "",
      day: "",
      month: "",
      password: "",
    });
  };

  return (
    <>
      <Overlay />
      <Stepper>
        <Modal resetFields={resetFields}>
          <Step index={1}>
            <SignUpForm
              inputFields={inputFields}
              setInputFields={setInputFields}
            />
          </Step>
          <Step index={2}>
            <SignUpPasswordForm
              inputFields={inputFields}
              setInputFields={setInputFields}
            />
          </Step>
        </Modal>
      </Stepper>
    </>
  );
};

export default SignUp;
