import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Zap, Users, Home as HomeIcon, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Home from './Home'
import About from './About'
import Gallery from './Gallery'
import Create from './Create'

function Navigation() {
  const location = useLocation()
  
  const isActive = (path: string) => {
    return location.pathname === path
  }

  const navItems = [
    { path: '/', label: 'Studio', icon: HomeIcon },
    { path: '/about', label: 'Team', icon: Users },
  ]

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-apple border-b border-primary-200/50"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="relative p-2 rounded-2xl bg-gradient-to-br from-black to-primary-800 shadow-lg"
              >
                <Zap className="h-6 w-6 text-white" />
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white to-primary-200 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold gradient-text tracking-tight">
                  Butaq
                </h1>
                <p className="text-xs text-primary-600 font-medium tracking-wide uppercase">
                  NFT Studio
                </p>
              </div>
            </Link>
          </motion.div>
          
          <nav className="flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path)
              
              return (
                <motion.div
                  key={item.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                      active
                        ? 'text-white shadow-lg'
                        : 'text-primary-700 hover:text-primary-900 hover:bg-primary-100/80'
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-black rounded-xl shadow-elegant"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    <Icon className={`h-4 w-4 relative z-10 ${active ? 'text-white' : ''}`} />
                    <span className={`relative z-10 ${active ? 'text-white' : ''}`}>
                      {item.label}
                    </span>
                    
                    {active && (
                      <motion.div
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="relative z-10"
                      >
                        <Sparkles className="h-3 w-3 text-white" />
                      </motion.div>
                    )}
                  </Link>
                </motion.div>
              )
            })}
          </nav>
        </div>
      </div>
    </motion.header>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-primary-100">
        <Navigation />
        
        {/* Add top padding to account for fixed header */}
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<div className="pt-20"><Home /></div>} />
            <Route path="/about" element={<div className="pt-20"><About /></div>} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/create" element={<Create />} />
          </Routes>
        </AnimatePresence>
        
        {/* Floating background elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-primary-200/20 to-accent-200/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              x: [0, -150, 0],
              y: [0, 100, 0],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-br from-accent-200/20 to-primary-200/20 rounded-full blur-xl"
          />
          
        </div>
      </div>
    </Router>
  )
}

export default App