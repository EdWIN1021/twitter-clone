import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { Profile } from "../types";

const useProfile = (user_id: string | undefined) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = (await supabase
          .from("profiles")
          .select()
          .eq("id", user_id)
          .single()) as PostgrestSingleResponse<Profile>;

        setProfile(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  return { profile, loading };
};

export default useProfile;
