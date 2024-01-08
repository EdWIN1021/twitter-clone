import { createPortal } from "react-dom";
import EmojiPicker from "emoji-picker-react";
import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

interface EmojiModalProps {
  handleEmoji: (emojiObject: { emoji: string }) => void;
  toggle: Dispatch<SetStateAction<boolean>>;
  leftPosition: number;
  topPosition: number;
}

const EmojiModal: React.FC<EmojiModalProps> = ({
  handleEmoji,
  toggle,
  leftPosition,
  topPosition,
}) => {
  return createPortal(
    <>
      <div
        className={`absolute top-0 h-full w-full bg-transparent`}
        onClick={() => toggle(false)}
      ></div>

      <div
        className={twMerge("absolute flex-col items-center justify-center")}
        style={{ left: leftPosition, top: topPosition + 35 }}
      >
        <EmojiPicker
          width={300}
          height={400}
          onEmojiClick={handleEmoji}
          autoFocusSearch={false}
        />
      </div>
    </>,
    document.body,
  );
};

export default EmojiModal;
