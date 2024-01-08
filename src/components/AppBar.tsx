import {
  HomeIcon,
  MagnifyingGlassIcon,
  BellIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

const AppBar = () => {
  return (
    <div className="absolute bottom-0 flex w-full justify-around p-3 xs:hidden">
      <li>
        <HomeIcon className="w-8" />
      </li>
      <li>
        <MagnifyingGlassIcon className="w-8" />
      </li>
      <li>
        <BellIcon className="w-8" />
      </li>
      <li>
        <EnvelopeIcon className="w-8" />
      </li>
    </div>
  );
};

export default AppBar;
