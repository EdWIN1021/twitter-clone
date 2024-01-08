import { toast } from "react-toastify";

export const firebaseErrorHandler = (errorMessage: string) => {
  const regex = /\((.*?)\)/;
  const match = regex.exec(errorMessage);
  const message = match ? match[1].split("/")[1] : null;

  toast.error(message, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
