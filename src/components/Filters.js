// Filters.js

export default function Filters({ onFilterChange, onRatingChange, onMaxTimeChange, onSortChange }) {
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-100 rounded-md shadow">
      <input
        type="text"
        placeholder="Search recipes..."
        onChange={onFilterChange}
        className="border p-2 w-full md:w-auto flex-1 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <select onChange={onRatingChange} className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500">
        {[...Array(11)].map((_, i) => (
          <option value={i * 0.5} key={i}>{i * 0.5} Stars</option>
        ))}
      </select>
      <label className="flex flex-col">
        <span className="mb-2">Max Time (mins):</span>
        <input
          type="range"
          min="0"
          max="2160"
          step="60"
          onChange={onMaxTimeChange}
          className="border p-2 rounded"
        />
      </label>
      <select onChange={onSortChange} className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500">
        <option value="title">Sort by Title</option>
        <option value="rating">Sort by Rating</option>
        <option value="total_time">Sort by Time</option>
      </select>
    </div>
  );
}
