import { useEffect, useState } from 'react'
import { useNews } from '../hooks/useNews'
import NewsGrid from '../components/news/NewsGrid'
import FeaturedNews from '../components/news/FeaturedNews'
import CategoryFilter from '../components/filters/CategoryFilter'
import CountrySelector from '../components/filters/CountrySelector'
import Pagination from '../components/ui/Pagination'
import Loader from '../components/ui/Loader'
import ErrorMessage from '../components/ui/ErrorMessage'
import TrendingNews from '../components/news/TrendingNews'

const Home = () => {
  const { articles, loading, error, totalResults, currentPage, pageSize, fetchTopHeadlines } = useNews()
  const [country, setCountry] = useState('us')

  useEffect(() => {
    fetchTopHeadlines(country, 1)
  }, [country])

  const handlePageChange = (page) => {
    fetchTopHeadlines(country, page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading && articles.length === 0) return <Loader />
  if (error) return <ErrorMessage message={error} retry={() => fetchTopHeadlines(country, 1)} />

  const featured = articles[0]
  const remaining = articles.slice(1)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Top Headlines</h1>
          <CountrySelector selected={country} onChange={setCountry} />
        </div>
        {featured && <FeaturedNews article={featured} />}
        <NewsGrid articles={remaining} />
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalResults / pageSize)}
          onPageChange={handlePageChange}
        />
      </div>
      <aside className="lg:col-span-1">
        <TrendingNews />
      </aside>
    </div>
  )
}

export default Home