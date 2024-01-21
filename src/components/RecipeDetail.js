// RecipeDetail.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function RecipeDetail() {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      const { data, error } = await supabase
        .from('Recipes')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        console.error('Error fetching recipe', error);
      } else {
        // Parse the fields from JSON strings to objects
        data.ingredients = JSON.parse(data.ingredients || '[]');
        data.directions = JSON.parse(data.directions || '[]');
        data.images = JSON.parse(data.images || '[]');
        setRecipe(data);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <p className="text-center text-gray-700">Loading...</p>;

  const { title, prep_time, cook_time, active_time, total_time, servings, ingredients, directions, images, rating, url } = recipe;

  // Function to render lists of ingredients and directions
  const renderList = (items) => items.map((item, index) => <li key={index} className="mb-1">{item}</li>);

  return (
    <div className="bg-green-100 min-h-screen">
      <div className="p-4 lg:p-8 max-w-4xl mx-auto">
        <button onClick={() => navigate(-1)} className="text-green-700 hover:text-green-900 mb-4">Back</button>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {images.length > 0 && (
            <img src={images[0]} alt={title} className="w-full h-64 object-cover" />
          )}
          <div className="p-6">
            <h2 className="text-3xl font-bold text-green-700 mb-4">{title}</h2>
            <div className="flex flex-wrap justify-between items-center mb-4">
              {prep_time && <p className="badge">Prep Time: {prep_time} mins</p>}
              {cook_time && <p className="badge">Cook Time: {cook_time} mins</p>}
              {active_time && <p className="badge">Active Time: {active_time} mins</p>}
              {total_time && <p className="badge">Total Time: {total_time} mins</p>}
              {servings && <p className="badge">Servings: {servings}</p>}
              {rating && <p className="badge bg-yellow-500 text-white">{rating} Stars</p>}
            </div>
            {url && (
              <p className="text-sm mb-4">
                <strong>URL:</strong>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 ml-1">
                  View Original
                </a>
              </p>
            )}
            <div className="mt-4">
              {ingredients.length > 0 && (
                <>
                  <h3 className="text-2xl font-semibold text-green-700 mb-2">Ingredients</h3>
                  <ul className={`list-disc list-inside bg-green-50 p-4 rounded-lg ${ingredients.length > 10 ? 'md:grid md:grid-cols-2 gap-4' : ''}`}>
                    {renderList(ingredients)}
                  </ul>
                </>
              )}
              {directions.length > 0 && (
                <>
                  <h3 className="text-2xl font-semibold text-green-700 mb-2">Directions</h3>
                  <ol className="list-decimal list-inside bg-green-50 p-4 rounded-lg space-y-2">
                    {renderList(directions)}
                  </ol>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
}
