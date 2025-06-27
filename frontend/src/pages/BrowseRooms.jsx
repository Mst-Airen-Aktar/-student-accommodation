import axios from "axios";
import { useEffect, useState } from "react";
import RoomCard from "../components/RoomCard";

export default function BrowseRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInfo, setSearchInfo] = useState("");

  const fetchRooms = async (query = "") => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/rooms${query}`);
      setRooms(res.data);
      setSearchInfo(query ? `Showing ${res.data.length} result(s)` : "");
    } catch (err) {
      console.error("Error fetching rooms:", err);
    } finally {
      setLoading(false);
    }
  };

  //   const handleFilter = (e) => {
  //     e.preventDefault();
  //     const form = new FormData(e.target);
  //     const params = new URLSearchParams();

  //     for (let [key, value] of form.entries()) {
  //       if (value !== "" && value !== "false") {
  //         params.append(key, value);
  //       }
  //     }

  //     fetchRooms("?" + params.toString());
  //   };

  const handleFilter = async (e) => {
    const form = new FormData(e.currentTarget); // changed from e.target
    const params = new URLSearchParams();

    for (let [key, value] of form.entries()) {
      if (value !== "" && value !== "false") {
        params.append(key, value);
      }
    }
    console.log("Sending query:", params.toString()); // ✅ See what is being sent
    fetchRooms("?" + params.toString());
  };

  useEffect(() => {
    fetchRooms(); // initial load
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-pink-800 mb-8 text-center">
          🏡 Browse Available Rooms
        </h1>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Filter Sidebar */}
          <form
            onInput={handleFilter}
            className="bg-white p-5 rounded-lg shadow-md md:sticky top-4 h-fit"
          >
            <h2 className="text-lg font-semibold mb-4">🔍 Filter Rooms</h2>

            <div className="space-y-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                className="w-full border px-3 py-2 rounded"
              />

              <select
                name="roomType"
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Any Room Type</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Shared">Shared</option>
                <option value="Studio">Studio</option>
              </select>

              <input
                type="text"
                name="keyword"
                placeholder="Search by keyword"
                className="w-full border px-3 py-2 rounded"
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  name="minRent"
                  placeholder="Min €"
                  className="border px-3 py-2 rounded"
                />
                <input
                  type="number"
                  name="maxRent"
                  placeholder="Max €"
                  className="border px-3 py-2 rounded"
                />
              </div>

              <input
                type="date"
                name="availableFrom"
                className="w-full border px-3 py-2 rounded"
              />

              <label className="flex items-center space-x-2">
                <input type="checkbox" name="furnished" value="true" />
                <span>Furnished</span>
              </label>

              <label className="flex items-center space-x-2">
                <input type="checkbox" name="privateBathroom" value="true" />
                <span>Private Bathroom</span>
              </label>

              <label className="flex items-center space-x-2">
                <input type="checkbox" name="internetIncluded" value="true" />
                <span>Internet Included</span>
              </label>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  name="minSize"
                  placeholder="Min sqm"
                  className="border px-3 py-2 rounded"
                />
                <input
                  type="number"
                  name="maxSize"
                  placeholder="Max sqm"
                  className="border px-3 py-2 rounded"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-pink-800 hover:bg-pink-700 text-white rounded px-4 py-2 mt-2"
              >
                Apply Filters
              </button>
            </div>
          </form>

          {/* Room Results */}
          <div className="md:col-span-3">
            {loading ? (
              <p className="text-center text-gray-500 py-10">
                Loading rooms...
              </p>
            ) : rooms.length === 0 ? (
              <p className="text-center text-gray-500 py-10">
                ❌ No rooms found.
              </p>
            ) : (
              <>
                <p className="text-sm text-gray-500 mb-3">{searchInfo}</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rooms.map((room) => (
                    <RoomCard key={room._id} room={room} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
