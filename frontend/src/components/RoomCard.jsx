import { useState } from "react";
import { Link } from "react-router-dom";
export default function RoomCard({ room }) {
  const [mainImg, setMainImg] = useState(room.roomImages[0]);
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
      <img
        src={mainImg}
        alt="Main room"
        className="w-full h-48 object-cover rounded-t-xl"
      />
      <div className="flex space-x-2 mt-2">
        {room.roomImages.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Thumbnail ${i + 1}`}
            className={`w-16 h-16 object-cover rounded cursor-pointer border ${
              mainImg === img ? "border-pink-700" : "border-transparent"
            }`}
            onClick={() => setMainImg(img)}
          />
        ))}
      </div>

      {/* Image */}
      {/* <div className="relative h-48 w-full">
        <img
          src={room.roomImages?.[0] || "/no-image.png"}
          alt={room.title}
          className="h-full w-full object-cover"
        />
        <span className="absolute top-2 left-2 bg-pink-800 text-white text-xs px-2 py-1 rounded">
          €{room.rent}/mo
        </span>
        {room.furnished && (
          <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
            Furnished
          </span>
        )}
      </div> */}

      {/* Info */}
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-pink-800">{room.title}</h2>
          <span className="text-xs text-gray-500">
            {new Date(room.availableFrom).toLocaleDateString()}
          </span>
        </div>

        <p className="text-sm text-gray-600">{room.city}</p>
        <p className="text-sm text-gray-700">
          {room.roomSize} sqm • {room.roomType || "Room"}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 text-xs text-white">
          {room.internetIncluded && (
            <span className="bg-blue-600 px-2 py-1 rounded">Internet</span>
          )}
          {room.privateBathroom && (
            <span className="bg-indigo-600 px-2 py-1 rounded">
              Private Bath
            </span>
          )}
        </div>

        {/* Description preview */}
        <p className="text-xs text-gray-500 truncate">
          {room.description.slice(0, 60)}...
        </p>

        {/* View button */}
        <div className="pt-2 text-right">
          <Link
            to={`/room/${room._id}`}
            className="text-sm bg-pink-700 text-white px-4 py-1 rounded hover:bg-pink-800"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
