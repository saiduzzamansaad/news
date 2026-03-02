const Button = ({ children, onClick, variant = 'primary', size = 'md', disabled = false, className = '', ...props }) => {
      const baseClasses = 'rounded font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center'
      
      const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
        outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      }
    
      const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      }
    
      return (
        <button
          className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
          disabled={disabled}
          onClick={onClick}
          {...props}
        >
          {children}
        </button>
      )
    }
    
    export default Button