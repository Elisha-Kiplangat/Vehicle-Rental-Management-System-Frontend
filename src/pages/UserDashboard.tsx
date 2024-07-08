
import { Outlet } from "react-router-dom"
import Nav from "../components/Dashboard/Nav"
import SideNav from "../components/Dashboard/SideNav"
import { useState } from "react";


const UserDashboard = () => {

 const [sideNavVisible, setSideNavVisible] = useState(false);

  const toggleSideNav = () => {
    setSideNavVisible(!sideNavVisible);
  };

  const closeSideNav = () => {
    setSideNavVisible(false);
  };

  return (
    <div className="dashboard flex flex-row h-screen">
      {/* Conditional rendering based on screen size and state */}
      <div className={`md:flex ${sideNavVisible ? 'flex' : 'hidden'} absolute md:relative z-10 md:z-auto`}>
        <SideNav onClose={closeSideNav} />
      </div>
      <div className="flex-grow">
        <Nav toggleSideNav={toggleSideNav} />
        <div className="main-content flex-grow p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );

//     return (
//     <div className="dashboard flex flex-row h-screen">
//   <div className="hidden sm:flex">
//     <SideNav />
//   </div>
//   <div className="flex-grow">
//     <Nav />
//     <div className="main-content flex-grow p-4">
//       <Outlet />
//     </div>
//   </div>
// </div>
//     )
    
}

export default UserDashboard;