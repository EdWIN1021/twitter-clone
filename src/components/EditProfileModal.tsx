import { createPortal } from "react-dom";
import Overlay from "../ui/Overlay";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dispatch, FC, SetStateAction } from "react";
import TextInput from "../ui/TextInput";

const EditProfileModal: FC<{
  toggle: Dispatch<SetStateAction<boolean>>;
}> = ({ toggle }) => {
  return createPortal(
    <>
      <Overlay />
      <div className="absolute left-1/2 top-[5%] min-w-[600px] -translate-x-1/2 overflow-hidden rounded-2xl bg-white">
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
          <div className="absolute left-[2%] top-[65%] cursor-pointer rounded-full border-2 border-white">
            <img
              className="z-20 h-[112px] w-[112px] rounded-full"
              src={"/default_profile.png"}
            ></img>
          </div>
        </div>

        <div className="px-4 mt-[60px] mb-[10px]">
          <TextInput
            label="Name"
            value={""}
            id="name"
            name="name"
            type="text"
          />
        </div>
      </div>
    </>,
    document.body
  );
};

export default EditProfileModal;
