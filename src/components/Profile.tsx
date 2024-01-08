import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";
import { ChangeEvent, useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import moment from "moment";
import clsx from "clsx";
import useUserTweets from "../hooks/useUserTweets";
import TweetItem from "./TweetItem";
import useLikedTweets from "../hooks/useLikes";
import ReplyItem from "./ReplyItem";
import useUserReplies from "../hooks/useUserReplies";
import useFollowers from "../hooks/useFollowers";
import { FollowingContext } from "../contexts/FollowingContext";

const tabs = ["posts", "replies", "likes"];

const Profile = () => {
  const { profile } = useContext(AuthContext);
  const { tweets } = useUserTweets();
  const { userReplies } = useUserReplies();
  const { numOfFollowers } = useFollowers();
  const { numOfFollowings } = useContext(FollowingContext);
  const { likedTweets } = useLikedTweets();
  const [tab, setTab] = useState("posts");
  const [file, setFile] = useState<File | null>(null);

  console.log(file);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files && setFile(e.target.files[0]);
  };

  return (
    <div className="min-h-[100vh] w-full max-w-[600px] border-x md:min-w-[600px]">
      <div className="flex items-center px-4 py-3">
        <Link to={"/home"}>
          <ArrowLeftIcon className="mr-5 w-5 cursor-pointer" />
        </Link>
        <span className="text-xl font-bold">{profile?.full_name}</span>
      </div>

      <div className="h-[calc(100vh-52px)] overflow-y-auto">
        <div className="relative pb-6">
          <div className="h-[150px] bg-[rgb(207,217,222)]"></div>
          <div className="mt-[70px] px-4">
            <div className="mb-3">
              <h2 className="text-[20px] font-extrabold">
                {profile?.full_name}
              </h2>
              <span className="text-label">@{profile?.username}</span>
            </div>

            <div className="mb-3 flex">
              <CalendarDaysIcon className="w-4" />
              <span className="mx-2 text-label">
                Joined {moment(profile?.created_at).format("MMMM YYYY")}
              </span>
            </div>

            <div className="flex gap-2">
              <div className="text-sm">
                <Link to="/home/following" className="hover:underline">
                  <span className="font-bold">{numOfFollowings}</span>{" "}
                  <span className="text-label">Following</span>
                </Link>
              </div>

              <div className="text-sm ">
                <Link to="/home/followers" className="hover:underline">
                  <span className="font-bold">{numOfFollowers}</span>{" "}
                  <span className="text-label">Followers</span>
                </Link>
              </div>
            </div>
          </div>

          <div
            className="group absolute left-[2%] top-[22%] cursor-pointer rounded-full border-2 border-white"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImage}
              ref={fileInputRef}
            />
            <div className="relative">
              <div className=" absolute z-50 h-[134px] w-[134px] rounded-full group-hover:bg-[rgba(0,0,0,.1)]">
                <CameraIcon className="absolute left-1/2 top-1/2 z-50 hidden  w-7 -translate-x-1/2 -translate-y-1/2 stroke-[3px] group-hover:block" />
              </div>
              <img
                className="z-20 h-[134px] w-[134px] rounded-full"
                src={profile?.avatar_url || "/default_profile.png"}
              ></img>
            </div>
          </div>
        </div>

        <div className="flex justify-between border-b px-4">
          {tabs.map((tabItem) => (
            <button
              key={tabItem}
              className={clsx("px-6 py-2 font-bold hover:bg-hover-gray", {
                "border-b-2 border-primary-blue": tab === tabItem,
              })}
              onClick={() => setTab(tabItem)}
            >
              {tabItem}
            </button>
          ))}
        </div>
        {tab === "posts" && (
          <div>
            {tweets.map((tweet) => (
              <TweetItem key={tweet.id} tweet={tweet} />
            ))}
          </div>
        )}
        {tab === "replies" && (
          <div>
            {userReplies.map((userReply) => (
              <ReplyItem key={userReply.id} userReply={userReply} />
            ))}
          </div>
        )}
        {tab === "likes" && (
          <div>
            {likedTweets.map((likedTweet) => (
              <TweetItem key={likedTweet.id} tweet={likedTweet} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
