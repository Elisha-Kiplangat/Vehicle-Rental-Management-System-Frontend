// import { createBrowserRouter } from "react-router-dom"
import { Outlet } from "react-router-dom"
import Nav from "../components/Dashboard/Nav"
import SideNav from "../components/Dashboard/SideNav"
// import Vehicles from "../components/Dashboard/Vehicles"


const UserDashboard = () => {



    return (
    <div className="dashboard flex flex-row h-screen">
      <SideNav />
      <div className="container">
        <Nav />
        <div className="main-content flex-grow p-4">
          <Outlet />
        </div>
      </div>
    </div>
    )
    
}

export default UserDashboard