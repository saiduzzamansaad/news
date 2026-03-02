import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useNews } from '../hooks/useNews'
import SearchBar from '../components/search/SearchBar'
import SortDropdown from '../components/filters/SortDropdown'
import LanguageSelector from '../components/filters/LanguageSelector'
import DateFilter from '../components/filters/DateFilter'
import NewsGrid from '../components/news/NewsGrid'
import Pagination from '../components/ui/Pagination'
import Loader from '../components/ui/Loader'
import ErrorMessage from '../components/ui/ErrorMessage'
import debounce from 'lodash.debounce'
import { Search, SlidersHorizontal, Activity, Globe2, CalendarDays } from 'lucide-react'

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const sort = searchParams.get('sort') || 'publishedAt'
  
  const { articles, loading, error, totalResults, currentPage, pageSize, fetchSearch } = useNews()
  const [searchTerm, setSearchTerm] = useState(query)
  const [language, setLanguage] = useState('en')
  const [fromDate, setFromDate] = useState(null)

  const debouncedSearch = useCallback(
    debounce((q, page, sortBy, lang, from) => {
      if (q.trim()) {
        fetchSearch(q, page, sortBy, lang, from)
      }
    }, 500),
    []
  )

  useEffect(() => {
    if (query) {
      debouncedSearch(query, currentPage, sort, language, fromDate)
    }
  }, [query, sort, currentPage, language, fromDate, debouncedSearch])

  const handleSearch = (newQuery) => {
    setSearchParams({ q: newQuery, sort, lang: language, from: fromDate || '' })
  }

  const handleSort = (newSort) => {
    setSearchParams({ q: query, sort: newSort, lang: language, from: fromDate || '' })
  }

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang)
    setSearchParams({ q: query, sort, lang: newLang, from: fromDate || '' })
  }

  const handleDateChange = (date) => {
    setFromDate(date)
    setSearchParams({ q: query, sort, lang: language, from: date || '' })
  }

  const handlePageChange = (page) => {
    setSearchParams({ q: query, sort, lang: language, from: fromDate || '', page })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    // FIXED: pt-32 ensures content starts below the floating navbar island
    <main className="max-w-7xl mx-auto px-4 pt-32 pb-20 animate-in fade-in duration-700">
      
      {/* 1. COMMAND HEADER */}
      <div className="mb-12 space-y-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Search Protocol</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-[1000] text-slate-900 tracking-tighter leading-none">
              Intelligence <span className="text-blue-600">Hub</span>
            </h1>
          </div>

          {articles.length > 0 && (
            <div className="px-4 py-2 rounded-2xl bg-slate-900 text-white flex items-center gap-3 shadow-xl shadow-blue-500/10">
              <Activity size={14} className="text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-widest">{totalResults} Nodes Detected</span>
            </div>
          )}
        </header>

        {/* 2. ADVANCED FILTER DOCK */}
        <div className="bg-white/40 backdrop-blur-3xl border border-white rounded-[2.5rem] p-4 md:p-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-grow">
              <SearchBar onSearch={handleSearch} initialValue={query} />
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-100 shadow-sm">
                <Globe2 size={14} className="text-blue-500" />
                <LanguageSelector selected={language} onChange={handleLanguageChange} />
              </div>
              
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-100 shadow-sm">
                <CalendarDays size={14} className="text-slate-400" />
                <DateFilter onDateChange={handleDateChange} />
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-100 shadow-sm">
                <SlidersHorizontal size={14} className="text-slate-400" />
                <SortDropdown value={sort} onChange={handleSort} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SEARCH STATUS INDICATORS */}
      <div className="relative">
        {loading && articles.length === 0 && (
          <div className="py-20 flex justify-center">
            <Loader />
          </div>
        )}
        
        {error && (
          <div className="p-8 rounded-[2rem] bg-red-50 border border-red-100">
            <ErrorMessage message={error} retry={() => fetchSearch(query, currentPage, sort, language, fromDate)} />
          </div>
        )}

        {!loading && !error && articles.length === 0 && query && (
          <div className="text-center py-20 rounded-[3rem] bg-slate-50 border border-slate-100 border-dashed">
             <Search size={40} className="mx-auto text-slate-200 mb-4" />
             <p className="text-slate-500 font-bold tracking-tight">Zero match for "<span className="text-slate-900">{query}</span>"</p>
             <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-2">Adjust your node filters and retry</p>
          </div>
        )}

        {!query && !loading && (
          <div className="text-center py-32 rounded-[3.5rem] bg-gradient-to-b from-white to-slate-50/50 border border-slate-100">
            <div className="w-16 h-16 bg-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/40">
              <Search className="text-white" size={30} />
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight mb-2">Initialize Search Protocol</h2>
            <p className="text-sm text-slate-400 font-medium">Input keywords to retrieve global data streams</p>
          </div>
        )}

        {/* 4. RESULTS GRID AREA */}
        {articles.length > 0 && (
          <div className="space-y-12">
            <div className="relative">
              <NewsGrid articles={articles} />
            </div>
            
            <footer className="flex justify-center pt-8">
              <div className="px-8 py-4 bg-white/60 backdrop-blur-xl border border-white rounded-[2rem] shadow-xl">
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(totalResults / pageSize)}
                  onPageChange={handlePageChange}
                />
              </div>
            </footer>
          </div>
        )}
      </div>
    </main>
  )
}

export default SearchPage