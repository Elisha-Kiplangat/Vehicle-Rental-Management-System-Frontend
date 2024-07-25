
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
import AdminHome from "./components/AdminDashboard/AdminHome";
import ErrorPage from "./pages/ErrorPage";
import { store } from "./app/store";
import { Provider } from "react-redux";
import PrivateRoute from "./features/auth/PrivateRoute";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";

const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancelled" element={<CancelPage />} />
        <Route path="/dashboard/user" element={<PrivateRoute requiredRole="user"><UserDashboard /></PrivateRoute>}>
          <Route path="" element={<Navigate to="vehicles" replace />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="messages" element={<Messages />} />
        </Route>
        <Route path="/dashboard/admin" element={<PrivateRoute requiredRole="admin"><AdminDashboard /></PrivateRoute>}>
          <Route path="" element={<Navigate to="home" replace />} />
          <Route path="home" element={<AdminHome />} />
          <Route path="vehicles" element={<VehiclesData />} />
          <Route path="messages" element={<MessageSupport />} />
          <Route path="bookings" element={<BookingsHistory />} />
          <Route path="customers" element={<Customers />} />
          <Route path="reports" element={<Reports />} />
          <Route path="fleets" element={<FleetManagement />} />
          <Route path="locations" element={<Locations />} />
          <Route path="branches" element={<Branches />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
    </Provider>
  );
};

export default App;
