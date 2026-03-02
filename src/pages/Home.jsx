import { useEffect, useState } from 'react'
import { useNews } from '../hooks/useNews'
import NewsGrid from '../components/news/NewsGrid'
import FeaturedNews from '../components/news/FeaturedNews'
// CategoryFilter (imported but used if needed)
import CountrySelector from '../components/filters/CountrySelector'
import LanguageSelector from '../components/filters/LanguageSelector'
import Pagination from '../components/ui/Pagination'
import Loader from '../components/ui/Loader'
import ErrorMessage from '../components/ui/ErrorMessage'
import TrendingNews from '../components/news/TrendingNews'

const Home = () => {
  const { articles, loading, error, totalResults, currentPage, pageSize, fetchTopHeadlines } = useNews()
  const [country, setCountry] = useState('us')
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    fetchTopHeadlines(country, 1, pageSize, language)
  }, [country, language])

  const handlePageChange = (page) => {
    fetchTopHeadlines(country, page, pageSize, language)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading && articles.length === 0) return <Loader />
  if (error) return <ErrorMessage message={error} retry={() => fetchTopHeadlines(country, 1, pageSize, language)} />

  const featured = articles[0]
  const remaining = articles.slice(1)

  return (
    /* FIXED: pt-28 ensures content starts below the floating navbar. 
       Added animate-in for a premium entrance effect */
    <main className="container mx-auto px-4 pt-28 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-8">
          
          {/* Header Section with Glass Effect */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-white shadow-sm">
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                Top <span className="text-blue-600">Headlines</span>
              </h1>
              <p className="text-gray-500 text-sm mt-1">Discover what's happening around the world</p>
            </div>
            
            <div className="flex items-center gap-3 bg-white/50 p-2 rounded-2xl backdrop-blur-sm border border-white">
              <LanguageSelector selected={language} onChange={setLanguage} />
              <div className="h-6 w-px bg-gray-300 mx-1 hidden md:block" />
              <CountrySelector selected={country} onChange={setCountry} />
            </div>
          </header>

          {/* Featured Article with Hover Scale */}
          <section className="transform transition-all duration-500 hover:shadow-2xl rounded-3xl overflow-hidden">
            {featured && <FeaturedNews article={featured} />}
          </section>

          {/* News Grid Area */}
          <section className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-transparent rounded-full opacity-20 hidden lg:block" />
            <NewsGrid articles={remaining} />
          </section>

          {/* Premium Styled Pagination */}
          <footer className="flex justify-center pt-8">
            <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalResults / pageSize)}
                onPageChange={handlePageChange}
              />
            </div>
          </footer>
        </div>

        {/* Sidebar with Sticky Control */}
        <aside className="lg:col-span-4 xl:col-span-3">
          <div className="sticky top-28 space-y-6">
            <div className="group p-1 rounded-[2rem] bg-gradient-to-br from-blue-100 via-white to-purple-100 shadow-xl transition-all duration-500 hover:scale-[1.02]">
              <div className="bg-white/80 backdrop-blur-md rounded-[1.8rem] p-5 border border-white">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping" />
                    Trending Now
                  </h2>
                </div>
                <TrendingNews />
              </div>
            </div>
            
            {/* Newsletter or Ad Placeholder for Premium Look */}
            <div className="rounded-3xl bg-blue-600 p-6 text-white overflow-hidden relative group">
              <div className="relative z-10">
                <h3 className="font-bold text-lg">Stay Updated!</h3>
                <p className="text-blue-100 text-xs mt-1">Get the latest news delivered to your inbox.</p>
                <button className="mt-4 w-full py-2 bg-white text-blue-600 rounded-xl font-bold text-sm transition-transform active:scale-95">
                  Subscribe
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500 rounded-full opacity-50 blur-2xl group-hover:scale-150 transition-transform duration-700" />
            </div>
          </div>
        </aside>

      </div>
    </main>
  )
}

export default Home