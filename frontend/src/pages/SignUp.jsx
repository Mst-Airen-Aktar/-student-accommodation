// import { useState } from 'react';

// export default function Register() {
//   const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();
//     console.log(form);
//     // Add register request here
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4 text-center text-pink-800">Register</h2>
//         <input
//           name="name"
//           type="text"
//           placeholder="Name"
//           className="w-full p-2 mb-4 border rounded"
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 mb-4 border rounded"
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 mb-4 border rounded"
//           onChange={handleChange}
//           required
//         />
//         <select name="role" className="w-full p-2 mb-4 border rounded" onChange={handleChange}>
//           <option value="student">Student</option>
//           <option value="landlord">Landlord</option>
//         </select>
//         <button type="submit" className="w-full bg-pink-800 text-white py-2 rounded hover:bg-pink-700">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }

import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { AuthContext } from "../context/AuthProvider";
const Register = () => {
  const navigate = useNavigate();
  const { signUp, updateUserProfile } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const role = e.target.role.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        position: "top",
        icon: "error",
        title:
          "Password must contain at least 6 characters, one uppercase and one lowercase",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    signUp(email, password)
      .then((result) => {
        updateUserProfile({
          displayName: name,
          // photoURL: photo,
        }).then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registration Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          // navigate("/");
        });
        const newUser = { name, email, role, uid: result.user.uid };
        console.log(newUser);
        fetch("http://localhost:5000/api/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
      })
      .catch((error) => {});
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-64px)]">
      <h1 className="font-bold text-2xl  text-pink-800 mb-4">
        Create an Account
      </h1>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleRegister} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Role</span>
            </label>
            <select name="role" id="" className="input input-bordered">
              <option value="student">Student</option>
              <option value="landlord">Landlord</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              name="email"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                name="password"
                className="input input-bordered"
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

          <div className="form-control mt-6">
            <button className="btn bg-pink-800 w-full text-white hover:bg-pink-700 hover:shadow-lg transition-all duration-300">
              Register
            </button>
          </div>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        <p className="text-center pb-5">
          Already Have an account?{" "}
          <NavLink to="/login" className="font-bold text-pink-800">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
