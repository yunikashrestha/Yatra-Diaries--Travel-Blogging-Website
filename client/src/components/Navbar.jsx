import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isAdmin=sessionStorage.getItem('admin')

  // Check login status on component mount
  const loginStatus = sessionStorage.getItem("login");
  useEffect(() => {
    setIsLoggedIn(!!loginStatus);
  }, [loginStatus]);

  function logout() {
    sessionStorage.removeItem("login");
     sessionStorage.removeItem("admin");
    setIsLoggedIn(false); // update the state so it re-renders
  }

  return (
    <div className="w-full h-16 flex items-center justify-between">
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold border-none">
        <img src="/llogo.png" className="w-8 h-8" alt="" />
        <span>Yatra Diaries</span>
      </Link>

      {/* DESKTOP MENU */}
      <div className="flex items-center gap-8 font-bold">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {isAdmin=="true" && 
        <Link to="/admin">Admin</Link>}


        {isLoggedIn && (
          <Link to={`/profile/${loginStatus}`}>Profile</Link>
        )}

        {!isLoggedIn && (
          <Link to="/login">
            <button className="px-5 py-1 rounded-xl bg-blue-800 text-white">Login</button>
          </Link>
        )}

        {isLoggedIn && (
          <button
            className="px-5 py-1 rounded-xl bg-red-800 text-white"
            onClick={logout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
