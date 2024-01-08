import { useContext, useState } from "react";
import Modal from "../ui/Modal";
import Overlay from "../ui/Overlay";
import TextInput from "../ui/TextInput";
import Typography from "../ui/Typography";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { toast } from "react-toastify";

const Username = () => {
  const [input, setInput] = useState("");
  const { profile, setProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from("profiles")
      .update({ username: input })
      .eq("id", profile?.id);

    if (error) {
      toast.error("Username already exists. Please choose a different one.", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      //update profile
      setProfile({ ...profile, username: input });
      navigate("/home");
    }
  };

  return (
    <>
      {profile?.username ? (
        <Navigate to={"/home"} />
      ) : (
        <>
          <Overlay />
          <Modal showCloseButton={false} resetFields={() => setInput("")}>
            <form className="p-10" onSubmit={handleSubmit}>
              <Typography variant="h2" title="What Should we call you?" />

              <Typography
                variant="p"
                title="Your @username is unique. You can always change it later."
              />

              <TextInput
                className="my-8"
                label="Username"
                id="username"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                showLength={false}
                required
              />

              <input type="text" />
              <button
                disabled={!input}
                type="submit"
                className={`text-lg font-bold text-white ${
                  !input ? "bg-[rgba(0,0,0,0.5)]" : "bg-[rgba(15,20,25,1)]"
                }  mb-2 mt-[327px] w-full cursor-pointer rounded-full py-3.5`}
              >
                Confirm
              </button>
            </form>
          </Modal>
        </>
      )}
    </>
  );
};

export default Username;
