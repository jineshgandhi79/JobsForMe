import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to={"/"} className="logo-link">
          <img src="../src/assets/logo.webp" alt="logo" className="logo" />
        </Link>
      </div>
      
      <div className="navbar-center">
        <Link to={"/jobs"} className="nav-link">Jobs</Link>
      </div>
      
      <div className="navbar-right">
        <Link to={"/profile"} className="nav-link profile-link">
          <User className="profile-icon" size={20} />
          <span>Profile</span>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;