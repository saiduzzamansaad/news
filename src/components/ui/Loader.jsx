const Loader = () => {
      return (
        <div className="flex flex-col justify-center items-center py-32 space-y-8 animate-in fade-in duration-700">
          <div className="relative flex items-center justify-center">
            
            {/* 1. OUTER CRYSTAL RING */}
            <div className="absolute w-24 h-24 rounded-[2rem] border-2 border-blue-500/20 animate-[spin_4s_linear_infinite]" />
            
            {/* 2. SECONDARY REFRACTIVE RING */}
            <div className="absolute w-20 h-20 rounded-[1.5rem] border-2 border-t-blue-600 border-r-transparent border-b-indigo-500 border-l-transparent animate-[spin_2s_linear_infinite_reverse]" />
            
            {/* 3. THE NEURAL CORE */}
            <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center justify-center overflow-hidden group">
              {/* Internal Pulsing Light */}
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
              
              {/* Micro-Laser Scan Effect */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-300 shadow-[0_0_10px_#60a5fa] animate-[scan_1.5s_infinite_linear]" />
              
              <div className="relative z-10 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff]" />
            </div>
    
            {/* 4. AMBIENT AURA */}
            <div className="absolute w-40 h-40 bg-blue-500/10 blur-[50px] rounded-full animate-pulse" />
          </div>
    
          {/* 5. DATA TRANSMISSION TEXT */}
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex h-1.5 w-1.5 rounded-full bg-blue-600 animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                Retrieving Nodes
              </span>
            </div>
            <div className="h-1 w-32 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 w-1/2 rounded-full animate-[loading_2s_ease-in-out_infinite]" />
            </div>
          </div>
    
          {/* Tailwind Custom Keyframes */}
          <style>{`
            @keyframes scan {
              0% { top: -10%; opacity: 0; }
              50% { opacity: 1; }
              100% { top: 110%; opacity: 0; }
            }
            @keyframes loading {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(250%); }
            }
          `}</style>
        </div>
      )
    }
    
    export default Loader