import React, { useState, createContext, useContext } from "react";

export const StepperContext = createContext({
  activeStep: 1,
  nextStep: () => {},
  prevStep: () => {},
});

interface ValueProps {
  activeStep: number;
  nextStep: () => void;
  prevStep: () => void;
}

const Stepper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [activeStep, setActiveStep] = useState(1);

  const nextStep = () => setActiveStep((step) => step + 1);
  const prevStep = () => setActiveStep((step) => step - 1);

  const value: ValueProps = {
    activeStep,
    nextStep,
    prevStep,
  };

  return (
    <StepperContext.Provider value={value}>{children}</StepperContext.Provider>
  );
};

export const Step: React.FC<{ children: React.ReactNode; index: number }> = ({
  children,
  index,
}) => {
  const { activeStep } = useContext(StepperContext);

  return <>{activeStep === index && <div>{children}</div>}</>;
};

export default Stepper;
