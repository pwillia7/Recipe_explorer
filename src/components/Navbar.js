import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, signOut } = useAuth(); // Destructure the signOut function from the context

  return (
    <nav className="bg-green-100 text-green-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <span className="font-bold text-xl">Recipe Explorer</span>
        {user && (
          <button onClick={signOut} className="text-white font-bold py-2 px-4 rounded bg-red-500 hover:bg-red-700">
            Sign out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
