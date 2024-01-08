import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  PhotoIcon,
  FaceSmileIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import EmojiModal from "./EmojiModal";
import { AuthContext } from "../contexts/AuthContext";
import Skeleton from "react-loading-skeleton";
import { createTweet, uploadTweetImage } from "../utils/tweet";
import { ImageData, Tweet } from "../types";
import { v4 as uuidv4 } from "uuid";

const PostForm = ({
  placeholder,
  type,
  tweet,
  reload,
  toggleModal,
}: {
  placeholder?: string;
  type: "post" | "reply";
  tweet?: Tweet;
  reload?: boolean;
  toggleModal?: Dispatch<SetStateAction<boolean>>;
}) => {
  const [content, setContent] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, toggle] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { currentUser } = useContext(AuthContext);
  const smileRef = useRef<HTMLDivElement>(null);
  const [leftPosition, setLeftPosition] = useState(0);
  const [topPosition, setTopPosition] = useState(0);

  useEffect(() => {
    textAreaRef.current!.style.height = "auto";
    textAreaRef.current!.style.height =
      textAreaRef.current!.scrollHeight + "px";
  }, [content]);

  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        const divElement = smileRef.current;
        if (divElement) {
          const rect = divElement.getBoundingClientRect();
          const currentLeft = rect.left;
          const currentTop = rect.top;
          setTopPosition(currentTop);
          setLeftPosition(currentLeft);
        }
      }, 500);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleEmoji = (emojiObject: { emoji: string }) => {
    setContent((pre) => pre + emojiObject.emoji);
    toggle(false);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (currentUser) {
      let image_url = "";

      if (
        fileInputRef.current?.files &&
        fileInputRef.current?.files.length > 0
      ) {
        const { imageData } = await uploadTweetImage(
          fileInputRef?.current?.files[0],
          uuidv4(),
        );
        image_url = `${import.meta.env.VITE_SUPABASE_BUCKET_URL}/${
          (imageData as ImageData).fullPath
        }`;
      }

      await createTweet(currentUser?.id, content, type, tweet?.id, image_url);
    }

    setContent("");
    setImageUrl("");
    fileInputRef.current!.value = "";
    toggleModal?.(false);
    reload && window.location.reload();
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files && setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <>
      <form
        className="hidden border-b px-4 pt-4 sm:flex"
        onSubmit={handleSubmit}
      >
        <div className="mr-3 w-10 cursor-pointer">
          {currentUser ? (
            <img
              className="rounded-full"
              src={
                currentUser?.user_metadata.avatar_url || "/default_profile.png"
              }
              alt="default..."
            />
          ) : (
            <Skeleton circle width={40} height={40} />
          )}
        </div>

        <div className="flex-1">
          <textarea
            ref={textAreaRef}
            className="w-full  resize-none overflow-hidden pb-9 text-xl outline-none"
            placeholder={placeholder}
            rows={1}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          {imageUrl && (
            <div className="relative h-[382px] w-full overflow-hidden rounded-2xl">
              <img
                className="h-full w-full object-cover"
                src={imageUrl}
                alt=""
              />

              <XCircleIcon
                className="absolute right-[1%] top-[1%] w-8 cursor-pointer"
                onClick={() => {
                  fileInputRef.current!.value = "";
                  setImageUrl("");
                }}
              />
            </div>
          )}

          <div className="mt-5 flex items-center border-t py-2">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImage}
              ref={fileInputRef}
            />

            <div className="mt-1 flex w-full">
              <div className="flex flex-1">
                <div
                  className="cursor-pointer rounded-full p-2 hover:bg-hover-gray"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <PhotoIcon className="w-5 stroke-primary-blue stroke-[2.5px]" />
                </div>
                <div
                  ref={smileRef}
                  className="cursor-pointer rounded-full p-2 hover:bg-hover-gray"
                  onClick={() => toggle(true)}
                >
                  <FaceSmileIcon className="w-5 stroke-primary-blue stroke-[2.5px]" />
                </div>

                <div className="cursor-pointer rounded-full p-2 hover:bg-hover-gray">
                  <MapPinIcon className="w-5 stroke-primary-blue stroke-[2.5px] opacity-50" />
                </div>
              </div>

              <button
                disabled={!content}
                className={clsx(
                  "rounded-full bg-primary-blue px-4 py-1.5 font-bold text-white",
                  { "opacity-50": !content },
                )}
              >
                {type.slice(0, 1).toUpperCase() + type.slice(1, type.length)}
              </button>
            </div>
          </div>
        </div>
      </form>

      {open && (
        <EmojiModal
          topPosition={topPosition}
          leftPosition={leftPosition}
          handleEmoji={handleEmoji}
          toggle={toggle}
        />
      )}
    </>
  );
};

export default PostForm;
