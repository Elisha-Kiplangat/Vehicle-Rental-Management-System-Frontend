
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import UserDashboard from "./pages/UserDashboard";
import About from "./pages/About";
import Vehicles from "./components/Dashboard/Vehicles";
import Profile from './components/Dashboard/Profile';
import Bookings from "./components/Dashboard/Bookings";
import Messages from "./components/Dashboard/Messages";
import AdminDashboard from "./pages/AdminDashboard";
import BookingsHistory from "./components/AdminDashboard/BookingsHistory";
import Customers from "./components/AdminDashboard/Customers";
import VehiclesData from "./components/AdminDashboard/VehiclesData";
import MessageSupport from "./components/AdminDashboard/MessageSupport";
import Reports from './components/AdminDashboard/Reports';
import Contact from "./pages/Contact";
import FleetManagement from "./components/AdminDashboard/FleetManagement";
import Locations from "./components/AdminDashboard/Locations";
import Branches from "./components/AdminDashboard/Branches";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard/user" element={<UserDashboard />}>
          <Route path="" element={<Navigate to="vehicles" replace />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="messages" element={<Messages />} />
        </Route>
        <Route path="/dashboard/admin" element={<AdminDashboard />}>
          <Route path="" element={<VehiclesData />} />
          <Route path="messages" element={<MessageSupport />} />
          <Route path="bookings" element={<BookingsHistory />} />
          <Route path="customers" element={<Customers />} />
          <Route path="reports" element={<Reports />} />
          <Route path="fleets" element={<FleetManagement />} />
          <Route path="locations" element={<Locations />} />
          <Route path="branches" element={<Branches />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
