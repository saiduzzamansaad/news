import { NavLink } from 'react-router-dom'

const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']

const CategoryFilter = ({ selected }) => {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      {categories.map(cat => (
        <NavLink
          key={cat}
          to={`/category/${cat}`}
          className={({ isActive }) =>
            `relative pb-1 text-[10px] font-[1000] uppercase tracking-[0.2em] transition-all duration-300 ${
              isActive || cat === selected
                ? 'text-blue-600'
                : 'text-slate-400 hover:text-slate-900'
            }`
          }
        >
          {cat}
          {/* THE PRECISION UNDERLINE - Only shows when active */}
          <span 
            className={`absolute bottom-0 left-0 h-[2px] bg-blue-600 transition-all duration-500 ${
              selected === cat ? 'w-full opacity-100' : 'w-0 opacity-0'
            }`} 
          />
        </NavLink>
      ))}
    </div>
  )
}

export default CategoryFilter