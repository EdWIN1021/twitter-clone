import { useState } from "react";
import MainTab from "./MainTab";
import PostForm from "./PostForm";
import Tweets from "./Tweets";
import FollowingTweets from "./FollowingTweets";

const Main = () => {
  const [tab, setTab] = useState(0);

  return (
    <div className="max-h-[100vh] min-h-[100vh] w-full max-w-[600px] overflow-y-auto border-x md:min-w-[600px]">
      <MainTab tab={tab} setTab={setTab} />
      <PostForm placeholder={"What is happening?!"} type={"post"} />
      {tab === 0 && <Tweets />}
      {tab === 1 && <FollowingTweets />}
    </div>
  );
};

export default Main;
