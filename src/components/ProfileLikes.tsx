import useLikedTweets from "../hooks/useLikes";
import TweetItem from "./TweetItem";

const ProfileLikes: React.FC<{ userId: string }> = ({ userId }) => {
  const { likedTweets } = useLikedTweets(userId);

  return (
    <div>
      {likedTweets.map((likedTweet) => (
        <TweetItem key={likedTweet.id} tweet={likedTweet} />
      ))}
    </div>
  );
};

export default ProfileLikes;
