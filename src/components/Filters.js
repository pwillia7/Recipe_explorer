import React from 'react';

export default function Filters({ onFilterChange, onRatingChange, onMaxTimeChange, onSortChange }) {
  return (
    <div className="p-4 flex flex-wrap gap-4">
      <input
        type="text"
        placeholder="Search recipes..."
        onChange={onFilterChange}
        className="border p-2 w-full md:w-auto flex-1 rounded"
      />
      <select onChange={onRatingChange} className="border p-2 rounded">
        {[...Array(11)].map((_, i) => (
          <option value={i * 0.5} key={i}>{i * 0.5} Stars</option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Max time (mins)"
        onChange={onMaxTimeChange}
        className="border p-2 w-full md:w-auto flex-1 rounded"
      />
      <select onChange={onSortChange} className="border p-2 rounded">
        <option value="title">Sort by Title</option>
        <option value="rating">Sort by Rating</option>
        <option value="total_time">Sort by Time</option>
      </select>
    </div>
  );
}
