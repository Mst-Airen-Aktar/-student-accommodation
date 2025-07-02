import { Menu, X } from "lucide-react"; // Make sure lucide-react is installed
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userRole, setUserRole] = useState(null); // Optional: if you want to manage user roles
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const closeMobile = () => setMobileOpen(false);

  //get user from database
  useEffect(() => {
    if (user) {
      // Assuming you have a function to fetch user details
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/users/${user?.uid}`
          );
          const userData = await response.json();
          console.log("Fetched user data:", userData);
          setUserRole(userData.role);
          console.log("Fetched user role:", userData.role);
        } catch (error) {
          console.error("Failed to fetch user details:", error);
        }
      };
      fetchUserDetails();
    }
  }, [user]);

  const handleDashboard = () => {
    console.log(userRole);

    setDropdownOpen(false);
    // if (userRole) return;
    if (userRole === "student") {
      navigate("/student");
    } else if (userRole === "landlord") {
      navigate("/landlord");
    } else if (userRole === "admin") {
      navigate("/admin");
    }
  };

  //   const navigate = useNavigate();

  // const handleDashboard = () => {

  // };

  const menuLinks = (
    <>
      <NavLink
        to="/"
        onClick={closeMobile}
        className={({ isActive }) =>
          isActive
            ? "text-white font-semibold"
            : "text-blue-100 hover:text-white transition"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/listings"
        onClick={closeMobile}
        className={({ isActive }) =>
          isActive
            ? "text-white font-semibold"
            : "text-blue-100 hover:text-white transition"
        }
      >
        View Listing
      </NavLink>
      <NavLink
        to="/about"
        onClick={closeMobile}
        className={({ isActive }) =>
          isActive
            ? "text-white font-semibold"
            : "text-blue-100 hover:text-white transition"
        }
      >
        About
      </NavLink>
      <NavLink
        to="/contact"
        onClick={closeMobile}
        className={({ isActive }) =>
          isActive
            ? "text-white font-semibold"
            : "text-blue-100 hover:text-white transition"
        }
      >
        Contact
      </NavLink>
    </>
  );

  return (
    <nav className="bg-blue-900 shadow-lg sticky top-0 z-50 backdrop-blur-3xl">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <div className="text-white font-bold text-xl tracking-wide">
          Finland Student Accommodation
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {menuLinks}
          {user ? (
            <div className="relative">
              <img
                onClick={toggleDropdown}
                src={
                  user.photoURL || "https://www.gravatar.com/avatar?d=mp&s=200"
                }
                alt="Avatar"
                className="h-10 w-10 rounded-full border-2 border-pink-800 cursor-pointer"
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    <span className="block font-medium">
                      {user.displayName || "User"}
                    </span>
                    <span className="block text-xs text-gray-500 truncate">
                      {user.email}
                    </span>
                  </div>
                  <button
                    onClick={handleDashboard}
                    className="w-full px-4 py-2 text-left hover:bg-pink-100 text-sm text-pink-800"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={signOutUser}
                    className="w-full px-4 py-2 text-left hover:bg-red-100 text-sm text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login">
              <button className="bg-pink-800 hover:bg-pink-700 text-white px-4 py-2 rounded-xl font-medium transition">
                Login
              </button>
            </NavLink>
          )}
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden text-white">
          {mobileOpen ? (
            <X size={28} onClick={toggleMobile} />
          ) : (
            <Menu size={28} onClick={toggleMobile} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-blue-800 px-6 pb-4 space-y-3">
          <div className="flex flex-col space-y-2">{menuLinks}</div>
          {user ? (
            <div className="flex flex-col gap-2">
              <button
                onClick={handleDashboard}
                className="text-left text-pink-100 hover:text-white"
              >
                Dashboard
              </button>
              <button
                onClick={signOutUser}
                className="text-left text-red-300 hover:text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/login" onClick={closeMobile}>
              <button className="bg-pink-800 hover:bg-pink-700 text-white px-4 py-2 rounded-xl font-medium w-full">
                Login
              </button>
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
