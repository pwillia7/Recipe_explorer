import React, { useState, useEffect } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { supabase } from './supabaseClient';
import RecipeCard from './components/RecipeCard';
import RecipeDetail from './components/RecipeDetail';
import Filters from './components/Filters';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchRecipes();
    }
  }, [user]);

  const fetchRecipes = async () => {
    let { data: recipes, error } = await supabase.from('Recipes').select('*');
    if (error) console.log('error', error);
    else setRecipes(recipes);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {!user ? (
        <SignIn />
      ) : (
        <>
          <Filters onFilterChange={(e) => console.log(e.target.value)} />
          <Routes>
            <Route exact path="/" element={
              <InfiniteScroll
                dataLength={recipes.length}
                next={fetchRecipes}
                hasMore={true}
                loader={<h4 className="text-center">Loading...</h4>}
                className="flex-1"
              >
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recipes.map((recipe, index) => (
                    <RecipeCard key={index} {...recipe} />
                  ))}
                </div>
              </InfiniteScroll>
            } />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
