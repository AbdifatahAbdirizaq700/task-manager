import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import DeletedTasks from "./components/DeletedTasks";
import Register from "./components/Register";
import Login from "./components/Login";
import UserManagement from "./components/UserManagement";

function App() {
  const isAuthenticated = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={!isAuthenticated ? <Login /> : <Navigate to="/tasks" />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route
          path="/tasks"
          element={isAuthenticated ? (
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1 p-8 bg-gray-100">
                <TaskList />
              </div>
            </div>
          ) : (
            <Navigate to="/" />
          )}
        />
        <Route
          path="/add-task"
          element={isAuthenticated ? (
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1 p-8 bg-gray-100">
                <AddTask />
              </div>
            </div>
          ) : (
            <Navigate to="/" />
          )}
        />
        <Route
          path="/users"
          element={isAuthenticated ? (
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1 p-8 bg-gray-100">
                <UserManagement />
              </div>
            </div>
          ) : (
            <Navigate to="/" />
          )}
        />
        <Route
          path="/deleted-tasks"
          element={isAuthenticated ? (
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1 p-8 bg-gray-100">
                <DeletedTasks />
              </div>
            </div>
          ) : (
            <Navigate to="/" />
          )}
        />
      </Routes>
    </Router>
  );
}

export default App;
import axios from 'axios';

// Add this before the App function
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
