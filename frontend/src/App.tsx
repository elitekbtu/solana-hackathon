import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Zap, Users, Home as HomeIcon } from 'lucide-react'
import Home from './Home'
import About from './About'

function Navigation() {
  const location = useLocation()
  
  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Zap className="h-8 w-8 text-primary-600" />
            <h1 className="text-xl font-bold gradient-text">Butaq NFT Studio</h1>
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/') 
                  ? 'bg-primary-100 text-primary-700 font-medium' 
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <HomeIcon className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/about"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/about') 
                  ? 'bg-primary-100 text-primary-700 font-medium' 
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>About Team</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App