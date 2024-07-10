

interface NavProps {
  toggleSideNav: () => void;
  onSearchChange: (query: string) => void;
  unreadMessagesCount: number;
  profilePicture: string;
}

const Nav = ({ toggleSideNav, onSearchChange, unreadMessagesCount, profilePicture }: NavProps) => {
  const handleSearch = (e: any) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="navbar bg-blue-400 h-12 flex pr-5">
      <div className="container flex justify-between">
        <div className="flex items-center md:hidden">
          <button onClick={toggleSideNav} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        <div className="form-control flex flex-row justify-center">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered rounded-r-none h-10 w-24 md:w-auto"
            onChange={handleSearch}
          />
          <button className="bg-blue-100 rounded-l-none rounded-r-lg h-10 w-8 flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
        <div className="flex flex-row justify-between mr-10">
          <div className="navbar-end flex flex-row">
            <div className="dropdown dropdown-bottom mr-6">
              <button tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {unreadMessagesCount > 0 && (
                    <span className="badge badge-xs badge-primary indicator-item">{unreadMessagesCount}</span>
                  )}
                </div>
              </button>
              <ul className="menu absolute menu-sm dropdown-content bg-blue-400 rounded-none rounded-b-box mt-1 p-2 shadow space-y-2">
                <li><a>Notifications</a></li>
              </ul>
            </div>
          </div>
          <div className="navbar-end flex flex-row">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="Profile" src={profilePicture} />
                </div>
              </div>
              <ul className="menu menu-sm dropdown-content bg-blue-400 rounded-none rounded-b-box mt-1 shadow space-y-2 right-0">
                <li><a>example@gmail.com</a></li>
                <li><a>Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;