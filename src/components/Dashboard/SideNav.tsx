import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../features/auth/AuthSlice";

interface SideNavProps {
  onClose: () => void;
}

const SideNav = ({onClose}: SideNavProps) => {

  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
try {
      await logout().unwrap();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  }
  
  return (
    <div className="sidenav h-screen w-60 bg-base-200 p-5 grid content-between">
      <div>
      <div className="sidenav-header mb-4 flex justify-center ">
        <h2 className="text-xl font-bold"><Link to="/dashboard">Dashboard</Link></h2>
        <button onClick={onClose} className="ml-auto mr-2 lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="sidenav-center mt-10">
        <ul className="menu">
        <li className="menu-item">
          <Link to="vehicles">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 7a1 1 0 001-1V4a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 001 1M3 7v10m18-10v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7m0 0h18" />
                </svg>
                Vehicles</Link>
          
        </li>
        <li className="menu-item">
          <Link to="profile">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7m2 4v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h4m1-5h4a1 1 0 011 1v1H8V3a1 1 0 011-1z" />
                </svg>
          Profile</Link>
        </li>
        <li className="menu-item">
            <Link to="bookings">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-8 0h8a2 2 0 012 2v10a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2m8 0V3m0 4v14m0-14H8m0 0V3" />
                </svg>
            Bookings</Link>
        </li>
        <li className="menu-item">
         <Link to="messages">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h5m5 0v5a2 2 0 01-2 2H8a2 2 0 01-2-2v-5a2 2 0 012-2h7a2 2 0 012 2zm-2-7v4m-8-4v4" />
                </svg>
         Messages</Link>
        </li>
      </ul>
      </div>
      </div>
      <div className="sidebar-bottom">
        <ul className="menu">
        <li className="menu-item">
          <a href="#settings" className="menu-link">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v2m0 12v2m8-10h2M4 12H2m3.514-7.514L5.636 4.636M18.364 19.364l1.122 1.122M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            Settings</a>
        </li>
        <li className="menu-item">
          <a className="menu-link" onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 11-4 0v-1a2 2 0 114 0zm2-11a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            Logout</a>
        </li>
      </ul>
      </div>
      
    </div>
  );
}

export default SideNav;
