import { Dispatch, SetStateAction } from "react";
import Overlay from "../ui/Overlay";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Reply, Tweet } from "../types";
import { getDateRange } from "../utils/date";
import PostForm from "./PostForm";

const ReplyModal: React.FC<{
  toggle: Dispatch<SetStateAction<boolean>>;
  tweet: Tweet | Reply;
}> = ({ toggle, tweet }) => {
  return createPortal(
    <>
      <Overlay toggle={toggle} />
      <div className="absolute left-1/2 top-[5%] min-w-[600px] -translate-x-1/2 overflow-hidden rounded-2xl bg-white pt-4">
        <XMarkIcon
          className="mx-6 my-2 mb-5 w-5 cursor-pointer"
          onClick={() => toggle(false)}
        />

        <div className="px-4">
          <div className="flex">
            <div className="mr-2 flex flex-col items-center ">
              <div className="w-10 cursor-pointer">
                <img
                  className="rounded-full"
                  src={tweet?.avatar_url || "/default_profile.png"}
                  alt="default..."
                />
              </div>

              <div className="mt-2 w-0.5 flex-1 bg-[rgb(207,217,222)]"></div>
            </div>

            <div className="flex-1">
              <div>
                <span className="font-bold">{tweet.profiles?.full_name}</span>
                <span className="ml-1 text-label">
                  @{tweet?.username} &middot;{" "}
                  {getDateRange(new Date(tweet.created_at || new Date()))}
                </span>
              </div>
              <span className="pb-3">{tweet?.content}</span>
              <p className="pb-3">{tweet.image_url?.split("public/")[1]}</p>

              <p className="pb-4 text-label">
                Replying to{" "}
                <span className="text-primary-blue">@{tweet?.username}</span>
              </p>
            </div>
          </div>
        </div>

        <PostForm
          type={"reply"}
          reload={true}
          placeholder="Post your Reply"
          tweet={tweet}
          toggleModal={toggle}
        />
      </div>
    </>,
    document.body,
  );
};

export default ReplyModal;
