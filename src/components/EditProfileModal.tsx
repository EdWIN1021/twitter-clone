import { createPortal } from "react-dom";
import Overlay from "../ui/Overlay";
import { XMarkIcon, CameraIcon } from "@heroicons/react/24/outline";
import { Dispatch, FC, SetStateAction, useContext, useState } from "react";
import TextInput from "../ui/TextInput";
import TextArea from "../ui/TextArea";
import { AuthContext } from "../contexts/AuthContext";

const EditProfileModal: FC<{
  toggle: Dispatch<SetStateAction<boolean>>;
}> = ({ toggle }) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const { profile } = useContext(AuthContext);

  return createPortal(
    <>
      <Overlay />
      <div className="absolute left-1/2 top-[5%] min-w-[600px] -translate-x-1/2 overflow-hidden rounded-2xl bg-white pb-[60px]">
        <div className="flex items-center gap-10 h-[53px]  px-4">
          <XMarkIcon
            className="w-5 cursor-pointer"
            onClick={() => toggle(false)}
          />
          <span className="flex-1 text-[20px] font-bold">Edit profile</span>
          <button className="text-sm font-bold bg-black text-white rounded-full px-3 py-1">
            Save
          </button>
        </div>

        <div className="h-[200px] relative bg-[rgb(207,217,222)]">
          <div className="w-[42px] h-[42px] bg-[rgba(36,41,45,.75)] absolute flex justify-center cursor-pointer left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full">
            <CameraIcon className="w-5 stroke-white" />
          </div>

          <div className="absolute left-[2%] top-[65%] cursor-pointer rounded-full border-2 border-white">
            <div>
              <div className="w-[42px] h-[42px] bg-[rgba(36,41,45,.75)] absolute flex justify-center cursor-pointer left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full">
                <CameraIcon className="w-5 stroke-white" />
              </div>
              <img
                className="z-20 h-[112px] w-[112px] rounded-full"
                src={profile?.avatar_url || "/default_profile.png"}
              ></img>
            </div>
          </div>
        </div>

        <div className="px-4 mt-[60px]">
          <TextInput
            label="Name"
            value={name}
            id="name"
            name="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />

          <TextArea
            className="mt-5"
            label="bio"
            value={bio}
            id="bio"
            name="bio"
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
      </div>
    </>,
    document.body
  );
};

export default EditProfileModal;
