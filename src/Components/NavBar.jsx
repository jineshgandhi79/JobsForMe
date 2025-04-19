import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';

function NavBar() {
  const location = useLocation();
  const isJobsRoute = location.pathname === '/jobs';
  const isProfileRoute = location.pathname === '/profile';

  return (
    <nav className="flex justify-between items-center px-8 bg-gradient-to-r from-indigo-700 to-indigo-600 shadow-md h-16 sticky top-0 z-[1000]">
      <div className="flex items-center flex-1">
        <Link to={"/"} className="flex items-center bg-white/15 px-3 py-1.5 rounded-lg transition-all duration-300 hover:bg-white/25 hover:-translate-y-0.5">
          <img src="../src/assets/job-search.png" alt="logo" className="h-8 w-auto filter drop-shadow" />
        </Link>
      </div>
      
      <div className="flex items-center justify-center flex-2">
        <Link to={"/jobs"} 
          className={`mx-4 text-white font-medium px-3 py-2 rounded-md transition-all duration-300 hover:bg-white/10 relative
          after:content-[''] after:absolute after:h-0.5 after:bottom-0 after:left-1/2 after:-translate-x-1/2 
          after:bg-white after:transition-all after:duration-300 
          ${isJobsRoute ? 'bg-white/10 after:w-4/5' : 'after:w-0 hover:after:w-4/5'}`}>
          Jobs
        </Link>
      </div>
      
      <div className="flex items-center justify-end flex-1">
        <Link to={"/profile"} 
          className={`flex items-center gap-2 text-white px-4 py-2 rounded-full shadow transition-all
          duration-300 hover:shadow-lg hover:-translate-y-0.5
          ${isProfileRoute ? 'bg-white/25' : 'bg-white/15 hover:bg-white/25'}`}>
          <User className="stroke-current stroke-2 filter drop-shadow" size={20} />
          <span className="font-medium md:inline hidden">Profile</span>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;