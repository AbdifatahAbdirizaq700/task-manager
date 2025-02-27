import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddTask = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: new Date(),
    priority: "medium",
    category: "",
    assignee: "",
    tags: []
  });
  
  const [preview, setPreview] = useState(false);
  
  // Auto-save draft
  useEffect(() => {
    const savedDraft = localStorage.getItem('taskDraft');
    if (savedDraft) {
      setFormData(JSON.parse(savedDraft));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('taskDraft', JSON.stringify(formData));
  }, [formData]);

  const getPriorityColor = (priority) => {
    const colors = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800"
    };
    return colors[priority];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', formData);
      if (response.status === 201) {
        localStorage.removeItem('taskDraft');
        navigate('/tasks');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addTag = (tag) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Create New Task</h1>
       
      </div>

      {preview ? (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <span className={`inline-block px-3 py-1 rounded-full text-sm ${getPriorityColor(formData.priority)} mb-4`}>
            {formData.priority.toUpperCase()}
          </span>
          <h2 className="text-2xl font-bold mb-4">{formData.title}</h2>
          <p className="text-gray-600 mb-4">{formData.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
          <div className="text-sm text-gray-500">
            Due: {formData.dueDate.toLocaleDateString()}
          </div>
          {formData.assignee && (
            <div className="mt-2 text-sm text-gray-500">
              Assigned to: {formData.assignee}
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <DatePicker
                selected={formData.dueDate}
                onChange={(date) => setFormData({...formData, dueDate: date})}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category & Tags
            </label>
            <input
              type="text"
              placeholder="Type and press Enter to add tag"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag(e.target.value);
                  e.target.value = '';
                }
              }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag, index) => (
                <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

      

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-indigo-900 transition-all duration-200 font-medium"
          >
            Create Task
          </button>
        </form>
      )}
    </div>
  );
};

export default AddTask;
