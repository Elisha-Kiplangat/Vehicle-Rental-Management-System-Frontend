import { Outlet } from "react-router-dom"
import Nav from "../components/Dashboard/Nav"
import AdminSideNav from "../components/AdminDashboard/AdminSideNav"
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [sideNavVisible, setSideNavVisible] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [unreadMessagesCount] = useState(0); 
  const [profilePicture] = useState('https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg');
  const [loading, setLoading] = useState(true); 
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  const toggleSideNav = () => {
    setSideNavVisible(!sideNavVisible);
  };

  const closeSideNav = () => {
    setSideNavVisible(false);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

   if (loading) {
   return <div className="flex justify-center items-center h-screen">
      <div className="spinner"></div> {<span className="loading loading-spinner text-info"></span>}
    </div>;
  }

  return (
    <div className="dashboard flex flex-row h-screen">
      
      <div className={`fixed md:flex ${sideNavVisible ? 'flex' : 'hidden'} absolute md:relative z-10 md:z-auto`}>
        <AdminSideNav onClose={closeSideNav} />
      </div>
      <div className="flex-grow flex flex-col">
        <Nav 
        toggleSideNav={toggleSideNav} 
        onSearchChange={handleSearchChange} 
        unreadMessagesCount={unreadMessagesCount} 
        profilePicture={profilePicture}
      />
        <div className="main-content flex-grow p-4 overflow-y-auto mt-16 md:mt-0">
          <Outlet context={{ searchQuery: searchQuery }}/>
        </div>
      </div>
      
    </div>
    
  );
    
}

export default AdminDashboard
