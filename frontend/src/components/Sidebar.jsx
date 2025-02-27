import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };
  

  return (
    <div className="bg-indigo-900 text-white w-72 min-h-screen p-6 shadow-xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Task Manager
        </h1>
      </div>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link to="/tasks">
              <button className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center space-x-3
                ${isActive('/tasks') ? 'bg-indigo-700 shadow-lg' : 'hover:bg-indigo-800'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>Tasks Dashboard</span>
              </button>
            </Link>
          </li>
          <li>
            <Link to="/add-task">
              <button className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center space-x-3
                ${isActive('/add-task') ? 'bg-indigo-700 shadow-lg' : 'hover:bg-indigo-800'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>Add New Task</span>
              </button>
            </Link>
          </li>
          
          <li>
            <Link to="/deleted-tasks">
              <button className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center space-x-3
                ${isActive('/deleted-tasks') ? 'bg-indigo-700 shadow-lg' : 'hover:bg-indigo-800'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Trash</span>
              </button>
            </Link>
          </li>
          <li className="mt-8">
            <button 
              onClick={handleLogout}
              className="w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center space-x-3 text-red-400 hover:bg-red-900/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
