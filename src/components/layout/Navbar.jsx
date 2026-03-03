import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useBookmarks } from '../../context/BookmarkContext'
import { Menu, X, ChevronDown, Search, Bookmark } from 'lucide-react'

const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { bookmarkCount } = useBookmarks()

  // Shared class for NavLinks to keep code DRY
  const linkStyles = ({ isActive }) => 
    `relative px-3 py-2 transition-all duration-300 ease-in-out hover:text-blue-500 rounded-lg flex items-center gap-1.5
    ${isActive ? 'text-blue-600 bg-blue-50/50' : 'text-gray-600 hover:bg-gray-100/50'}`

  return (
    // Glassmorphic Wrapper
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 mt-3">
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] rounded-2xl px-6 h-16 flex justify-between items-center">
          
          {/* Logo with Hover Animation */}
          <Link to="/" className="flex items-center space-x-2 group active:scale-95 transition-transform">
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg group-hover:rotate-12 transition-transform">
              <img src="" alt="Logo" className="h-6 w-6 invert brightness-0" />
            </div>
            <span className="font-extrabold text-xl font-sans tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              NewsPortal
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/" className={linkStyles}>Home</NavLink>
            
            {categories.slice(0, 3).map(cat => (
              <NavLink key={cat} to={`/category/${cat}`} className={linkStyles}>
                <span className="capitalize">{cat}</span>
              </NavLink>
            ))}

            {/* Advanced Dropdown */}
            <div className="relative group">
              <button className="flex items-center px-3 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-100/50 rounded-lg transition-all">
                <span>More</span>
                <ChevronDown size={16} className="ml-1 group-hover:rotate-180 transition-transform duration-300" />
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out">
                <div className="bg-white/90 backdrop-blur-lg border border-gray-100 shadow-2xl rounded-xl p-2 flex flex-col gap-1">
                  {categories.slice(3).map(cat => (
                    <NavLink key={cat} to={`/category/${cat}`} 
                      className="px-4 py-2 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors capitalize text-sm text-gray-700">
                      {cat}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-6 w-[1px] bg-gray-200 mx-2" /> {/* Divider */}

            <NavLink to="/search" className={linkStyles}>
              <Search size={18} />
              <span className="text-sm font-medium">Search</span>
            </NavLink>

            <NavLink to="/bookmarks" className={linkStyles}>
              <div className="relative">
                <Bookmark size={18} />
                {bookmarkCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                    {bookmarkCount}
                  </span>
                )}
              </div>
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2 rounded-xl bg-gray-100 text-gray-600 active:scale-90 transition-transform"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu with Animation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] mt-2' : 'max-h-0'}`}>
          <div className="bg-white/90 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-4 space-y-2">
            {categories.map(cat => (
              <NavLink 
                key={cat} 
                to={`/category/${cat}`} 
                className={({ isActive }) => `block px-4 py-3 rounded-xl capitalize transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setIsOpen(false)}
              >
                {cat}
              </NavLink>
            ))}
            <hr className="border-gray-100" />
            <NavLink to="/search" className="flex items-center gap-2 px-4 py-3 text-gray-700" onClick={() => setIsOpen(false)}>
              <Search size={18} /> Search
            </NavLink>
            <NavLink to="/bookmarks" className="flex items-center justify-between px-4 py-3 text-gray-700 bg-gray-50 rounded-xl" onClick={() => setIsOpen(false)}>
              <span className="flex items-center gap-2"><Bookmark size={18} /> Bookmarks</span>
              <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs">{bookmarkCount}</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar