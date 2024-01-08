import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { createPortal } from "react-dom";
import Overlay from "../ui/Overlay";

interface ModalContextProps {
  open: boolean;
  toggle: Dispatch<SetStateAction<boolean>>;
}

export const ModalContext = createContext<ModalContextProps>({
  open: false,
  toggle: () => {},
});

const Modal = ({
  open,
  toggle,
  children,
}: {
  open: boolean;
  toggle: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}) => {
  const contextValue: ModalContextProps = {
    open,
    toggle,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

const Content: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { open, toggle } = useContext(ModalContext);
  return createPortal(
    <>
      {open && (
        <>
          <Overlay toggle={toggle} />
          <div className="absolute left-1/2 top-[2%] min-w-[600px] -translate-x-1/2 overflow-hidden rounded-2xl bg-white px-4 py-3">
            <XMarkIcon
              className="mb-8 mt-3 w-5 cursor-pointer"
              onClick={() => toggle((open) => !open)}
            />
            {children}
          </div>
        </>
      )}
    </>,
    document.body,
  );
};

Modal.Content = Content;

export default Modal;
