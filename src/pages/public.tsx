import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Loader from "../components/Loader";

const Public = () => {
  const { currentUser, loading } = useContext(AuthContext);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>{currentUser ? <Navigate to={"/home"} /> : <Outlet />}</>
      )}
    </>
  );
};

export default Public;
