import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: currentSession } = await supabase.auth.getSession();
      setUser(currentSession?.user ?? null);
    };

    checkSession();


    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const signIn = async () => {
    const { user, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) console.error('Error signing in:', error);
    else setUser(user);
  };

  const value = {
    user,
    signIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
