import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { supabase } from './supabaseClient';
import RecipeCard from './components/RecipeCard';
import RecipeDetail from './components/RecipeDetail';
import Filters from './components/Filters';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [rating, setRating] = useState('');
  const [maxTime, setMaxTime] = useState('');
  const [sortOrder, setSortOrder] = useState('title');
  const { user } = useAuth();
  const location = useLocation();
  const isRecipeDetailPage = location.pathname.startsWith('/recipe/');

  useEffect(() => {
    if (user) {
      fetchRecipes();
    }
  }, [user, searchQuery, rating, maxTime, sortOrder]);

  const fetchRecipes = async () => {
    let query = supabase.from('Recipes').select('*');

    // Apply filters
    if (searchQuery) query.ilike('title', `%${searchQuery}%`);
    if (rating) query.gte('rating', rating);
    if (maxTime) query.lte('total_time', maxTime);
    if (sortOrder) query.order(sortOrder, { ascending: sortOrder !== 'rating' });

    let { data: recipes, error } = await query;
    if (error) {
      console.log('error', error);
    } else {
      setRecipes(recipes);
    }
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleRatingChange = (e) => setRating(e.target.value);
  const handleMaxTimeChange = (e) => setMaxTime(e.target.value);
  const handleSortChange = (e) => setSortOrder(e.target.value);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      {!user ? (
        <SignIn />
      ) : (
        <Routes>
          <Route exact path="/" element={
            <>
              <Filters 
                onFilterChange={handleSearchChange} 
                onRatingChange={handleRatingChange}
                onMaxTimeChange={handleMaxTimeChange}
                onSortChange={handleSortChange}
              />
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipes.map((recipe, index) => (
                  <RecipeCard key={index} {...recipe} />
                ))}
              </div>
            </>
          } />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
