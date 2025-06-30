// src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import RoomDetails from "../components/RoomDetails";
import AdminLayout from "../layout/AdminLayout";
import MainLayout from "../layout/MainLayout";
import BrowseRooms from "../pages/BrowseRooms";
import HomePage from "../pages/HomePage";
import AddRoom from "../pages/landlord/AddRoom";
import BookingList from "../pages/landlord/BookingList";
import Dashboard from "../pages/landlord/Dashboard";
import LandlordRooms from "../pages/landlord/LandlordRooms";
import LoginPage from "../pages/LoginPage";
import StudentBookings from "../pages/student/StudentBooking";
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
        element: <StudentBookings />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute requiredRole="landlord">
            {" "}
            <Dashboard />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "bookings",
        element: <BookingList />,
      },
      {
        path: "add-room",
        element: <AddRoom />,
      },
      {
        path: "rooms",
        element: <LandlordRooms />,
      },
    ],
  },
]);

export default router;
