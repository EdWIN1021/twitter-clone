import useUserReplies from "../hooks/useUserReplies";
import ReplyItem from "./ReplyItem";

const ProfileReplies: React.FC<{ userId: string }> = ({ userId }) => {
  const { userReplies } = useUserReplies(userId);

  return (
    <div>
      {userReplies.map((userReply) => (
        <ReplyItem key={userReply.id} userReply={userReply} />
      ))}
    </div>
  );
};

export default ProfileReplies;
