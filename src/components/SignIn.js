// src/components/SignIn.js
import React from 'react';
import { useAuth } from '../context/AuthContext';

const SignIn = () => {
  const { signIn } = useAuth();

  return (
    <div className="flex justify-center items-center h-screen">
      <button onClick={signIn} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
