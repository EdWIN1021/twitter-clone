import useUserTweets from "../hooks/useUserTweets";
import TweetItem from "./TweetItem";

const ProfilePosts: React.FC<{ userId: string }> = ({ userId }) => {
  const { tweets } = useUserTweets(userId);

  return (
    <div>
      {tweets.map((tweet) => (
        <TweetItem key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};

export default ProfilePosts;
