// src/App.jsx
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import Footer from './components/Footer'

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('dueDate')
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isFocusModeActive, setIsFocusModeActive] = useState(false)
  
  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])
  
  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode)
    // Apply dark mode to the whole document
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])
  
  // Add a new task
  const addTask = (taskData) => {
    const newTask = {
      id: uuidv4(),
      title: taskData.title,
      description: taskData.description || '',
      completed: false,
      priority: taskData.priority,
      dueDate: taskData.dueDate,
      progress: 0,
      createdAt: new Date().toISOString()
    }
    
    setTasks([...tasks, newTask])
  }
  
  // Toggle task completion status
  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed, progress: !task.completed ? 100 : task.progress } 
        : task
    ))
  }
  
  // Delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }
  
  // Edit a task
  const editTask = (taskId, updatedData) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, ...updatedData } 
        : task
    ))
  }
  
  // Update task progress
  const updateProgress = (taskId, progress) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            progress, 
            completed: progress === 100 ? true : task.completed 
          } 
        : task
    ))
  }
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }
  
  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  
  // Toggle focus mode
  const toggleFocusMode = () => {
    setIsFocusModeActive(!isFocusModeActive)
  }
  
  // Sort tasks based on current sortBy value
  const sortedTasks = [...tasks].sort((a, b) => {
    switch (sortBy) {
      case 'dueDate':
        return a.dueDate.localeCompare(b.dueDate)
      case 'priority':
        const priorityOrder = { high: 0, medium: 1, low: 2 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      case 'progress':
        return b.progress - a.progress
      case 'alphabetical':
        return a.title.localeCompare(b.title)
      case 'createdAt':
        return new Date(b.createdAt) - new Date(a.createdAt)
      default:
        return 0
    }
  })
  
  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <Header 
        toggleSidebar={toggleSidebar} 
        toggleDarkMode={toggleDarkMode} 
        isDarkMode={isDarkMode}
        toggleFocusMode={toggleFocusMode}
        isFocusModeActive={isFocusModeActive}
      />
      
      {!isFocusModeActive && isSidebarOpen && (
        <Sidebar 
          filter={filter} 
          setFilter={setFilter} 
          sortBy={sortBy} 
          setSortBy={setSortBy} 
          tasks={tasks}
          isDarkMode={isDarkMode}
        />
      )}
      
      <main className={`transition-all duration-200 pt-6 px-4 pb-12 flex-grow ${
        isFocusModeActive 
          ? 'ml-0 max-w-3xl mx-auto' 
          : isSidebarOpen 
            ? 'ml-64' 
            : 'ml-0'
      }`}>
        <div className={`max-w-3xl mx-auto ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          <TaskForm addTask={addTask} isDarkMode={isDarkMode} />
          
          <TaskList 
            tasks={sortedTasks}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
            editTask={editTask}
            updateProgress={updateProgress}
            isDarkMode={isDarkMode}
            filter={filter}
          />
        </div>
      </main>
      
      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}

export default App