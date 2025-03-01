// src/components/TaskForm.jsx
import { useState } from 'react'
import { FaPlus, FaTimes, FaClock, FaFlag } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const TaskForm = ({ addTask, isDarkMode }) => {
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    
    const today = new Date().toISOString().split('T')[0]
    const taskDueDate = dueDate || today
    
    addTask({
      title,
      description,
      priority,
      dueDate: taskDueDate,
    })
    
    // Reset form
    setTitle('')
    setDescription('')
    setPriority('medium')
    setDueDate('')
    setIsFormVisible(false)
  }
  
  return (
    <div className="mb-6">
      {!isFormVisible ? (
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsFormVisible(true)}
          className={`w-full py-3 px-4 rounded-lg flex items-center justify-center shadow transition-colors ${
            isDarkMode
              ? 'bg-gray-700 hover:bg-gray-600 text-white'
              : 'bg-white hover:bg-gray-50 text-gray-800'
          }`}
        >
          <FaPlus className="mr-2 text-primary" />
          Add New Task
        </motion.button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`rounded-lg shadow-card p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Task</h2>
              <button 
                onClick={() => setIsFormVisible(false)}
                className={`p-2 rounded-full ${
                  isDarkMode 
                    ? 'hover:bg-gray-700' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Task Title*
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What needs to be done?"
                  className={`w-full p-2 rounded-md border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-white border-gray-300'
                  }`}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add details about your task..."
                  rows="3"
                  className={`w-full p-2 rounded-md border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-white border-gray-300'
                  }`}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium mb-1 flex items-center">
                    <FaFlag className="mr-1 text-priority-medium" />
                    Priority
                  </label>
                  <select
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
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
                  <label htmlFor="dueDate" className="block text-sm font-medium mb-1 flex items-center">
                    <FaClock className="mr-1 text-gray-500" />
                    Due Date
                  </label>
                  <input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDueDate(e.target.value)}
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
                  type="button" 
                  onClick={() => setIsFormVisible(false)}
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
                  type="submit" 
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors"
                >
                  Add Task
                </motion.button>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}

export default TaskForm