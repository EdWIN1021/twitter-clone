import React from "react";
import { Link } from "react-router-dom";

interface NavLinkProps {
  icon: React.ReactNode;
  title?: string;
  to?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ icon, title, to }) => {
  return (
    <Link
      className="cursor-pointer justify-center md:flex md:justify-start"
      to={to || "/home"}
    >
      <div className="flex rounded-full px-4 py-2 hover:bg-hover-gray">
        <div className={`mx-3  w-7`}>{icon}</div>
        <span className="hidden xl:block"> {title}</span>
      </div>
    </Link>
  );
};

export default NavLink;
