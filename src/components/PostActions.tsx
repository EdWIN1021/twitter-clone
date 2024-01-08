import { FaceSmileIcon, MapPinIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import EmojiModal from "./EmojiModal";
import ImageUploader from "../ui/ImageUploader";

const PostActions: React.FC<{
  setFile: Dispatch<SetStateAction<File | null>>;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}> = ({ content, setContent, setFile }) => {
  const smileRef = useRef<HTMLDivElement>(null);
  const [leftPosition, setLeftPosition] = useState(0);
  const [topPosition, setTopPosition] = useState(0);
  const [showEmoji, setShowEmoji] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        const divElement = smileRef.current;
        if (divElement) {
          const rect = divElement.getBoundingClientRect();
          const currentLeft = rect.left;
          const currentTop = rect.top;
          setLeftPosition(currentLeft);
          setTopPosition(currentTop);
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
  };

  return (
    <>
      <div className="flex items-center border-t">
        <div className="mt-1.5 flex w-full">
          <div className="flex flex-1">
            <ImageUploader setFile={setFile} />

            <div
              ref={smileRef}
              className="cursor-pointer rounded-full p-2 hover:bg-hover-gray"
              onClick={() => setShowEmoji(true)}
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
            Post
          </button>
        </div>
      </div>

      {showEmoji && (
        <EmojiModal
          topPosition={topPosition}
          leftPosition={leftPosition}
          handleEmoji={handleEmoji}
          toggle={setShowEmoji}
        />
      )}
    </>
  );
};

export default PostActions;
