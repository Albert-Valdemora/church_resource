
import { useEffect, useState } from "react";
import supabase  from "../supabase-client";
import { AuthContext } from "./auth-context";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, logged: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
