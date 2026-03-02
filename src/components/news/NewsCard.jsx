import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/formatDate'
import { truncateText } from '../../utils/truncateText'
import { useBookmarks } from '../../context/BookmarkContext'
import { 
  Bookmark, 
  BookmarkCheck, 
  ArrowUpRight, 
  Share2, 
  Globe, 
  ShieldCheck, 
  History,
  TrendingUp,
  Radio
} from 'lucide-react'

const NewsCard = ({ article, isFeatured = false }) => {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks()
  const bookmarked = isBookmarked(article.url)

  const handleBookmark = (e) => {
    e.preventDefault()
    e.stopPropagation()
    bookmarked ? removeBookmark(article.url) : addBookmark(article)
  }

  return (
    <div className={`group relative flex flex-col h-full rounded-[2.5rem] bg-slate-50 border border-white p-3.5 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] hover:bg-white hover:shadow-[0_40px_100px_-15px_rgba(0,0,0,0.12)] ${isFeatured ? 'md:col-span-2 md:row-span-2' : ''}`}>
      
      {/* 1. LAYERED IMAGE WITH INTERNAL GLOW */}
      <div className={`relative overflow-hidden rounded-[2rem] shadow-inner bg-slate-200 transition-all duration-700 ease-out ${isFeatured ? 'h-72 md:h-[480px]' : 'h-60'}`}>
        <img 
          src={article.urlToImage || 'https://images.unsplash.com/photo-1504711432869-5d39a110fdd7?q=80&w=1000'} 
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 group-hover:rotate-1"
          loading="lazy"
        />

        {/* Real-time Status Badge */}
        <div className="absolute top-5 left-5 z-20 flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/20 backdrop-blur-2xl border border-white/30 text-white shadow-xl">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-[9px] font-black uppercase tracking-[0.15em]">Live Report</span>
        </div>

        {/* Desktop-only Quick Action Sidebar */}
        <div className="absolute top-5 right-5 z-20 hidden md:flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
          <button onClick={handleBookmark} className={`p-3 rounded-2xl backdrop-blur-2xl border border-white/40 shadow-xl transition-all hover:scale-110 active:scale-90 ${bookmarked ? 'bg-blue-600 text-white' : 'bg-white/10 text-white hover:bg-white hover:text-black'}`}>
            {bookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
          </button>
          <button className="p-3 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/40 shadow-xl text-white hover:bg-black transition-all">
            <Share2 size={20} />
          </button>
        </div>

        {/* Gradient Bottom Fade for Text Clarity */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
      </div>

      {/* 2. TEXT CONTENT AREA */}
      <Link to={`/news/${encodeURIComponent(article.title)}`} state={{ article }} className="relative z-10 px-6 py-6 flex flex-col flex-grow">
        
        {/* Advanced Meta Metadata */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-600/10 text-blue-700 border border-blue-600/10">
            <ShieldCheck size={14} className="fill-blue-600/20" />
            <span className="text-[10px] font-black uppercase tracking-wider">{article.source?.name?.split(' ')[0]}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-gray-400">
            <History size={13} />
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          {isFeatured && (
             <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-orange-500/10 text-orange-600 border border-orange-500/10 ml-auto">
                <TrendingUp size={13} />
                <span className="text-[10px] font-black uppercase tracking-widest">Trending</span>
             </div>
          )}
        </div>

        {/* Title with Kinetic Animation */}
        <h3 className={`font-[1000] text-gray-900 leading-[1.05] tracking-[-0.03em] transition-all duration-500 group-hover:text-blue-600 ${isFeatured ? 'text-4xl md:text-6xl mb-6' : 'text-2xl mb-4'}`}>
          {truncateText(article.title, isFeatured ? 85 : 68)}
        </h3>

        {isFeatured && (
          <p className="text-gray-500 text-lg leading-relaxed mb-8 font-medium line-clamp-3">
            {truncateText(article.description, 160)}
          </p>
        )}

        {/* 3. INTERACTIVE FOOTER INTERFACE */}
        <div className="mt-auto pt-6 flex items-center justify-between border-t border-gray-100/60">
          <div className="flex items-center gap-3">
            <div className="relative p-0.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600">
              <div className="bg-white rounded-[0.9rem] p-0.5 overflow-hidden w-11 h-11">
                <img src={`https://ui-avatars.com/api/?name=${article.source?.name}&background=f8fafc&color=2563eb&bold=true`} alt="source" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black text-gray-900 leading-none flex items-center gap-1">
                {article.source?.name}
                <Globe size={12} className="text-blue-500" />
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">International Bureau</span>
            </div>
          </div>

          {/* Mobile + Desktop External Action */}
          <div className="flex items-center gap-2">
            <div className="md:hidden flex gap-2 mr-2">
               <button onClick={handleBookmark} className={`p-2 rounded-xl border ${bookmarked ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-200 text-gray-400'}`}>
                  {bookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
               </button>
            </div>
            <div className="flex items-center justify-center w-14 h-14 rounded-[1.6rem] bg-gray-900 text-white transition-all duration-500 group-hover:bg-blue-600 group-hover:shadow-[0_15px_30px_-5px_rgba(37,99,235,0.4)] group-hover:rotate-[360deg] cursor-pointer">
              <Radio size={24} className="group-hover:hidden transition-all" />
              <ArrowUpRight size={26} className="hidden group-hover:block transition-all" />
            </div>
          </div>
        </div>
      </Link>

      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 -z-10 w-48 h-48 bg-blue-100/40 blur-[80px] rounded-full group-hover:bg-blue-400/20 transition-all duration-700" />
    </div>
  )
}

export default NewsCard