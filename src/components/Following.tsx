import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { Profile } from "../types";
import { PostgrestResponse } from "@supabase/supabase-js";

interface User {
  id: string;
  profiles: Profile;
}

const Following = () => {
  const [following, setFollowing] = useState<User[] | null>(null);
  const { profile } = useContext(AuthContext);
  const { userId } = useParams();

  useEffect(() => {
    const getFollowing = async () => {
      const { data } = (await supabase
        .from("followers")
        .select(
          `
          profiles (
            id,
            avatar_url,
            full_name,
            username
           )`
        )
        .eq("follower_user_id", userId)) as PostgrestResponse<User>;

      setFollowing(data);
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

      {following?.map((user) => (
        <div className="flex items-center px-4 py-3" key={user.profiles.id}>
          <Link
            to={`/home/profile/${user.profiles.id}`}
            className="mr-3 w-10 cursor-pointer"
          >
            <img
              className="rounded-full"
              src={user.profiles.avatar_url || "/default_profile.png"}
              alt="default..."
            />
          </Link>
          <div className="mr-12 flex flex-1 flex-col">
            <span className="whitespace-nowrap font-bold">
              {user.profiles.full_name}
            </span>
            <span className="text-label">@{user.profiles.username}</span>
          </div>

          <button className="rounded-full border bg-white px-3 py-1 text-sm font-bold text-black">
            Following
          </button>
        </div>
      ))}
    </div>
  );
};

export default Following;
