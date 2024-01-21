// RecipeCard.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RecipeCard({ id, title, summary, images, total_time, rating }) {
  const navigate = useNavigate();
  const imageUrls = JSON.parse(images);
  return (
    <div className="border p-4 hover:bg-gray-100 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1" onClick={() => navigate(`/recipe/${id}`)}>
    {imageUrls.length > 0 && (
      <img src={imageUrls[0]} alt={title} className="w-full h-32 object-cover rounded-md" loading="lazy" />
    )}      
    <div className="space-y-2 p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm">{summary}</p>
        {total_time && <p className="text-sm">Total Time: {total_time} </p>}
        {rating && <p className="text-sm">Rating: {rating} Stars</p>}
      </div>
    </div>
  );
  
}
