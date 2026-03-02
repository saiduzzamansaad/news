const Badge = ({ children, color = 'blue', className = '' }) => {
      const colors = {
        blue: 'bg-blue-100 text-blue-800',
        gray: 'bg-gray-100 text-gray-800',
        red: 'bg-red-100 text-red-800',
        green: 'bg-green-100 text-green-800',
        yellow: 'bg-yellow-100 text-yellow-800',
      }
    
      return (
        <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded ${colors[color]} ${className}`}>
          {children}
        </span>
      )
    }
    
    export default Badge