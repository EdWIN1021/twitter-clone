import { Outlet } from "react-router-dom";
import AuthProvider from "../contexts/AuthContext";
import FollowingProvider from "../contexts/FollowingContext";

const RootLayout = () => {
  return (
    <AuthProvider>
      <FollowingProvider>
        <Outlet />
      </FollowingProvider>
    </AuthProvider>
  );
};

export default RootLayout;
