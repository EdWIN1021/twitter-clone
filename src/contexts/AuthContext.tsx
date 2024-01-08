import {
  ReactNode,
  createContext,
  FC,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { supabase } from "../lib/supabase";
import { User } from "@supabase/supabase-js";
import { Profiles } from "../types";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  currentUser: User | null | undefined;
  profile: Profiles | null;
  loading: boolean;
  setProfile: Dispatch<SetStateAction<Profiles | null>>;
}

export const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  profile: null,
  loading: true,
  setProfile: () => {},
});

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(null);
  const [profile, setProfile] = useState<Profiles | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        supabase
          .from("profiles")
          .select()
          .eq("id", session?.user?.id)
          .then((res) => {
            if (res.status === 200 && res.data) {
              setProfile(res?.data[0] as Profiles);
              setCurrentUser(session?.user);
              setLoading(false);
            }
          });
      } else {
        setCurrentUser(null);
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const contextValue: AuthContextProps = {
    currentUser,
    profile,
    loading,
    setProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
