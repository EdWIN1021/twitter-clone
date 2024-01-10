import { ArrowLeftIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { Suspense, lazy, useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import clsx from "clsx";
import useFollowers from "../hooks/useFollowers";
import EditProfileModal from "./EditProfileModal";
import useProfile from "../hooks/useProfile";
import { AuthContext } from "../contexts/AuthContext";
import useFollowings from "../hooks/useFollowings";
const ProfilePosts = lazy(() => import("./ProfilePosts"));
const ProfileReplies = lazy(() => import("./ProfileReplies"));
const ProfileLikes = lazy(() => import("./ProfileLikes"));

const tabs = ["posts", "replies", "likes"];

const Profile = () => {
  const { userId } = useParams();
  const { numOfFollowers } = useFollowers(userId);
  const { numOfFollowings } = useFollowings(userId);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [tab, setTab] = useState("posts");
  const { profile, loading } = useProfile(userId);
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <div className="min-h-[100vh] w-full max-w-[600px] border-x md:min-w-[600px]">
        {!loading && (
          <>
            <div className="flex items-center px-4 py-3">
              <Link to={"/home"}>
                <ArrowLeftIcon className="mr-5 w-5 cursor-pointer" />
              </Link>
              <span className="text-xl font-bold">{profile?.full_name}</span>
            </div>

            <div className="h-[calc(100vh-52px)] overflow-y-auto">
              <div className="relative pb-6">
                <div className="h-[200px] bg-[rgb(207,217,222)]">
                  {profile?.cover_url && (
                    <img className="h-full w-full" src={profile?.cover_url} />
                  )}
                </div>

                <div className="text-right mt-3 mr-2 min-h-[32.5px]">
                  {currentUser?.id === userId && (
                    <button
                      className="border rounded-full px-3 py-1 text-[15px] font-bold hover:bg-[rgba(10,20,15,.1)]"
                      onClick={() => setShowEditProfileModal(true)}
                    >
                      Edit profile
                    </button>
                  )}
                </div>

                <div className="px-4">
                  <div className="mb-3">
                    <h2 className="text-[20px] font-extrabold">
                      {profile?.full_name}
                    </h2>
                    <span className="text-label">@{profile?.username}</span>

                    {profile?.bio && <p className="py-2">{profile?.bio}</p>}
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

                <div className="absolute left-[2%] top-[25%] cursor-pointer rounded-full border-2 border-white">
                  <img
                    className="z-20 h-[134px] w-[134px] rounded-full"
                    src={profile?.avatar_url || "/default_profile.png"}
                  ></img>
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
              {tab === "posts" && profile && (
                <Suspense fallback={<div>Loading...</div>}>
                  <ProfilePosts userId={profile?.id} />
                </Suspense>
              )}
              {tab === "replies" && profile && (
                <Suspense fallback={<div>Loading...</div>}>
                  <ProfileReplies userId={profile?.id} />
                </Suspense>
              )}
              {tab === "likes" && profile && (
                <Suspense fallback={<div>Loading...</div>}>
                  <ProfileLikes userId={profile?.id} />
                </Suspense>
              )}
            </div>
          </>
        )}
      </div>

      {showEditProfileModal && (
        <EditProfileModal toggle={setShowEditProfileModal} />
      )}
    </>
  );
};

export default Profile;
