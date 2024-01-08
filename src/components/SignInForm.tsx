import { useContext } from "react";
import TextInput from "../ui/TextInput";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { StepperContext } from "../ui/Stepper";
import { SignInProps } from "../types";

const SignInForm: React.FC<SignInProps> = ({ inputFields, setInputFields }) => {
  const { signInWithGoogle, signInWithGithub } = useContext(AuthContext);
  const { nextStep } = useContext(StepperContext);

  const navigate = useNavigate();

  return (
    <div className="mx-auto flex h-[580px] max-w-[300px] flex-col items-center">
      <h2 className="mb-7 mt-3 self-start text-3xl font-bold">Sign in to X</h2>

      <div
        className="my-3 mb-4 flex h-[38px] w-full items-center justify-center gap-2 rounded-full border border-[rgb(207,217,222)] text-sm hover:bg-[rgba(29,155,240,0.1)] active:bg-[rgba(66,133,244,.1)]"
        onClick={() => signInWithGoogle(() => navigate("/home"))}
      >
        <img
          src="/google.svg"
          alt="google-logo"
          className="h-[18px] w-[18px]"
        />
        <button className="font-medium text-[rgb(60,64,67)] ">
          Sign In with Google
        </button>
      </div>

      <div
        className=" my-3 flex h-[38px] w-full items-center justify-center gap-2 rounded-full border border-[rgb(207,217,222)] text-sm hover:bg-[rgb(230,230,230)] active:bg-[rgb(204,204,204)]"
        onClick={() => signInWithGithub(() => navigate("/home"))}
      >
        <img
          src="/github.svg"
          alt="google-logo"
          className="h-[18px] w-[18px]"
        />
        <button className="font-bold">Sign In with Github</button>
      </div>

      <div className="relative mb-3 flex h-[20px] w-full items-center">
        <div className="w-full border-t-[1px] border-[rgb(207,217,222)]"></div>
        <div className="absolute left-1/2 top-1/2 w-[20px] -translate-x-2/4 -translate-y-2/4 bg-white text-center text-lg">
          or
        </div>
      </div>

      <TextInput
        label={"Email"}
        value={inputFields.email}
        id="email"
        name="email"
        onChange={(e) =>
          setInputFields({ ...inputFields, [e.target.name]: e.target.value })
        }
      />

      <button
        disabled={!inputFields.email}
        className={`my-3 w-full cursor-pointer rounded-full bg-[rgba(15,20,25,1)] py-1.5  font-bold text-white`}
        onClick={() => nextStep()}
      >
        Next
      </button>

      <button className="my-3 flex h-[40px] w-full items-center justify-center gap-2 rounded-full border border-[rgb(207,217,222)] font-bold hover:bg-[rgb(230,230,230)] active:bg-[rgb(204,204,204)]">
        Forgot password?
      </button>

      <p className="mt-[40px] self-start  text-label">
        Don't have an account?{" "}
        <Link className="text-[rgb(29,155,240)]" to="/signup">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;
