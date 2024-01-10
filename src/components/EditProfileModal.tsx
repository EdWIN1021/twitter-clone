import { createPortal } from "react-dom";
import Overlay from "../ui/Overlay";
import { XMarkIcon, CameraIcon } from "@heroicons/react/24/outline";
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import TextInput from "../ui/TextInput";
import TextArea from "../ui/TextArea";
import { AuthContext } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { v4 as uuidv4 } from "uuid";

const EditProfileModal: FC<{
  toggle: Dispatch<SetStateAction<boolean>>;
}> = ({ toggle }) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const { profile } = useContext(AuthContext);
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const avatarImageRef = useRef<HTMLInputElement>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const coverImageRef = useRef<HTMLInputElement>(null);

  const handleAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files && setAvatarImage(e.target.files[0]);
  };

  const handleCover = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files && setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let cover_url;
    let avatar_url;

    if (coverImage) {
      await supabase.storage
        .from("user_covers")
        .remove([
          `${profile?.cover_url?.split("/")[
            profile?.cover_url?.split("/").length - 1
          ]}`,
        ]);

      const { data } = await supabase.storage
        .from("user_covers")
        .upload(uuidv4(), coverImage);

      cover_url = `${
        import.meta.env.VITE_SUPABASE_BUCKET_URL
      }/user_covers/${data?.path}`;
    }

    //todo
    if (avatarImage) {
      await supabase.storage
        .from("user_avatars")
        .remove([
          `${profile?.avatar_url?.split("/")[
            profile?.avatar_url?.split("/").length - 1
          ]}`,
        ]);

      const { data } = await supabase.storage
        .from("user_avatars")
        .upload(uuidv4(), avatarImage);

      avatar_url = `${
        import.meta.env.VITE_SUPABASE_BUCKET_URL
      }/user_avatars/${data?.path}`;
    }

    await supabase
      .from("profiles")
      .update({
        full_name: name || profile?.full_name,
        bio: bio || profile?.bio,
        cover_url: cover_url || profile?.cover_url,
        avatar_url: avatar_url || profile?.avatar_url,
      })
      .eq("id", profile?.id);

    // window.location.reload();
    // toggle(false);
  };

  return createPortal(
    <>
      <input
        type="file"
        className="hidden"
        accept="image/png, image/jpeg"
        onChange={handleAvatar}
        ref={avatarImageRef}
      />
      <input
        type="file"
        className="hidden"
        accept="image/jpg"
        onChange={handleCover}
        ref={coverImageRef}
      />
      <Overlay toggle={toggle} />
      <form
        className="absolute left-1/2 top-[5%] min-w-[600px] -translate-x-1/2 overflow-hidden rounded-2xl bg-white pb-[60px]"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center gap-10 h-[53px]  px-4">
          <XMarkIcon
            className="w-5 cursor-pointer"
            onClick={() => toggle(false)}
          />

          <span className="flex-1 text-[20px] font-bold">Edit profile</span>
          <button
            type="submit"
            className="text-sm font-bold bg-black text-white rounded-full px-3 py-1"
          >
            Save
          </button>
        </div>

        <div
          className="h-[200px] relative bg-[rgb(207,217,222)]"
          onClick={() => coverImageRef.current?.click()}
        >
          <img
            className="h-full w-full"
            src={
              coverImage
                ? URL.createObjectURL(coverImage as Blob)
                : profile?.cover_url
            }
          />

          <div className="w-[42px] h-[42px] bg-[rgba(36,41,45,.75)] absolute flex justify-center cursor-pointer left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full">
            <CameraIcon className="w-5 stroke-white" />
          </div>
        </div>

        <div
          className="absolute left-[2%] top-[35%] cursor-pointer rounded-full border-2 border-white"
          onClick={() => avatarImageRef.current?.click()}
        >
          <div>
            <div className="w-[42px] h-[42px] bg-[rgba(36,41,45,.75)] absolute flex justify-center cursor-pointer left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full">
              <CameraIcon className="w-5 stroke-white" />
            </div>

            <img
              className="z-20 h-[112px] w-[112px] rounded-full"
              src={
                (avatarImage
                  ? URL.createObjectURL(avatarImage as Blob)
                  : profile?.avatar_url) || "/default_profile.png"
              }
            ></img>
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
      </form>
    </>,
    document.body
  );
};

export default EditProfileModal;
