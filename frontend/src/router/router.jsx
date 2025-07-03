// src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import RoomDetails from "../components/RoomDetails";
import AdminLayout from "../layout/AdminLayout";
import LandLordLayout from "../layout/LandLordLayout";
import MainLayout from "../layout/MainLayout";
import AdminAllUsers from "../pages/Admin/AdminAllUsers";
import AdminStudentVerification from "../pages/Admin/AdminStudentVerification";
import LandlordVerification from "../pages/Admin/andlordVerification";
import VerifyUsers from "../pages/Admin/VerifyUsers";
import BrowseRooms from "../pages/BrowseRooms";
import HomePage from "../pages/HomePage";
import AddRoom from "../pages/landlord/AddRoom";
import BookingList from "../pages/landlord/BookingList";
import LandlordProfile from "../pages/landlord/LandlordProfile";
import LandlordRooms from "../pages/landlord/LandlordRooms";
import LoginPage from "../pages/LoginPage";
import SignUp from "../pages/SignUp";
import StudentBookings from "../pages/student/StudentBooking";
import StudentDashboardLayout from "../pages/student/StudentDashboardLayout";
import StudentProfile from "../pages/student/StudentProfile";
import ProtectedRoute from "../private/ProtectedRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/listings",
        element: <BrowseRooms />,
      },
      {
        path: "/room/:id",
        element: <RoomDetails />,
      },
      {
        path: "/my-bookings",
        element: (
          <ProtectedRoute requiredRole="student">
            {" "}
            <StudentBookings />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/student",
    element: (
      <ProtectedRoute requiredRole="student">
        {" "}
        <StudentDashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <StudentBookings /> },
      {
        path: "/student/profile",
        element: (
          <ProtectedRoute requiredRole="student">
            <StudentProfile />
          </ProtectedRoute>
        ),
      },
      { path: "notifications", element: <h1>notifications</h1> },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <h1>Admin Dashboard</h1> },
      { path: "users", element: <AdminAllUsers /> },
      { path: "verify", element: <LandlordVerification /> },
      { path: "settings", element: <AdminStudentVerification /> },
    ],
  },
  {
    path: "/landlord",
    element: <LandLordLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute requiredRole="landlord">
            {" "}
            <LandlordProfile />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "bookings",
        element: (
          <ProtectedRoute requiredRole="landlord">
            {" "}
            <BookingList />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "add-room",
        element: (
          <ProtectedRoute requiredRole="landlord">
            {" "}
            <AddRoom />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "rooms",
        element: (
          <ProtectedRoute requiredRole="landlord">
            {" "}
            <LandlordRooms />{" "}
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/verify",
    element: <VerifyUsers />,
  },
  {
    path: "/profile",
    element: <LandlordProfile />,
  },
]);

export default router;
