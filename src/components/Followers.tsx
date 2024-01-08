import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { Profiles } from "../types";

const Followers = () => {
  const [followers, setFollowers] = useState<Profiles[] | null>(null);
  const { profile } = useContext(AuthContext);

  useEffect(() => {
    const getFollowing = async () => {
      const { data } = await supabase.rpc("get_followers", {
        current_user_id: profile?.id,
      });
      setFollowers(data);
    };

    getFollowing();

    return () => {
      getFollowing();
    };
  }, [profile?.id]);

  return (
    <div className="max-h-[100vh] min-h-[100vh] w-full max-w-[600px] overflow-y-auto border-x md:min-w-[600px] ">
      <div className="flex items-center border-b px-4 py-3">
        <Link to={"/home"}>
          <ArrowLeftIcon className="mr-5 w-5 cursor-pointer" />
        </Link>
        <div>
          <span className="block text-xl font-bold">{profile?.full_name}</span>
          <span className="block text-sm text-label">@{profile?.username}</span>
        </div>
      </div>

      {followers?.map((user) => (
        <div className="flex items-center px-4 py-3" key={user.id}>
          <div className="mr-3 w-10 cursor-pointer">
            <img
              className="rounded-full"
              src={user.avatar_url || "/default_profile.png"}
              alt="default..."
            />
          </div>
          <div className="mr-12 flex flex-1 flex-col">
            <span className="whitespace-nowrap font-bold">
              {user.full_name}
            </span>
            <span className="text-label">@{user.username}</span>
          </div>

          <button className="rounded-full border bg-white px-3 py-1 text-sm font-bold text-black">
            Following
          </button>
        </div>
      ))}
    </div>
  );
};

export default Followers;
