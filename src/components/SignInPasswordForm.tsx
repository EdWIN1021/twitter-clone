import TextInput from "../ui/TextInput";
import { Link } from "react-router-dom";
import PasswordInput from "../ui/PasswordInput";
import { SignInProps } from "../types";
import { supabase } from "../lib/supabase";
import { toast } from "react-toastify";

const SignInPasswordForm: React.FC<SignInProps> = ({
  inputFields,
  setInputFields,
}) => {
  const { password, email } = inputFields;

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
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
        onClick={handleSignIn}
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
