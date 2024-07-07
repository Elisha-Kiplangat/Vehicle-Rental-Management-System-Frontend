import { useState } from 'react';
import SignInUp from '../pages/SignInUp'; 

const Nav = () => {
  const [showSignInUp, setShowSignInUp] = useState(false);

   const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAccountClick = () => {
    setShowSignInUp(true); 
  };

  const handleCloseSignInUp = () => {
    setShowSignInUp(false); 
  };

  return (
    <>
      <div className="navbar bg-blue-100 relative z-10 p-4 lg:px-10">
      <div className="navbar-start">
        <div tabIndex={0} role="button" className="btn btn-ghost">
          Car Rental
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a>Home</a></li>
          <li><a>About Us</a></li>
          <li><a>Contact Us</a></li>
        </ul>
      </div>
      <div className="navbar-end hidden lg:flex">
        <a className="btn" onClick={handleAccountClick}>Account</a>
      </div>
      <div className="lg:hidden flex items-center navbar-end">
        <button className="btn btn-ghost" onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden w-1/2 absolute top-14 bg-blue-100 shadow-lg right-0 rounded-lg">
          <div className="flex flex-col items-start p-4 space-y-2">
            <ul className="menu menu-vertical w-full">
              <li><a>Home</a></li>
              <li><a>About Us</a></li>
              <li><a>Contact Us</a></li>
            </ul>
            <a className="btn w-full" onClick={handleAccountClick}>Account</a>
          </div>
        </div>
      )}
    </div>


      {showSignInUp && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <SignInUp onClose={handleCloseSignInUp} />
        </div>
      )}
    </>
  );
};

export default Nav;
