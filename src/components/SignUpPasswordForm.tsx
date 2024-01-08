import { useContext, useMemo } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../ui/PasswordInput";
import { SignUpProps } from "../types";
import { monthData } from "../constants";

const SignUpPasswordForm: React.FC<SignUpProps> = ({
  inputFields,
  setInputFields,
}) => {
  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();
  const { email, password, name } = inputFields;

  const birthday = useMemo(
    () =>
      new Date(
        Number(inputFields.year),
        monthData.indexOf("January") + 1,
        Number(inputFields.day),
      ),
    [inputFields],
  );

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
        // disabled={!!password}
        onClick={() =>
          signUp(email, password, birthday, name, () => navigate("/home"))
        }
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
