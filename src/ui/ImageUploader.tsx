import { PhotoIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, Dispatch, FC, SetStateAction, useRef } from "react";

const ImageUploader: FC<{
  setFile: Dispatch<SetStateAction<File | null>>;
}> = ({ setFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files && setFile(e.target.files[0]);
  };

  return (
    <div
      className="cursor-pointer rounded-full p-2 hover:bg-hover-gray"
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleImage}
        ref={fileInputRef}
      />
      <PhotoIcon className="w-5 stroke-primary-blue stroke-[2.5px]" />
    </div>
  );
};

export default ImageUploader;
