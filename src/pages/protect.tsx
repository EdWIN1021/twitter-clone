import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Loader from "../components/Loader";

const Protect = () => {
  const { currentUser, loading } = useContext(AuthContext);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>{currentUser ? <Outlet /> : <Navigate to="/" />}</>
      )}
    </>
  );
};

export default Protect;
