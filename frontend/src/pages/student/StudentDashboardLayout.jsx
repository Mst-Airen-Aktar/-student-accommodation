import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export default function StudentDashboardLayout() {
  const { user, signOutUser } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 space-y-6 fixed h-screen">
        <div className="text-xl font-bold text-pink-800">Student Dashboard</div>

        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/student"
            end
            className={({ isActive }) =>
              `p-2 rounded hover:bg-pink-50 ${
                isActive
                  ? "bg-pink-100 text-pink-800 font-semibold"
                  : "text-gray-700"
              }`
            }
          >
            My Rentals
          </NavLink>
          <NavLink
            to="/student/profile"
            className={({ isActive }) =>
              `p-2 rounded hover:bg-pink-50 ${
                isActive
                  ? "bg-pink-100 text-pink-800 font-semibold"
                  : "text-gray-700"
              }`
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="/student/notifications"
            className={({ isActive }) =>
              `p-2 rounded hover:bg-pink-50 ${
                isActive
                  ? "bg-pink-100 text-pink-800 font-semibold"
                  : "text-gray-700"
              }`
            }
          >
            Notifications
          </NavLink>
        </nav>

        <button
          onClick={signOutUser}
          className="bg-pink-700 text-white px-4 py-2 rounded hover:bg-pink-800"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-6 flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
