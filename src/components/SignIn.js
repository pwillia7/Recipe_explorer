import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const SignIn = () => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between Sign In and Sign Up

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    
    if (isSignUp) {
      signUpWithEmail(email, password);
    } else {
      signInWithEmail(email, password);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        onClick={signInWithGoogle}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Sign in with Google
      </button>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="mb-2 p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="mb-2 p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-500 text-white font-bold py-2 px-4 rounded mb-2"
        >
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>

      <button
        onClick={() => setIsSignUp(!isSignUp)}
        className="text-sm text-blue-600 hover:text-blue-800"
      >
        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};

export default SignIn;
