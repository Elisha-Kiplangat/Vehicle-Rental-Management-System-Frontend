import { Link } from "react-router-dom";

interface SideNavProps {
  onClose: () => void;
}

const SideNav = ({onClose}: SideNavProps) => {
  return (
    <div className="sidenav h-screen w-64 bg-base-200 p-5 grid content-between">
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
          <Link to="/dashboard/vehicles">Vehicles</Link>
        </li>
        <li className="menu-item">
          <a href="#contact" className="menu-link">Profile</a>
        </li>
        <li className="menu-item">
          <a href="#about" className="menu-link">Messages</a>
        </li>
        <li className="menu-item">
          <a href="#services" className="menu-link">History</a>
        </li>
        <li className="menu-item">
          <a href="#contact" className="menu-link">Contact</a>
        </li>
      </ul>
      </div>
      </div>
      <div className="sidebar-bottom">
        <ul className="menu">
        <li className="menu-item">
          <a href="#settings" className="menu-link">Settings</a>
        </li>
        <li className="menu-item">
          <a href="#logout" className="menu-link">Logout</a>
        </li>
      </ul>
      </div>
      
    </div>
  );
}

export default SideNav;
