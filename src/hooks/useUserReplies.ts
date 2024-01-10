import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Tweet } from "../types";

const useUserReplies = (userId: string) => {
  const [userReplies, setUserReplies] = useState<Tweet[]>([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("get_user_replies", {
        current_user_id: userId,
      });
      if (data && !error) {
        setUserReplies(data);
      }
    })();
  }, []);

  return { userReplies };
};

export default useUserReplies;
