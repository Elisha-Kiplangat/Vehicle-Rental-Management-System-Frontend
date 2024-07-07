import { useState } from 'react';
import SignInUp from '../pages/SignInUp'; 

const Nav = () => {
  const [showSignInUp, setShowSignInUp] = useState(false);

  const handleAccountClick = () => {
    setShowSignInUp(true); 
  };

  const handleCloseSignInUp = () => {
    setShowSignInUp(false); 
  };

  return (
    <>
      <div className="navbar bg-blue-100 relative z-10">
        <div className="navbar-start ml-10">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            Car Rental
          </div>
        </div>
        <div className="navbar-center lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a>Home</a></li>
            <li><a>About Us</a></li>
            <li><a>Contact Us</a></li>
          </ul>
        </div>
        <div className="navbar-end mr-10">
          <a className="btn" onClick={handleAccountClick}>Account</a>
        </div>
      </div>

      {showSignInUp && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <SignInUp onClose={handleCloseSignInUp} /> {/* Render SignInUp component with onClose prop */}
        </div>
      )}
    </>
  );
};

export default Nav;
