import { useContext } from "react";
import TextInput from "../ui/TextInput";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../ui/PasswordInput";
import { SignInProps } from "../types";

const SignInPasswordForm: React.FC<SignInProps> = ({
  inputFields,
  setInputFields,
}) => {
  const { signIn } = useContext(AuthContext);
  const { password, email } = inputFields;
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex max-w-[400px] flex-col">
      <h2 className="mt-7 text-3xl font-bold ">Enter your password</h2>

      <div className="my-3">
        <TextInput
          disabled={true}
          label="Email"
          id="email"
          value={email}
          type="text"
        />
      </div>

      <PasswordInput
        className="my-3"
        value={password}
        name="password"
        onChange={(e) =>
          setInputFields({ ...inputFields, [e.target.name]: e.target.value })
        }
      />

      <Link to="/">
        <span className="text-sm text-[rgb(29,155,240)]">Forgot password?</span>
      </Link>

      <button
        onClick={() =>
          signIn(inputFields.email, inputFields.password, () =>
            navigate("/home"),
          )
        }
        className={`text-lg font-bold text-white ${
          !password ? "bg-[rgba(0,0,0,0.5)]" : "bg-[rgba(15,20,25,1)]"
        }  mb-2 mt-[200px] w-full cursor-pointer rounded-full py-3.5`}
      >
        Log In
      </button>

      <p className="m-[10px] self-start text-label">
        Don't have an account?{" "}
        <Link className="text-[rgb(29,155,240)]" to="/signup">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignInPasswordForm;
