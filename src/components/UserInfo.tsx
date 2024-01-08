import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import LogOut from "./LogOut";
import { AuthContext } from "../contexts/AuthContext";
import Skeleton from "react-loading-skeleton";

const UserInfo: React.FC = () => {
  const [open, toggle] = useState(false);
  const { profile } = useContext(AuthContext);

  return (
    <div className="relative max-w-[260px] self-center xl:self-auto">
      <div
        className="cursor-pointer rounded-full px-3 py-1 hover:bg-hover-gray"
        onClick={() => toggle((open) => !open)}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-10 cursor-pointer">
            {profile ? (
              <img
                className="rounded-full"
                src={profile?.avatar_url || "/default_profile.png"}
                alt="default..."
              />
            ) : (
              <Skeleton circle width={30} height={30} />
            )}
          </div>

          <div className="hidden  flex-1 flex-nowrap xl:block">
            <div className="flex flex-col">
              <span className="whitespace-nowrap font-bold">
                {profile ? profile?.full_name : <Skeleton width={123} />}
              </span>

              <span className="self-start text-label">
                {profile ? `@${profile?.username}` : <Skeleton width={75} />}
              </span>
            </div>
          </div>

          <EllipsisHorizontalIcon className="ml-7 hidden  w-7 cursor-pointer" />
        </div>
      </div>

      {open && <LogOut toggle={toggle} username={profile?.full_name} />}
    </div>
  );
};

export default UserInfo;
