import { Outlet } from "react-router-dom"
import Nav from "../components/Dashboard/Nav"
import AdminSideNav from "../components/AdminDashboard/AdminSideNav"
import { useEffect, useState } from "react";
import { useGetUserQuery } from "../features/auth/AuthSlice";

// Default avatar
const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?name=Admin&background=3b82f6&color=fff&size=128';

const AdminDashboard = () => {
  const [sideNavVisible, setSideNavVisible] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [unreadMessagesCount] = useState(0); 
  const [loading, setLoading] = useState(true); 
  
  // Get user data
  const userId = localStorage.getItem('user_id');
  const { data: user } = useGetUserQuery(Number(userId));
  
  // Generate profile picture from user data
  const profilePicture = user?.profilePicture || 
    (user?.full_name 
      ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name)}&background=3b82f6&color=fff&size=128`
      : DEFAULT_AVATAR); 
  
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
