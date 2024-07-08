import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <div className="sidenav h-screen w-64 bg-base-200 p-5">
      <div className="sidenav-header mb-4 flex justify-center">
        <h2 className="text-xl font-bold"><Link to="/dashboard">Dashboard</Link></h2>
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
