import { ClipboardList, Home, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  const navItems = [
    { label: "Profile", to: "/landlord", icon: <Home size={18} /> },
    {
      label: "All Bookings Request",
      to: "/landlord/bookings",
      icon: <ClipboardList size={18} />,
    },
    { label: "Add Room", to: "/landlord/add-room", icon: <Plus size={18} /> },
    {
      label: "View Rooms",
      to: "/landlord/rooms",
      icon: <ClipboardList size={18} />,
    },
  ];

  return (
    <div className="w-64 bg-white shadow-md p-6 hidden md:block relative max-h-screen">
      <h1 className="text-2xl font-bold text-pink-800 mb-8">Landlord Panel</h1>
      <nav className="space-y-4">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-pink-50 text-gray-700 ${
              pathname === item.to ? "bg-pink-100 font-medium" : ""
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      {/* got to home page */}
      <div className="mt-auto absolute bottom-2">
        <Link
          to="/"
          className=" flex items-center gap-2 px-3 py-2 rounded hover:bg-pink-50 text-gray-700 "
        >
          <Home size={18} />
          Go to Home
        </Link>
      </div>
    </div>
  );
}
