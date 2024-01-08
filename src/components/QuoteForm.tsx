import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ImageData, Tweet } from "../types";
import { getDateRange } from "../utils/date";
import PostActions from "./PostActions";
import { GlobeAmericasIcon } from "@heroicons/react/24/outline";
import TextArea from "../ui/TextArea";
import { createTweet, uploadTweetImage } from "../utils/tweet";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { v4 as uuidv4 } from "uuid";
import { ModalContext } from "./Modal";

const QuoteForm: React.FC<{
  tweet: Tweet;
}> = ({ tweet }) => {
  const { profile } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { toggle } = useContext(ModalContext);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (profile) {
      let image_url = "";
      if (file) {
        const { imageData } = await uploadTweetImage(file, uuidv4());
        image_url = `${import.meta.env.VITE_SUPABASE_BUCKET_URL}/${
          (imageData as ImageData).fullPath
        }`;
      }

      await createTweet(profile?.id, content, "quote", tweet?.id, image_url);

      toggle((open) => !open);
      setContent("");
      setFile(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-4">
        <div className="w-10 cursor-pointer">
          <img
            className="rounded-full"
            src={profile?.avatar_url || "/default_profile.png"}
            alt="default..."
          />
        </div>

        <div className="flex-1">
          <TextArea
            placeholder={"Add a comment"}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {file && (
            <div className="relative mb-3 h-[382px] w-full overflow-hidden rounded-2xl">
              <img
                className="h-full w-full object-cover"
                src={URL.createObjectURL(file as Blob)}
                alt="tweet-image"
              />

              <XCircleIcon
                className="absolute right-[1%] top-[1%] w-8 cursor-pointer"
                onClick={() => setFile(null)}
              />
            </div>
          )}

          <div className="max-h-[150px] overflow-hidden rounded-2xl border p-2">
            <div className="flex items-center gap-1">
              <div className="w-5 cursor-pointer">
                <img
                  className="rounded-full"
                  src={tweet?.avatar_url || "/default_profile.png"}
                  alt="default..."
                />
              </div>

              <span className="font-bold">{tweet.full_name}</span>
              <span className="text-label">
                @{tweet.username} &middot;{" "}
                {getDateRange(new Date(tweet?.created_at))}
              </span>
            </div>

            <p className="break-all">{tweet?.content}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-1 py-2 font-bold text-primary-blue">
        <GlobeAmericasIcon className="w-4 stroke-2" />
        <span className="text-sm">Everyone can reply</span>
      </div>

      <PostActions
        content={content}
        setFile={setFile}
        setContent={setContent}
      />
    </form>
  );
};

export default QuoteForm;
