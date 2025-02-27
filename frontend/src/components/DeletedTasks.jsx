import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeletedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchDeletedTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks/deleted');
      setTasks(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRestore = async (taskId) => {
    try {
      await axios.post(`http://localhost:5000/api/tasks/${taskId}/restore`);
      
      // Remove task from deleted list
      setTasks(tasks.filter(task => task._id !== taskId));
      
      // Show success notification
      const notification = document.getElementById('restore-notification');
      notification.classList.remove('hidden');
      
      // Navigate to tasks list after delay
      setTimeout(() => {
        notification.classList.add('hidden');
        navigate('/tasks');
      }, 1500);
      
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDeletedTasks();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div id="restore-notification" className="hidden fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
        Task restored successfully!
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">Deleted Tasks</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white rounded-xl shadow-md p-6 opacity-75 hover:opacity-100 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 line-through">
                {task.title}
              </h2>
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                Deleted
              </span>
            </div>
            <p className="text-gray-600 line-through mb-4">{task.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Deleted on: {new Date(task.deletedAt).toLocaleDateString()}
              </span>
              <button 
                onClick={() => handleRestore(task._id)}
                className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                <span>Restore</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeletedTasks;
