import React from "react";
import Logo from "../assets/Logo.svg";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

const Navbar = (props) => {
  const isLoggedIn = props.isLoggedIn;
  const setIsLoggedIn = props.setIsLoggedIn;

  return (
    <div className="w-11/12 max-w-[1160px] mx-auto flex flex-row justify-between items-center py-4">
      {/* Logo */}
      <div>
        <Link to="/">
          <img src={Logo} alt="Logo" height={32} width={160} loading="lazy" />
        </Link>
      </div>

      <nav>
        <ul className="flex gap-x-6 text-richblack-25">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      {/* Button Group  */}
      <div className="flex items-center gap-x-4 text-richblack-100">
        {!isLoggedIn && (
          <Link to="/login">
            <button className="bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700">Log in</button>
          </Link>
        )}

        {!isLoggedIn && (
          <Link to="/signup">
            <button className="bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700">Sign up</button>
          </Link>
        )}

        {isLoggedIn && (
          <Link to="/">
            <button className="bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700" onClick={() => {
              setIsLoggedIn(false)
              toast.success("Logged out");
            }}>Log out</button>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/dashboard">
            <button className="bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700">Dashboard</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
