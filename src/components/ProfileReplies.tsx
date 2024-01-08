import useUserReplies from "../hooks/useUserReplies";
import ReplyItem from "./ReplyItem";

const ProfileReplies = () => {
  const { userReplies } = useUserReplies();

  return (
    <div>
      {userReplies.map((userReply) => (
        <ReplyItem key={userReply.id} userReply={userReply} />
      ))}
    </div>
  );
};

export default ProfileReplies;
