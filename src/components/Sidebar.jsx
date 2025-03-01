import { useRef } from 'react'
import { motion } from 'framer-motion'
import { FaCheckCircle, FaClipboardList, FaStar, FaCalendarAlt, FaExclamationTriangle, FaSort } from 'react-icons/fa'
import TaskStats from './TaskStats'

const Sidebar = ({ filter, setFilter, sortBy, setSortBy, tasks, isDarkMode }) => {
  const filterOptions = [
    { id: 'all', label: 'All Tasks', icon: <FaClipboardList /> },
    { id: 'active', label: 'Active', icon: <FaStar /> },
    { id: 'completed', label: 'Completed', icon: <FaCheckCircle /> },
    { id: 'today', label: 'Today', icon: <FaCalendarAlt /> },
    { id: 'upcoming', label: 'Upcoming', icon: <FaCalendarAlt /> },
    { id: 'overdue', label: 'Overdue', icon: <FaExclamationTriangle /> },
  ]
  
  const priorityOptions = [
    { id: 'high', label: 'High Priority', color: 'bg-priority-high' },
    { id: 'medium', label: 'Medium Priority', color: 'bg-priority-medium' },
    { id: 'low', label: 'Low Priority', color: 'bg-priority-low' },
  ]
  
  return (
    <div className={`fixed top-0 left-0 h-full w-64 pt-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md overflow-auto z-10`}>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-3 flex items-center">
          <FaClipboardList className="mr-2" />
          Filters
        </h2>
        
        <div className="space-y-1 mb-6">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setFilter(option.id)}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center transition-colors ${
                filter === option.id
                  ? 'bg-primary text-white'
                  : isDarkMode
                    ? 'hover:bg-gray-700'
                    : 'hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>
        
        <h2 className="text-lg font-semibold mb-3 flex items-center">
          <FaStar className="mr-2" />
          Priority
        </h2>
        
        <div className="space-y-1 mb-6">
          {priorityOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setFilter(option.id)}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center transition-colors ${
                filter === option.id
                  ? 'bg-primary text-white'
                  : isDarkMode
                    ? 'hover:bg-gray-700'
                    : 'hover:bg-gray-100'
              }`}
            >
              <span className={`w-3 h-3 rounded-full ${option.color} mr-2`}></span>
              {option.label}
            </button>
          ))}
        </div>
        
        <h2 className="text-lg font-semibold mb-3 flex items-center">
          <FaSort className="mr-2" />
          Sort By
        </h2>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={`w-full p-2 rounded-md border ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600' 
              : 'bg-white border-gray-300'
          }`}
        >
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
          <option value="progress">Progress</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="createdAt">Recently Added</option>
        </select>
        
        <div className="mt-6">
          <TaskStats tasks={tasks} isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  )
}

export default Sidebar