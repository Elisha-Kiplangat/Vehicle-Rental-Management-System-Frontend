import { Link, useNavigate } from "react-router-dom";
// import { store } from "../../app/Store";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faTimes, faSignOutAlt, faUsers, faCar, faClipboardList, faEnvelope, faChartBar, faBuilding, faMapMarkerAlt, faCog } from '@fortawesome/free-solid-svg-icons';
// import { logout } from '../../features/auth/AuthContext';
// import { useDispatch } from "react-redux";

interface SideNavProps {
  onClose: () => void;
}

const AdminSideNav = ({ onClose }: SideNavProps) => {

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handleLogOut = () => {
    // dispatch(logout());
    navigate('/');
  };

  return (
    <div className="sidenav h-screen w-60 bg-base-200 p-5 grid content-between font-serif">
      <div>
        <div className="sidenav-header mb-4 flex justify-center ">
          <h2 className="text-xl font-bold text-blue-700 ml-2">
            <Link to="home">
             Dashboard
            </Link>
          </h2>
          <button onClick={onClose} className="ml-auto mr-2 lg:hidden">
            <FontAwesomeIcon icon={faTimes} className="text-blue-500" />
          </button>
        </div>
        <div className="sidenav-center mt-10">
          <ul className="menu font-bold">
            <li className="menu-item mb-2">
              <Link to="home">
                <FontAwesomeIcon icon={faHouse} className="mr-2 text-blue-700" />
                 Home
              </Link>
            </li>
            <li className="menu-item mb-2">
              <Link to="vehicles">
                <FontAwesomeIcon icon={faCar} className="mr-2 text-blue-700" />
                Vehicles
              </Link>
            </li>
            <li className="menu-item mb-2">
              <Link to="customers">
                <FontAwesomeIcon icon={faUsers} className="mr-2 text-blue-700" />
                Customers
              </Link>
            </li>
            <li className="menu-item mb-2">
              <Link to="bookings">
                <FontAwesomeIcon icon={faClipboardList} className="mr-2 text-blue-700" />
                Bookings
              </Link>
            </li>
            <li className="menu-item mb-2">
              <Link to="messages">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-blue-700" />
                Messages
              </Link>
            </li>
            <li className="menu-item mb-2">
              <Link to="reports">
                <FontAwesomeIcon icon={faChartBar} className="mr-2 text-blue-700" />
                Reports
              </Link>
            </li>
            <li className="menu-item mb-2">
              <Link to="fleets">
                <FontAwesomeIcon icon={faBuilding} className="mr-2 text-blue-700" />
                Fleet
              </Link>
            </li>
            <li className="menu-item mb-2">
              <Link to="locations">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-blue-700" />
                Locations
              </Link>
            </li>
            <li className="menu-item mb-2">
              <Link to="branches">
                <FontAwesomeIcon icon={faBuilding} className="mr-2 text-blue-700" />
                Branches
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="sidebar-bottom">
        <ul className="menu font-bold"> 
          <li className="menu-item mb-2">
            <a href="#settings" className="menu-link">
              <FontAwesomeIcon icon={faCog} className="mr-2 text-blue-700" />
              Settings
            </a>
          </li>
          <li className="menu-item">
            <Link to="/" onClick={handleLogOut}>
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-blue-700" /> Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSideNav;
