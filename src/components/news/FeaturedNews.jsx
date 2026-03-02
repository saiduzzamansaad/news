import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/formatDate'
import { Bookmark, BookmarkCheck, Share2, ArrowUpRight, ShieldCheck, Activity, Globe } from 'lucide-react'
import { useBookmarks } from '../../context/BookmarkContext'

const FeaturedNews = ({ article }) => {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks()
  const bookmarked = isBookmarked(article.url)

  const handleBookmark = (e) => {
    e.preventDefault()
    e.stopPropagation()
    bookmarked ? removeBookmark(article.url) : addBookmark(article)
  }

  return (
    <section className="relative mb-16 px-1">
      {/* SEAMLESS STATIC CONTAINER - Removed all group-hover triggers */}
      <Link 
        to={`/news/${encodeURIComponent(article.title)}`} 
        state={{ article }}
        className="relative block overflow-hidden rounded-[3rem] bg-white border border-slate-100 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.08)]"
      >
        <div className="grid lg:grid-cols-12 gap-0 min-h-[480px]">
          
          {/* 1. IMAGE LAYER - Static & Sharp */}
          <div className="lg:col-span-7 relative overflow-hidden bg-slate-100 border-r border-slate-50">
            <img
              src={article.urlToImage || '/placeholder-image.jpg'}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = '/placeholder-image.jpg' }}
            />
            
            {/* HUD Status Badge - Always Visible */}
            <div className="absolute top-8 left-8 z-20">
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/20 text-white shadow-2xl">
                <Activity size={14} className="text-blue-400 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Live Feed</span>
              </div>
            </div>

            {/* Mobile-only gradient for legibility - Logic kept for small screens only */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
          </div>

          {/* 2. CONTENT AREA - High-Density Premium Typography */}
          <div className="lg:col-span-5 p-10 md:p-14 flex flex-col relative bg-white">
            
            {/* Metadata (Micro-Text Elite) */}
            <div className="flex items-center gap-4 mb-10">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-600 text-white shadow-[0_10px_20px_-5px_rgba(37,99,235,0.3)]">
                <ShieldCheck size={13} />
                <span className="text-[9px] font-black uppercase tracking-widest">{article.source?.name}</span>
              </div>
              <div className="h-1 w-1 bg-slate-200 rounded-full" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                {formatDate(article.publishedAt)}
              </span>
            </div>

            {/* FULL HEADING - Clean, Sharp, and Bold */}
            <h2 className="text-xl md:text-2xl font-[1000] text-slate-900 leading-[1.15] tracking-tight mb-6">
              {article.title}
            </h2>

            {/* FULL DESCRIPTION - Swiss Grid Alignment */}
            <p className="text-slate-500 text-sm md:text-[15px] font-medium leading-[1.7] mb-12 border-l-2 border-blue-100 pl-8">
              {article.description}
            </p>

            {/* 3. INTERACTIVE CONTROL DOCK */}
            <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-10">
              
              {/* Access Link Module */}
              <div className="flex items-center gap-5 cursor-pointer group/btn">
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.4em] mb-1 leading-none">Access</span>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Protocol</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900 text-white shadow-2xl transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:bg-blue-600">
                  <ArrowUpRight size={20} />
                </div>
              </div>

              {/* Utility Tools */}
              <div className="flex gap-2.5">
                <button 
                  onClick={handleBookmark}
                  className={`p-4 rounded-2xl border transition-all duration-300 ${bookmarked ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-slate-50 border-slate-100 text-slate-400 hover:bg-white hover:shadow-md'}`}
                >
                  {bookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                </button>
                <button className="hidden sm:flex p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 hover:bg-black hover:text-white transition-all">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Permanent Subtle Background Detail */}
            <div className="absolute bottom-6 right-10 opacity-[0.03] pointer-events-none">
              <Globe size={120} className="text-slate-900" />
            </div>
          </div>
        </div>
      </Link>
    </section>
  )
}

export default FeaturedNews