// src/components/TaskStats.jsx
import { FaCheckCircle, FaExclamationTriangle, FaCalendarAlt } from 'react-icons/fa'

const TaskStats = ({ tasks, isDarkMode }) => {
  // Get the current date for comparison
  const today = new Date().toISOString().split('T')[0]
  
  // Calculate stats
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length
  const activeTasks = totalTasks - completedTasks
  const todayTasks = tasks.filter(task => task.dueDate === today).length
  const overdueTasks = tasks.filter(task => task.dueDate < today && !task.completed).length
  
  // Calculate completion percentage
  const completionPercentage = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0
  
  const stats = [
    { 
      label: 'Total Tasks', 
      value: totalTasks, 
      color: 'text-blue-500'
    },
    { 
      label: 'Completed', 
      value: completedTasks, 
      color: 'text-green-500',
      icon: <FaCheckCircle />
    },
    { 
      label: 'Active', 
      value: activeTasks, 
      color: 'text-purple-500' 
    },
    { 
      label: 'Due Today', 
      value: todayTasks, 
      color: 'text-yellow-500',
      icon: <FaCalendarAlt />
    },
    { 
      label: 'Overdue', 
      value: overdueTasks, 
      color: 'text-red-500',
      icon: <FaExclamationTriangle />
    }
  ]
  
  return (
    <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
      <h3 className="text-lg font-semibold mb-3">Task Statistics</h3>
      
      <div className="space-y-3">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              {stat.icon && <span className={`mr-2 ${stat.color}`}>{stat.icon}</span>}
              <span className="text-sm">{stat.label}</span>
            </div>
            <span className={`font-semibold ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Completion</span>
          <span>{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
          <div 
            className="bg-green-500 h-2.5 rounded-full" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default TaskStats