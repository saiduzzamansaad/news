import { NavLink } from 'react-router-dom'

const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']

const CategoryFilter = ({ selected }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(cat => (
        <NavLink
          key={cat}
          to={`/category/${cat}`}
          className={({ isActive }) =>
            `px-3 py-1 rounded-full text-sm capitalize ${
              isActive || cat === selected
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`
          }
        >
          {cat}
        </NavLink>
      ))}
    </div>
  )
}

export default CategoryFilter