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
      if (error) console.error('Error fetching recipe', error);
      else {
        data.ingredients = JSON.parse(data.ingredients);
        data.directions = JSON.parse(data.directions);
        // Parse images field
        data.images = JSON.parse(data.images);
        setRecipe(data);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  const { title, images, ingredients, directions, notes, servings, type, cuisine } = recipe;

  const renderList = (items) => items && items.map((item, index) => <li key={index}>{item}</li>);

  return (
    <div className="p-4">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-500">Back</button>
      <h2 className="text-2xl font-bold">{title}</h2>
      {images && images.map((image, index) => (
        <img key={index} src={image} alt={title} className="w-full h-64 object-cover my-4" />
      ))}
      <p><strong>Type:</strong> {type}</p>
      <p><strong>Cuisine:</strong> {cuisine}</p>
      <p><strong>Servings:</strong> {servings}</p>
      <h3 className="text-xl font-semibold">Ingredients</h3>
      <ul className="list-disc ml-5">{renderList(ingredients)}</ul>
      <h3 className="text-xl font-semibold mt-4">Directions</h3>
      <ol className="list-decimal ml-5">{renderList(directions)}</ol>
      {notes && (
        <>
          <h3 className="text-xl font-semibold mt-4">Notes</h3>
          <p>{notes}</p>
        </>
      )}
    </div>
  );
}
