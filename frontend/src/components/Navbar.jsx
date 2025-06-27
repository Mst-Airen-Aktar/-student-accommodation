import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
const Navbar = () => {
  const { user, signOutUser, dark } = useContext(AuthContext);
  console.log(user);
  return (
    <nav className="bg-blue-900 shadow-lg sticky top-0 z-50 backdrop-blur-3xl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-white font-bold text-xl tracking-wide">
              Finland Student Accommodation
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="/" className="text-blue-100 hover:text-white transition">
              Home
            </a>
            <NavLink
              to="/listings"
              href="/accommodations"
              className="text-blue-100 hover:text-white transition"
            >
              View Listing
            </NavLink>
            <a
              href="/about"
              className="text-blue-100 hover:text-white transition"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-blue-100 hover:text-white transition"
            >
              Contact
            </a>
            <NavLink to={"/admin"}>Dashboard</NavLink>
            {/* <Link
              to="/login"
              className="text-blue-100 hover:text-white transition"
            >
              <button className="bg-white text-blue-900 px-4 py-1 rounded hover:bg-blue-100 font-semibold transition">
                Login
              </button>
            </Link> */}
            {/* Navbar End */}
            <div className="navbar-end flex items-center gap-4">
              {user && (
                <img
                  src={user?.photoURL}
                  alt="User Avatar"
                  className="h-10 w-10 rounded-full border-2 border-pink-800 my-anchor-element"
                />
              )}

              {user ? (
                <button
                  onClick={signOutUser}
                  className="btn bg-pink-800 hover:bg-pink-700 text-white px-4 py-3 rounded-2xl"
                >
                  Logout
                </button>
              ) : (
                <>
                  <NavLink to="/login">
                    <button className="btn bg-pink-800 hover:bg-pink-700 text-white px-4 py-3 rounded-2xl">
                      Login
                    </button>
                  </NavLink>
                  {/* <NavLink to="/auth/register">
                    <button className="btn bg-blue-500  text-white">
                      Register
                    </button>
                  </NavLink> */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
