import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { Tweet } from "../types";

const useUserReplies = () => {
  const [userReplies, setUserReplies] = useState<Tweet[]>([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      if (currentUser) {
        const { data, error } = await supabase.rpc("get_user_replies", {
          current_user_id: currentUser.id,
        });
        if (data && !error) {
          setUserReplies(data);
        }
      }
    })();
  }, [currentUser]);

  return { userReplies };
};

export default useUserReplies;
