const Pagination = ({ currentPage, totalPages, onPageChange }) => {
      if (totalPages <= 1) return null
    
      const pages = []
      for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
          pages.push(i)
        } else if (pages[pages.length - 1] !== '...') {
          pages.push('...')
        }
      }
    
      return (
        <nav className="w-full flex justify-center my-12 px-4">
          {/* COMPACT GLASS SLAB - Reduced padding and shadow */}
          <div className="flex items-center p-1 bg-white/60 backdrop-blur-xl border border-white shadow-sm rounded-2xl">
            
            {/* Nav - Prev (Smaller) */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-blue-600 disabled:opacity-5 transition-all duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
    
            {/* COMPACT NUMBERS */}
            <div className="flex items-center gap-0.5 mx-1">
              {pages.map((page, idx) => {
                const isDots = page === '...';
                const isActive = page === currentPage;
    
                return (
                  <button
                    key={idx}
                    onClick={() => !isDots && onPageChange(page)}
                    disabled={isDots}
                    className={`
                      relative min-w-[34px] h-[34px] flex items-center justify-center rounded-xl text-[10px] font-black tracking-tighter transition-all duration-500
                      ${isActive 
                        ? 'bg-slate-900 text-white shadow-md' 
                        : isDots 
                          ? 'text-slate-300 cursor-default' 
                          : 'text-slate-500 hover:text-blue-600 hover:bg-white/50'
                      }
                    `}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
    
            {/* Nav - Next (Smaller) */}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-blue-600 disabled:opacity-5 transition-all duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
    
          </div>
        </nav>
      )
    }
    
    export default Pagination