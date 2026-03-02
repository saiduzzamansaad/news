import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useBookmarks } from '../context/BookmarkContext'
import { formatDate } from '../utils/formatDate'
import { Helmet } from 'react-helmet-async'
import { 
  Bookmark, 
  BookmarkCheck, 
  ExternalLink, 
  ArrowLeft, 
  Share2, 
  ShieldCheck, 
  Timer, 
  User, 
  Cpu,
  Fingerprint
} from 'lucide-react'

const NewsDetails = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const article = location.state?.article
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks()
  const [isLoaded, setIsLoaded] = useState(false)

  // FIXED: Auto-scroll and instant "Load" trigger for performance feel
  useEffect(() => {
    window.scrollTo(0, 0)
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [location])

  if (!article) {
    navigate('/', { replace: true })
    return null
  }

  const bookmarked = isBookmarked(article.url)
  const handleBookmark = () => bookmarked ? removeBookmark(article.url) : addBookmark(article)

  return (
    <>
      <Helmet>
        <title>{article.title} | Portal_v2</title>
      </Helmet>

      {/* FIXED: pt-28 for Navbar clearance */}
      <div className={`max-w-5xl mx-auto px-4 pt-28 pb-20 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        
        {/* 1. NAVIGATION DOCK (Small Elite Icons) */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-100 text-slate-500 hover:text-blue-600 transition-all"
          >
            <ArrowLeft size={16} />
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Return</span>
          </button>

          <div className="flex gap-2">
            <button onClick={handleBookmark} className={`p-2.5 rounded-xl border transition-all ${bookmarked ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-100 text-slate-400'}`}>
              {bookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
            </button>
            <button onClick={() => {}} className="p-2.5 rounded-xl bg-white border border-slate-100 text-slate-400">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        <article className="relative bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.06)] overflow-hidden">
          
          {/* 2. HERO IMAGE (Parallax Feel) */}
          <div className="relative h-[250px] md:h-[450px] overflow-hidden bg-slate-100">
            <img 
              src={article.urlToImage || '/placeholder.jpg'} 
              alt="Article Hero" 
              className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute top-6 left-6 flex gap-2">
              <div className="px-3 py-1 rounded-lg bg-black/40 backdrop-blur-xl border border-white/20 text-white flex items-center gap-2">
                <Cpu size={12} className="text-blue-400" />
                <span className="text-[8px] font-black uppercase tracking-widest">Neural Link Active</span>
              </div>
            </div>
          </div>

          {/* 3. CONTENT TERMINAL */}
          <div className="p-6 md:p-14">
            
            {/* Meta Metadata (Micro Text) */}
            <div className="flex flex-wrap items-center gap-6 mb-10 pb-8 border-b border-slate-50">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-blue-600" />
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Source</span>
                  <span className="text-[11px] font-bold text-slate-900">{article.source?.name}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Timer size={14} className="text-slate-400" />
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Timestamp</span>
                  <span className="text-[11px] font-bold text-slate-900">{formatDate(article.publishedAt)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <User size={14} className="text-slate-400" />
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Agent</span>
                  <span className="text-[11px] font-bold text-slate-900">{article.author?.split(' ')[0] || 'Editorial'}</span>
                </div>
              </div>
            </div>

            {/* Headline - Sharp and Elite */}
            <h1 className="text-xl md:text-3xl font-[1000] text-slate-900 leading-[1.2] tracking-tighter mb-8">
              {article.title}
            </h1>

            {/* Description Block */}
            <div className="mb-10 p-6 rounded-2xl bg-slate-50 border-l-[3px] border-blue-600">
              <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed italic">
                {article.description}
              </p>
            </div>

            {/* Full Article Content Area */}
            <div className="space-y-6">
              <p className="text-slate-700 text-[15px] md:text-[17px] leading-[1.8] font-medium">
                {article.content || article.description}
              </p>
              
              {/* Premium Length Simulation (Fake text blocks if API content is short) */}
              {!article.content && (
                <div className="space-y-4 opacity-40">
                  <div className="h-3 bg-slate-100 rounded-full w-full" />
                  <div className="h-3 bg-slate-100 rounded-full w-5/6" />
                  <div className="h-3 bg-slate-100 rounded-full w-4/6" />
                </div>
              )}
            </div>

            {/* 4. FOOTER ACTION DOCK (Bio-Metric Styled) */}
            <div className="mt-16 p-8 rounded-[2rem] bg-slate-900 text-white relative overflow-hidden group">
              <div className="relative z-10 flex items-center justify-between gap-4 flex-col sm:flex-row">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                    <Fingerprint size={24} className="text-blue-400" />
                  </div>
                  <div>
                    <span className="text-[8px] font-black tracking-[0.3em] text-blue-400 uppercase">Verification</span>
                    <h4 className="text-xs font-bold uppercase tracking-widest leading-none">External Link Secure</h4>
                  </div>
                </div>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <button className="w-full px-8 py-3.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-[0_15px_30px_-5px_rgba(37,99,235,0.4)] active:scale-95">
                    Connect to Node
                  </button>
                </a>
              </div>
              {/* Background Glass Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>

          </div>
        </article>
      </div>
    </>
  )
}

export default NewsDetails