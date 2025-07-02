import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export default function AdminLayout() {
  const { signOutUser } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col">
        <div className="text-2xl font-bold p-6 border-b border-blue-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-blue-800 ${
                isActive ? "bg-blue-800" : ""
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-blue-800 ${
                isActive ? "bg-blue-800" : ""
              }`
            }
          >
            All Users
          </NavLink>
          <NavLink
            to="/admin/verify"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-blue-800 ${
                isActive ? "bg-blue-800" : ""
              }`
            }
          >
            Verification
          </NavLink>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-blue-800 ${
                isActive ? "bg-blue-800" : ""
              }`
            }
          >
            Settings
          </NavLink>
        </nav>
        <div className="p-4 border-t border-blue-700">
          <button
            onClick={signOutUser}
            className="w-full bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-white"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
