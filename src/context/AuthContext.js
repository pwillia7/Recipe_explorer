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
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) console.error('Error signing in with Google:', error);
  };

  const signInWithEmail = async (email, password) => {
    const { user, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) console.error('Error signing in with email:', error);
    else setUser(user);
    
  };
    const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error signing out:', error);
    else setUser(null);
  };
  const signUpWithEmail = async (email, password) => {
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) console.error('Error signing up:', error);
    else setUser(user);
  };

  const value = {
    user,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail, // New function added here
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
