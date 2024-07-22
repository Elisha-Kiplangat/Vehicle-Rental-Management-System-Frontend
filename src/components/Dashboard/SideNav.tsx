import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCar, faUser, faClipboardList, faEnvelope, faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

interface SideNavProps {
  onClose: () => void;
}

const SideNav = ({onClose}: SideNavProps) => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  }
  
  return (
    <div className="sidenav h-screen w-60 bg-base-200 p-5 grid content-between font-serif">
      <div>
        <div className="sidenav-header mb-4 flex justify-center ">
          <h2 className="text-xl font-bold text-blue-700 ml-4">
            <Link to="/dashboard">Dashboard</Link>
          </h2>
          <button onClick={onClose} className="ml-auto mr-2 lg:hidden">
            <FontAwesomeIcon icon={faTimes} className="text-blue-500" />
          </button>
        </div>
        <div className="sidenav-center mt-10">
          <ul className="menu font-bold">
            <li className="menu-item mb-2">
              <Link to="vehicles">
                <FontAwesomeIcon icon={faCar} className="mr-2 text-blue-700" />
                Vehicles
              </Link>
            </li>
            <li className="menu-item mb-2">
              <Link to="profile">
                <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-700" />
                Profile
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
            <a className="menu-link" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-blue-700" />
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideNav;
