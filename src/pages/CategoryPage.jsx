import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNews } from '../hooks/useNews'
import NewsGrid from '../components/news/NewsGrid'
import CategoryFilter from '../components/filters/CategoryFilter'
import CountrySelector from '../components/filters/CountrySelector'
import Pagination from '../components/ui/Pagination'
import Loader from '../components/ui/Loader'
import ErrorMessage from '../components/ui/ErrorMessage'
import { Globe2, Layers, Cpu, Activity } from 'lucide-react'

const CategoryPage = () => {
  const { category } = useParams()
  const { articles, loading, error, totalResults, currentPage, pageSize, fetchByCategory } = useNews()
  const [country, setCountry] = useState('us')

  useEffect(() => {
    fetchByCategory(category, country, 1)
  }, [category, country])

  const handlePageChange = (page) => {
    fetchByCategory(category, country, page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading && articles.length === 0) return <Loader />
  if (error) return <ErrorMessage message={error} retry={() => fetchByCategory(category, country, 1)} />

  return (
    // FIXED: pt-32 ensures content sits perfectly below the floating navbar
    <main className="max-w-7xl mx-auto px-4 pt-32 pb-20 animate-in fade-in duration-1000">
      
      {/* 1. SEAMLESS CATEGORY HEADER */}
      <div className="mb-12 space-y-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-200">
                <Layers size={18} className="text-white" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Stream Classification</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-[1000] text-slate-900 tracking-tighter leading-none capitalize">
              {category}<span className="text-blue-600">.</span>
            </h1>
            
            <p className="text-slate-400 text-sm font-medium tracking-tight">
              Real-time intelligence feed for the <span className="text-slate-900 font-bold">{category}</span> sector.
            </p>
          </div>

          {/* Quick Stats Hud */}
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl border border-slate-100">
             <div className="flex flex-col items-end">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Nodes</span>
                <span className="text-xl font-black text-slate-900 leading-none">{totalResults}</span>
             </div>
             <div className="h-8 w-px bg-slate-200" />
             <Activity size={24} className="text-blue-600 animate-pulse" />
          </div>
        </header>

        {/* 2. ADVANCED CONTROL CENTER */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-white/40 backdrop-blur-3xl border border-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
              <Cpu size={16} className="text-slate-400" />
            </div>
            <CategoryFilter selected={category} />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <Globe2 size={16} className="text-blue-500" />
              <CountrySelector selected={country} onChange={setCountry} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. NEWS ARCHITECTURE */}
      <div className="relative min-h-[400px]">
        <NewsGrid articles={articles} />
      </div>

      {/* 4. PAGINATION TERMINAL */}
      <footer className="mt-16 flex justify-center">
        <div className="bg-white/80 backdrop-blur-xl border border-white px-8 py-4 rounded-[2.5rem] shadow-xl">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalResults / pageSize)}
            onPageChange={handlePageChange}
          />
        </div>
      </footer>
    </main>
  )
}

export default CategoryPage