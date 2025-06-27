// const LoginPage = () => {
//   return (
// <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700">
//     <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
//         <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Sign in to your account</h2>
//         <form className="space-y-5">
//             <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
//                     Email address
//                 </label>
//                 <input
//                     id="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                     placeholder="you@example.com"
//                 />
//             </div>
//             <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
//                     Password
//                 </label>
//                 <input
//                     id="password"
//                     type="password"
//                     autoComplete="current-password"
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                     placeholder="••••••••"
//                 />
//             </div>
//             <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                     <input
//                         id="remember"
//                         type="checkbox"
//                         className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                     />
//                     <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
//                         Remember me
//                     </label>
//                 </div>
//                 <div className="text-sm">
//                     <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
//                         Forgot password?
//                     </a>
//                 </div>
//             </div>
//             <button
//                 type="submit"
//                 className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-200"
//             >
//                 Sign In
//             </button>
//         </form>
//         <p className="mt-6 text-center text-sm text-gray-600">
//             Don't have an account?{' '}
//             <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
//                 Sign up
//             </a>
//         </p>
//     </div>
// </div>
//   );
// }
// export default LoginPage;import { useState } from 'react';

// import { useState } from "react";

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = (e) => {
//     e.preventDefault();
//     console.log({ email, password });
//     // Add login request here
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4 text-center text-pink-800">Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 mb-4 border rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 mb-4 border rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit" className="w-full bg-pink-800 text-white py-2 rounded hover:bg-pink-700">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { AuthContext } from "../context/AuthProvider";
const Login = () => {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setError("");
    signIn(email, password)
      .then((result) => {
        //sweet alert
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Invalid Email or Password",
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        const { email, displayName } = result.user;
        fetch("https://chill-gamer-server-nu.vercel.app/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, displayName }),
        });

        navigate("/");
      })
      .catch((error) => {
        setError("Failed to sign in with Google. Please try again.");
      });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-64px)]">
      <h1 className="font-bold text-2xl text-pink-800 mb-4">
        Login to Your Account
      </h1>
      <div className="card  bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleLogin} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              name="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control ">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                name="password"
                className="input input-bordered border border-amber-300"
                required
              />
              <span
                onClick={togglePassword}
                className="absolute  right-6 top-[40%] bottom-[50%] cursor-pointer z-50"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <label className="label">Forgot password?</label>
          <div className="form-control mt-6 ">
            <button className="py-2 rounded-2xl w-full bg-pink-800 text-white hover:bg-pink-700 hover:shadow-lg transition-all duration-300">
              Login
            </button>
          </div>
        </form>
        <div className="divider px-8">OR</div>
        <div className="form-control mt-1 px-8">
          <button
            onClick={handleGoogleLogin}
            className="btn w-full bg-base-100"
          >
            <FaGoogle /> Login with Google
          </button>
        </div>
        <p className="text-center py-5">
          Don't Have an account?{" "}
          <NavLink to="/register" className="font-bold text-pink-800">
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
