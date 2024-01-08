import { useContext, useState } from "react";
import { Profiles } from "../types";
import { supabase } from "../lib/supabase";
import { AuthContext } from "../contexts/AuthContext";
import { FollowingContext } from "../contexts/FollowingContext";

const UserItem: React.FC<{
  user: Profiles;
  following?: string[];
}> = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { setNumOfFollowings } = useContext(FollowingContext);

  const handleFollow = async () => {
    setIsFollowing(true);
    await supabase
      .from("followers")
      .insert({ user_id: user.id, follower_user_id: currentUser?.id });
    setNumOfFollowings((numOfFollowings) => numOfFollowings + 1);
  };

  return (
    <div className="flex items-center px-4 py-3" key={user.username}>
      <div className="mr-3 w-10 cursor-pointer">
        <img
          className="rounded-full"
          src={user.avatar_url || "/default_profile.png"}
          alt="default..."
        />
      </div>
      <div className="mr-12 flex flex-1 flex-col">
        <span className="whitespace-nowrap font-bold">{user.full_name}</span>
        <span className="text-label">@{user.username}</span>
      </div>

      {isFollowing ? (
        <button
          className="rounded-full bg-btn-black px-3 py-1 text-sm font-bold text-white"
          disabled
        >
          Following
        </button>
      ) : (
        <button
          className="rounded-full bg-[rgb(15,20,25)] px-3 py-1 text-sm font-bold text-white"
          onClick={handleFollow}
        >
          Follow
        </button>
      )}
    </div>
  );
};

export default UserItem;
