// src/components/Navbar.js
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <span className="font-bold text-xl">Recipe Explorer</span>
        {user && (
          <button onClick={signOut} className="text-white font-bold py-2 px-4 rounded">
            Sign out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
