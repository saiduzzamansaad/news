import NewsCard from './NewsCard'
import { Terminal, Activity, Layers } from 'lucide-react'

const NewsGrid = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-40 rounded-[3rem] bg-slate-50 border border-slate-100 border-dashed animate-in fade-in duration-700">
        <Terminal size={32} className="text-slate-300 mb-4 animate-pulse" />
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Stream_Offline</p>
      </div>
    )
  }

  return (
    <div className="w-full space-y-12">
      
      {/* 1. GRID HUD (Top Stats) */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-xl shadow-[0_10px_20px_rgba(37,99,235,0.3)]">
            <Activity size={14} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Grid Mode</span>
            <span className="text-[11px] font-black text-slate-900 uppercase tracking-tighter">Tri-Node Array</span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-2xl shadow-sm">
          <Layers size={14} className="text-blue-500" />
          <span className="text-[10px] font-black text-slate-900">{articles.length} Nodes Loaded</span>
        </div>
      </div>

      {/* 2. THE ADVANCED 3-COLUMN GRID */}
      {/* md:grid-cols-2 for tablet, lg:grid-cols-3 for desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 lg:gap-x-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {articles.map((article, index) => (
          <div 
            key={index} 
            className="group relative"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* DATA INDEX (Elite Terminal Detail) */}
            <div className="absolute -top-8 left-0 flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
              <span className="text-[9px] font-black text-blue-600 font-mono">
                [{String(index + 1).padStart(2, '0')}]
              </span>
              <div className="h-[1px] w-8 bg-blue-600/20" />
            </div>

            {/* THE CARD */}
            <div className="relative z-10">
              <NewsCard article={article} />
            </div>
            
            {/* AMBIENT SHADOW (Elite 2050 Touch) */}
            <div className="absolute -inset-4 bg-blue-500/5 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        ))}
      </div>

      {/* 3. GRID FOOTER DECOR */}
      <div className="flex justify-center pt-20">
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-slate-200" />
          <div className="w-2 h-2 rounded-full border-2 border-slate-200" />
          <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-slate-200" />
        </div>
      </div>
    </div>
  )
}

export default NewsGrid