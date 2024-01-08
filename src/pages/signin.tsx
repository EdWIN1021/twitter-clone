import Modal from "../ui/Modal";
import Overlay from "../ui/Overlay";
import SignInForm from "../components/SignInForm";
import SignInPasswordForm from "../components/SignInPasswordForm";
import Stepper, { Step } from "../ui/Stepper";
import { useState } from "react";

const SignIn = () => {
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });

  const resetFields = () => {
    setInputFields({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Overlay />
      <Stepper>
        <Modal resetFields={resetFields}>
          <Step index={1}>
            <SignInForm
              inputFields={inputFields}
              setInputFields={setInputFields}
            />
          </Step>
          <Step index={2}>
            <SignInPasswordForm
              inputFields={inputFields}
              setInputFields={setInputFields}
            />
          </Step>
        </Modal>
      </Stepper>
    </>
  );
};

export default SignIn;
