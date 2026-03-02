import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useBookmarks } from '../../context/BookmarkContext'
import { Menu, X } from 'lucide-react' // or use any icon library

const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { bookmarkCount } = useBookmarks()

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="NewsPortal" className="h-8 w-8" />
            <span className="font-bold text-xl">NewsPortal</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <NavLink to="/" className={({ isActive }) => 
              `hover:text-blue-600 ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'}`
            }>Home</NavLink>
            {categories.slice(0, 3).map(cat => (
              <NavLink key={cat} to={`/category/${cat}`} className={({ isActive }) => 
                `hover:text-blue-600 ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'}`
              } className="capitalize">{cat}</NavLink>
            ))}
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600">More ▾</button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded mt-2 py-2 w-40">
                {categories.slice(3).map(cat => (
                  <NavLink key={cat} to={`/category/${cat}`} className="block px-4 py-2 hover:bg-gray-100 capitalize">{cat}</NavLink>
                ))}
              </div>
            </div>
            <NavLink to="/search" className={({ isActive }) => 
              `hover:text-blue-600 ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'}`
            }>Search</NavLink>
            <NavLink to="/bookmarks" className={({ isActive }) => 
              `hover:text-blue-600 flex items-center ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'}`
            }>
              Bookmarks
              {bookmarkCount > 0 && (
                <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{bookmarkCount}</span>
              )}
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            {categories.map(cat => (
              <NavLink key={cat} to={`/category/${cat}`} 
                className={({ isActive }) => `block py-2 capitalize ${isActive ? 'text-blue-600' : 'text-gray-700'}`}
                onClick={() => setIsOpen(false)}>{cat}</NavLink>
            ))}
            <NavLink to="/search" className="block py-2" onClick={() => setIsOpen(false)}>Search</NavLink>
            <NavLink to="/bookmarks" className="block py-2" onClick={() => setIsOpen(false)}>
              Bookmarks ({bookmarkCount})
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar