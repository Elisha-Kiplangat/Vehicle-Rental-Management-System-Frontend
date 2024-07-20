
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faUser, faClipboardList, faEnvelope, faChartLine } from '@fortawesome/free-solid-svg-icons';

const AdminHome = () => {
  const metrics = {
    totalVehicles: 120,
    totalUsers: 85,
    totalBookings: 340,
    unreadMessages: 15,
    activeRentals: 25,
  };

  return (
    <div className="admin-home p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="metric-card bg-white p-6 shadow-md rounded-lg flex items-center">
          <FontAwesomeIcon icon={faCar} className="text-blue-700 text-4xl mr-4" />
          <div>
            <p className="text-2xl font-bold">{metrics.totalVehicles}</p>
            <p className="text-gray-500">Total Vehicles</p>
          </div>
        </div>
        <div className="metric-card bg-white p-6 shadow-md rounded-lg flex items-center">
          <FontAwesomeIcon icon={faUser} className="text-blue-700 text-4xl mr-4" />
          <div>
            <p className="text-2xl font-bold">{metrics.totalUsers}</p>
            <p className="text-gray-500">Total Users</p>
          </div>
        </div>
        <div className="metric-card bg-white p-6 shadow-md rounded-lg flex items-center">
          <FontAwesomeIcon icon={faClipboardList} className="text-blue-700 text-4xl mr-4" />
          <div>
            <p className="text-2xl font-bold">{metrics.totalBookings}</p>
            <p className="text-gray-500">Total Bookings</p>
          </div>
        </div>
        <div className="metric-card bg-white p-6 shadow-md rounded-lg flex items-center">
          <FontAwesomeIcon icon={faEnvelope} className="text-blue-700 text-4xl mr-4" />
          <div>
            <p className="text-2xl font-bold">{metrics.unreadMessages}</p>
            <p className="text-gray-500">Unread Messages</p>
          </div>
        </div>
        <div className="metric-card bg-white p-6 shadow-md rounded-lg flex items-center">
          <FontAwesomeIcon icon={faChartLine} className="text-blue-700 text-4xl mr-4" />
          <div>
            <p className="text-2xl font-bold">{metrics.activeRentals}</p>
            <p className="text-gray-500">Active Rentals</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
