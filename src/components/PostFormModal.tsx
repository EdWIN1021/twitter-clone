import Overlay from "../ui/Overlay";
import PostForm from "./PostForm";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction } from "react";

const PostFormModal: React.FC<{
  toggle: Dispatch<SetStateAction<boolean>>;
}> = ({ toggle }) => {
  return createPortal(
    <>
      <Overlay toggle={toggle} />
      <div className="absolute left-1/2 top-[10px]  w-[600px] -translate-x-1/2 rounded-2xl bg-white py-4">
        <XMarkIcon
          className="ml-5 w-5 cursor-pointer"
          onClick={() => toggle(false)}
        />

        <div className="py-5">
          <PostForm
            placeholder={"What is happening?!"}
            type={"post"}
            toggleModal={toggle}
          />
        </div>
      </div>
    </>,
    document.body,
  );
};

export default PostFormModal;
