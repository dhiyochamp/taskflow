// src/components/Header.jsx
import { FaBars, FaMoon, FaSun, FaBrain } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Header = ({ toggleSidebar, toggleDarkMode, isDarkMode, toggleFocusMode, isFocusModeActive }) => {
  return (
    <header className={`sticky top-0 z-30 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-md px-4 py-3 flex items-center justify-between`}>
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className={`mr-4 p-2 rounded-md transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          aria-label="Toggle sidebar"
        >
          <FaBars className="text-lg" />
        </button>
        <h1 className="text-xl font-bold flex items-center">
          <span className="text-primary-light mr-2">✓</span>
          TaskFlow
        </h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleFocusMode}
          className={`flex items-center px-3 py-2 rounded-md transition-colors ${
            isFocusModeActive 
              ? 'bg-primary-dark text-white' 
              : isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-gray-100 hover:bg-gray-200'
          }`}
          aria-label="Toggle focus mode"
        >
          <FaBrain className="mr-2" />
          <span className="hidden sm:inline">{isFocusModeActive ? 'Exit Focus' : 'Focus Mode'}</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleDarkMode}
          className={`p-2 rounded-md ${
            isDarkMode 
              ? 'bg-gray-700 hover:bg-gray-600' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </motion.button>
      </div>
    </header>
  )
}

export default Header
