import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEdit, FaTrash, FaClock, FaFlag, FaAngleDown, FaAngleUp } from 'react-icons/fa'

const TaskItem = ({ task, toggleComplete, deleteTask, editTask, updateProgress, isDarkMode }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)
  const [editedDescription, setEditedDescription] = useState(task.description)
  const [editedPriority, setEditedPriority] = useState(task.priority)
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate)
  const [showDetails, setShowDetails] = useState(false)
  
  const handleEdit = () => {
    editTask(task.id, {
      title: editedTitle,
      description: editedDescription,
      priority: editedPriority,
      dueDate: editedDueDate
    })
    setIsEditing(false)
  }
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-priority-high'
      case 'medium':
        return 'bg-priority-medium'
      case 'low':
        return 'bg-priority-low'
      default:
        return 'bg-priority-medium'
    }
  }
  
  const getStatusLabel = () => {
    const today = new Date().toISOString().split('T')[0]
    
    if (task.completed) {
      return { text: 'Completed', class: 'bg-green-500' }
    } else if (task.dueDate < today) {
      return { text: 'Overdue', class: 'bg-red-500' }
    } else if (task.dueDate === today) {
      return { text: 'Today', class: 'bg-yellow-500' }
    } else {
      return { text: 'Upcoming', class: 'bg-blue-500' }
    }
  }
  
  const status = getStatusLabel()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className={`rounded-lg shadow-card mb-4 overflow-hidden ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } ${task.completed ? 'border-l-4 border-green-500' : ''}`}
    >
      {!isEditing ? (
        <div>
          <div className="p-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
              />
              
              <div className="ml-3 flex-grow">
                <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                  {task.title}
                </h3>
                
                <div className="flex items-center mt-1 space-x-2">
                  <span className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></span>
                  <span className="text-xs text-gray-500 flex items-center">
                    <FaClock className="mr-1" /> {task.dueDate}
                  </span>
                  <span className={`text-xs text-white px-2 py-0.5 rounded ${status.class}`}>
                    {status.text}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className={`p-2 rounded-full transition-colors ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                  aria-label="Edit task"
                >
                  <FaEdit />
                </button>
                
                <button
                  onClick={() => deleteTask(task.id)}
                  className={`p-2 rounded-full transition-colors ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                  aria-label="Delete task"
                >
                  <FaTrash />
                </button>
                
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className={`p-2 rounded-full transition-colors ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                  aria-label={showDetails ? "Hide details" : "Show details"}
                >
                  {showDetails ? <FaAngleUp /> : <FaAngleDown />}
                </button>
              </div>
            </div>
            
            {task.description && showDetails && (
              <div className="mt-3 pl-8 text-sm">
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {task.description}
                </p>
              </div>
            )}
            
            {showDetails && (
              <div className="pl-8 mt-4">
                <label className="block text-sm font-medium mb-1">Progress</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={task.progress || 0}
                  onChange={(e) => updateProgress(task.id, parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0%</span>
                  <span>{task.progress || 0}%</span>
                  <span>100%</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className="mb-3">
            <label htmlFor={`title-${task.id}`} className="block text-sm font-medium mb-1">
              Task Title
            </label>
            <input
              id={`title-${task.id}`}
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className={`w-full p-2 rounded-md border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-white border-gray-300'
              }`}
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor={`description-${task.id}`} className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              id={`description-${task.id}`}
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              rows="2"
              className={`w-full p-2 rounded-md border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-white border-gray-300'
              }`}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div>
              <label htmlFor={`priority-${task.id}`} className="block text-sm font-medium mb-1 flex items-center">
                <FaFlag className="mr-1 text-priority-medium" />
                Priority
              </label>
              <select
                id={`priority-${task.id}`}
                value={editedPriority}
                onChange={(e) => setEditedPriority(e.target.value)}
                className={`w-full p-2 rounded-md border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'bg-white border-gray-300'
                }`}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div>
              <label htmlFor={`dueDate-${task.id}`} className="block text-sm font-medium mb-1 flex items-center">
                <FaClock className="mr-1 text-gray-500" />
                Due Date
              </label>
              <input
                id={`dueDate-${task.id}`}
                type="date"
                value={editedDueDate}
                onChange={(e) => setEditedDueDate(e.target.value)}
                className={`w-full p-2 rounded-md border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'bg-white border-gray-300'
                }`}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(false)}
              className={`px-4 py-2 rounded-md ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEdit}
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors"
            >
              Save
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default TaskItem