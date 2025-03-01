// src/components/Footer.jsx
import { FaGithub, FaHeart, FaReact } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Footer = ({ isDarkMode }) => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className={`py-4 px-6 ${
      isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'
    } shadow-inner mt-auto`}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="mb-3 md:mb-0 flex items-center">
          <span className="text-primary-light mr-2">✓</span>
          <span className="font-medium">TaskFlow</span>
          <span className="mx-2">|</span>
          <span className="text-sm">&copy; {currentYear} All Rights Reserved</span>
        </div>
        
        <div className="flex items-center text-sm">
          <span className="mr-2">Made with</span>
          <motion.div 
            whileHover={{ scale: 1.2 }}
            className="text-red-500 mx-1"
          >
            <FaHeart />
          </motion.div>
          <span className="mx-1">using</span>
          <motion.div 
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="text-blue-400 mx-1"
          >
            <FaReact />
          </motion.div>
          
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="https://github.com/yourusername/taskflow"
            target="_blank"
            rel="noopener noreferrer"
            className={`ml-4 p-2 rounded-full transition-colors ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
            aria-label="GitHub Repository"
          >
            <FaGithub />
          </motion.a>
        </div>
      </div>
    </footer>
  )
}

export default Footer