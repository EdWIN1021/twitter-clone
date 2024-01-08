import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Root from "./pages/root";
import Home from "./pages/home";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import ErrorPage from "./pages/error-page";
import Username from "./pages/username";
import Protect from "./pages/protect";
import RootLayout from "./layouts/RootLayout";
import HomeLayout from "./layouts/HomeLayout";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";
import Main from "./components/Main";
import TweetDetail from "./components/TweetDetail";
import Public from "./pages/public";
import Profile from "./components/Profile";
import Followers from "./components/Followers";
import Following from "./components/Following";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Public />,
        children: [
          {
            index: true,
            element: <Root />,
          },
          {
            path: "signup",
            element: <SignUp />,
          },
          {
            path: "signin",
            element: <SignIn />,
          },
        ],
      },
      {
        element: <Protect />,
        children: [
          {
            element: <HomeLayout />,
            children: [
              {
                path: "home",
                element: <Home />,
                children: [
                  {
                    index: true,
                    element: <Main />,
                  },
                  {
                    path: "tweet/:id",
                    element: <TweetDetail />,
                  },
                  {
                    path: "profile/:full_name",
                    element: <Profile />,
                  },
                  {
                    path: "followers",
                    element: <Followers />,
                  },
                  {
                    path: "following",
                    element: <Following />,
                  },
                ],
              },
            ],
          },
          {
            path: "username",
            element: <Username />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  //<React.StrictMode>
  <>
    <RouterProvider router={router} />
    <ToastContainer />
  </>,
  //</React.StrictMode>
);
