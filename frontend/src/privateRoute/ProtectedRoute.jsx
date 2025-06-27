// import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function ProtectedRoute({ children, role }) {
//   const { user } = useAuth();
//   const [hasAccess, setHasAccess] = useState(null);

//   useEffect(() => {
//     const checkRole = async () => {
//       if (!user?.email) {
//         setHasAccess(false);
//         return;
//       }

//       try {
//         const res = await fetch(
//           `http://localhost:5000/api/users/${user.email}`
//         );
//         const data = await res.json();

//         if (data?.role === role) {
//           setHasAccess(true);
//         } else {
//           setHasAccess(false);
//         }
//       } catch (err) {
//         console.error("Error checking role:", err);
//         setHasAccess(false);
//       }
//     };

//     checkRole();
//   }, [user, role]);

//   if (hasAccess === null)
//     return <div className="text-center mt-20">Loading...</div>;

//   return hasAccess ? children : <Navigate to="/login" />;
// }

// src/components/ProtectedRoute.jsx
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export default function ProtectedRoute({ children, expectedRole }) {
  const { user } = useContext(AuthContext);
  console.log("ProtectedRoute user:", user);
  const [hasAccess, setHasAccess] = useState(null);

  useEffect(() => {
    const checkUserRole = async () => {
      if (!user) {
        setHasAccess(false);
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/${user.uid}`
        );
        setHasAccess(res.data?.role === expectedRole);
      } catch (err) {
        setHasAccess(false);
      }
    };

    checkUserRole();
  }, [user, expectedRole]);

  if (hasAccess === null)
    return <div className="text-center mt-24 text-lg">Loading...</div>;
  return hasAccess ? children : <Navigate to="/login" />;
}
