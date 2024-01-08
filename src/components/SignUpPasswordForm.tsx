import { useMemo } from "react";
import PasswordInput from "../ui/PasswordInput";
import { SignUpProps } from "../types";
import { monthData } from "../constants";
import { supabase } from "../lib/supabase";
import { toast } from "react-toastify";

const SignUpPasswordForm: React.FC<SignUpProps> = ({
  inputFields,
  setInputFields,
}) => {
  const { email, password, name } = inputFields;

  const birthday = useMemo(
    () =>
      new Date(
        Number(inputFields.year),
        monthData.indexOf("January") + 1,
        Number(inputFields.day)
      ),
    [inputFields]
  );

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          birthday,
        },
      },
    });

    if (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="mx-auto flex max-w-[400px] flex-col">
      <h2 className="mt-7 text-3xl font-bold">You'll need a password</h2>
      <p className="mb-7 text-sm text-label">
        Make sure it's 8 characters or more.
      </p>

      <PasswordInput
        value={inputFields.password}
        name="password"
        onChange={(e) =>
          setInputFields({ ...inputFields, [e.target.name]: e.target.value })
        }
      />

      <button
        onClick={handleSignup}
        className={`text-lg font-bold text-white ${
          !inputFields.password
            ? "bg-[rgba(0,0,0,0.5)]"
            : "bg-[rgba(15,20,25,1)]"
        }  mb-2 mt-[327px] w-full cursor-pointer rounded-full py-3.5`}
      >
        Sign Up
      </button>
    </div>
  );
};

export default SignUpPasswordForm;
