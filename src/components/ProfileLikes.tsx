import useLikedTweets from "../hooks/useLikes";
import TweetItem from "./TweetItem";

const ProfileLikes = () => {
  const { likedTweets } = useLikedTweets();

  return (
    <div>
      {likedTweets.map((likedTweet) => (
        <TweetItem key={likedTweet.id} tweet={likedTweet} />
      ))}
      ;
    </div>
  );
};

export default ProfileLikes;
