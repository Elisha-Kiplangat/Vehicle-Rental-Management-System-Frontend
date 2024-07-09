
import { Outlet } from "react-router-dom"
import Nav from "../components/Dashboard/Nav"
import SideNav from "../components/Dashboard/SideNav"
import { useState } from "react";


const UserDashboard = () => {

 const [sideNavVisible, setSideNavVisible] = useState(false);

  const [_searchQuery, setSearchQuery] = useState('');
  const [unreadMessagesCount] = useState(0); 
  const [profilePicture] = useState('https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg');


  const toggleSideNav = () => {
    setSideNavVisible(!sideNavVisible);
  };

  const closeSideNav = () => {
    setSideNavVisible(false);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="dashboard flex flex-row h-screen">
      
      <div className={`md:flex ${sideNavVisible ? 'flex' : 'hidden'} absolute md:relative z-10 md:z-auto`}>
        <SideNav onClose={closeSideNav} />
      </div>
      <div className="flex-grow">
        <Nav 
        toggleSideNav={toggleSideNav} 
        onSearchChange={handleSearchChange} 
        unreadMessagesCount={unreadMessagesCount} 
        profilePicture={profilePicture}
      />
        <div className="main-content flex-grow p-4">
          <Outlet />
        </div>
      </div>
      
    </div>
  );
    
}

export default UserDashboard;