const Button = ({ children, onClick, variant = 'primary', size = 'md', disabled = false, className = '', ...props }) => {
  
      // ELITE 2050 BASE: Squircle corners, heavy font, tracking for that premium "Node" look
      const baseClasses = 'relative inline-flex items-center justify-center font-[1000] uppercase tracking-[0.15em] transition-all duration-300 focus:outline-none active:scale-95 overflow-hidden group'
      
      const variants = {
        // 1. NEURAL PRIMARY: Solid blue with a permanent shadow-glow
        primary: 'bg-blue-600 text-white shadow-[0_15px_30px_-5px_rgba(37,99,235,0.3)] hover:shadow-[0_20px_40px_-5px_rgba(37,99,235,0.45)] hover:-translate-y-0.5 border border-blue-500/50',
        
        // 2. SLATE SECONDARY: Stealth dark mode look
        secondary: 'bg-slate-900 text-white shadow-xl hover:bg-slate-800 border border-slate-700',
        
        // 3. AERO OUTLINE: Ultra-thin glass look
        outline: 'bg-white/40 backdrop-blur-md border border-slate-200 text-slate-900 hover:border-blue-600 hover:text-blue-600 shadow-sm',
        
        // 4. DANGER PROTOCOL: High-alert red
        danger: 'bg-red-500 text-white shadow-[0_15px_30px_-5px_rgba(239,68,68,0.3)] hover:bg-red-600 border border-red-400/50',
        
        // 5. GHOST TERMINAL: Minimalist text-only node
        ghost: 'bg-transparent text-slate-500 hover:text-blue-600 hover:bg-blue-50/50'
      }
    
      const sizes = {
        // Micro-sized for data terminals
        sm: 'px-4 py-2 text-[9px] rounded-xl',
        // Standard elite size
        md: 'px-6 py-3 text-[11px] rounded-[1.2rem]',
        // Large hero action
        lg: 'px-10 py-4 text-[13px] rounded-[1.8rem]',
      }
    
      return (
        <button
          className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-30 cursor-not-allowed grayscale' : ''} ${className}`}
          disabled={disabled}
          onClick={onClick}
          {...props}
        >
          {/* INTERNAL GLASS SHINE EFFECT (Elite Detail) */}
          <span className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          
          {/* BUTTON CONTENT */}
          <span className="relative z-10 flex items-center gap-2">
            {children}
          </span>
          
          {/* ACTIVE GLOW ORB (Subtle Bottom Light) */}
          {variant === 'primary' && (
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-blue-400 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </button>
      )
    }
    
    export default Button