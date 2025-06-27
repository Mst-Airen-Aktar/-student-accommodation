export default function Filters({ filters, setFilters }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md grid md:grid-cols-4 gap-4">
      <select
        className="border p-2 rounded"
        value={filters.city}
        onChange={(e) => setFilters({ ...filters, city: e.target.value })}
      >
        <option value="">Select City</option>
        <option value="Helsinki">Helsinki</option>
        <option value="Tampere">Tampere</option>
        <option value="Turku">Turku</option>
      </select>

      <select
        className="border p-2 rounded"
        value={filters.university}
        onChange={(e) => setFilters({ ...filters, university: e.target.value })}
      >
        <option value="">Select University</option>
        <option value="University of Helsinki">University of Helsinki</option>
        <option value="Tampere University">Tampere University</option>
      </select>

      <input
        type="number"
        placeholder="Min Rent (€)"
        className="border p-2 rounded"
        value={filters.minRent}
        onChange={(e) => setFilters({ ...filters, minRent: e.target.value })}
      />

      <input
        type="number"
        placeholder="Max Rent (€)"
        className="border p-2 rounded"
        value={filters.maxRent}
        onChange={(e) => setFilters({ ...filters, maxRent: e.target.value })}
      />
    </div>
  );
}
