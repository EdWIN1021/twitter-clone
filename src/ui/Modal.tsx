import React, { useContext } from "react";
import { XMarkIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { createPortal } from "react-dom";

import { StepperContext } from "./Stepper";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface ModalProps {
  children: React.ReactNode;
  showCloseButton?: boolean;
  resetFields?: () => void;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  children,
  showCloseButton = true,
  resetFields,
  className,
}) => {
  const { prevStep, activeStep } = useContext(StepperContext);

  const navigate = useNavigate();

  return createPortal(
    <div>
      <div
        className={twMerge(
          `absolute left-1/2 top-1/2 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-4 shadow-xl`,
          className,
        )}
      >
        {showCloseButton && (
          <>
            {activeStep < 2 ? (
              <div className="inline-block rounded-full p-2 hover:bg-[rgb(0,0,0,0.1)]">
                <XMarkIcon
                  onClick={() => {
                    navigate("/");
                    resetFields?.();
                  }}
                  className="left-[3%] top-[3%]  h-[20px] w-[20px] cursor-pointer"
                />
              </div>
            ) : (
              <div className="inline-block rounded-full p-2 hover:bg-[rgb(0,0,0,0.1)]">
                <ArrowLeftIcon
                  onClick={() => prevStep()}
                  className="left-[3%] top-[3%]  h-[20px] w-[20px] cursor-pointer"
                />
              </div>
            )}
          </>
        )}

        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
