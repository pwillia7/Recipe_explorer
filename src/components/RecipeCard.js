import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RecipeCard({ id, title, summary, images }) {
  const navigate = useNavigate();

  // Parse the images string into an array
  const imageUrls = JSON.parse(images);

  return (
    <div 
      className="border p-4 hover:bg-gray-100 cursor-pointer"
      onClick={() => navigate(`/recipe/${id}`)}
    >
      {imageUrls.length > 0 && <img src={imageUrls[0]} alt={title} className="w-full h-32 object-cover" />}
      <div className="space-y-2">
        <h3 className="text-lg font-bold mt-2">{title}</h3>
        <p className="text-sm hover:text-gray-500">{summary}</p>
        {/* Add additional hover content here */}
      </div>
    </div>
  );
}
