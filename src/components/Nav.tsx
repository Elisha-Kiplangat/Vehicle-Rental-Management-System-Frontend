
const Nav = () => {
  return (
    <>
      <div className="navbar bg-blue-100">
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
    <a className="btn">Account</a>
  </div>
</div>
    
    </>
  )
}

export default Nav