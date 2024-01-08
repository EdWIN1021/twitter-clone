import Button from "../ui/Button";
import Logo from "../ui/Logo";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BellIcon,
  EnvelopeIcon,
  QueueListIcon,
  UsersIcon,
  BookmarkIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/react/24/outline";

import NavLink from "./NavLink";
import UserInfo from "./UserInfo";
import PostFormModal from "./PostFormModal";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const SideBar = () => {
  const [open, toggle] = useState(false);
  const { profile } = useContext(AuthContext);

  const links = [
    {
      icon: <Logo />,
    },
    {
      title: "Home",
      icon: <HomeIcon />,
    },
    {
      title: "Explore",
      icon: <MagnifyingGlassIcon />,
    },
    {
      title: "Notifications",
      icon: <BellIcon />,
    },
    {
      title: "Messages",
      icon: <EnvelopeIcon />,
    },
    {
      title: "Lists",
      icon: <QueueListIcon />,
    },
    {
      title: "Bookmarks",
      icon: <BookmarkIcon />,
    },
    {
      title: "Communities",
      icon: <UsersIcon />,
    },
    {
      title: "Premium",
      icon: <Logo />,
    },
    {
      title: "Profile",
      icon: <UserIcon />,
      to: `/home/profile/${profile?.full_name}`,
    },
    {
      title: "More",
      icon: <EllipsisHorizontalCircleIcon />,
    },
  ];

  return (
    <>
      <div className="my-5 hidden flex-col xs:flex xl:pr-10">
        <div className="flex flex-1 flex-col items-end">
          <ul className="text-xl">
            {links.map((link, index) => (
              <li key={index}>
                <NavLink icon={link.icon} title={link.title} to={link.to} />
              </li>
            ))}
          </ul>

          <Button
            className="mt-5 w-10 self-center xl:hidden"
            icon={<img src="/post-icon.svg" />}
          />

          <Button
            className="mt-5 hidden bg-primary-blue px-10 py-2 hover:bg-dark-blue xl:block "
            title={"Post"}
            onClick={() => toggle(true)}
          />
        </div>
        <UserInfo />
      </div>

      {open && <PostFormModal toggle={toggle} />}
    </>
  );
};

export default SideBar;
