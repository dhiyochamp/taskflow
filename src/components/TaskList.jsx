// src/components/TaskList.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TaskItem from './TaskItem'
import { FaSearch, FaSortAmountDown } from 'react-icons/fa'

const TaskList = ({ tasks, toggleComplete, deleteTask, editTask, updateProgress, isDarkMode, filter }) => {
  const [searchTerm, setSearchTerm] = useState('')
  
  // Filter tasks based on the current filter and search term
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const today = new Date().toISOString().split('T')[0]
    
    switch (filter) {
      case 'all':
        return matchesSearch
      case 'active':
        return !task.completed && matchesSearch
      case 'completed':
        return task.completed && matchesSearch
      case 'today':
        return task.dueDate === today && matchesSearch
      case 'upcoming':
        return task.dueDate > today && matchesSearch
      case 'overdue':
        return task.dueDate < today && !task.completed && matchesSearch
      case 'high':
        return task.priority === 'high' && matchesSearch
      case 'medium':
        return task.priority === 'medium' && matchesSearch
      case 'low':
        return task.priority === 'low' && matchesSearch
      default:
        return matchesSearch
    }
  })
  
  // Get filter title based on current filter
  const getFilterTitle = () => {
    switch (filter) {
      case 'all': return 'All Tasks'
      case 'active': return 'Active Tasks'
      case 'completed': return 'Completed Tasks'
      case 'today': return 'Today\'s Tasks'
      case 'upcoming': return 'Upcoming Tasks'
      case 'overdue': return 'Overdue Tasks'
      case 'high': return 'High Priority Tasks'
      case 'medium': return 'Medium Priority Tasks'
      case 'low': return 'Low Priority Tasks'
      default: return 'Tasks'
    }
  }
  
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">{getFilterTitle()}</h2>
        <div className={`relative rounded-lg overflow-hidden border ${
          isDarkMode ? 'border-gray-700' : 'border-gray-300'
        }`}>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full p-3 pl-10 ${
              isDarkMode 
                ? 'bg-gray-700 text-white placeholder-gray-400' 
                : 'bg-white text-gray-800 placeholder-gray-500'
            }`}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaSearch />
          </div>
        </div>
      </div>
      
      {filteredTasks.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-center py-12 rounded-lg border-2 border-dashed ${
            isDarkMode 
              ? 'border-gray-700 text-gray-400' 
              : 'border-gray-300 text-gray-500'
          }`}
        >
          <p className="text-lg">No tasks found</p>
          <p className="text-sm mt-1">
            {searchTerm 
              ? 'Try adjusting your search' 
              : 'Add a new task to get started'}
          </p>
        </motion.div>
      ) : (
        <AnimatePresence>
          {filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
              editTask={editTask}
              updateProgress={updateProgress}
              isDarkMode={isDarkMode}
            />
          ))}
        </AnimatePresence>
      )}
    </div>
  )
}

export default TaskList