import { useEffect, useState } from 'react'   // <-- Add useState
import { useParams } from 'react-router-dom'
import { useNews } from '../hooks/useNews'
import NewsGrid from '../components/news/NewsGrid'
import CategoryFilter from '../components/filters/CategoryFilter'
import CountrySelector from '../components/filters/CountrySelector'
import Pagination from '../components/ui/Pagination'
import Loader from '../components/ui/Loader'
import ErrorMessage from '../components/ui/ErrorMessage'

const CategoryPage = () => {
  const { category } = useParams()
  const { articles, loading, error, totalResults, currentPage, pageSize, fetchByCategory } = useNews()
  const [country, setCountry] = useState('us')

  useEffect(() => {
    fetchByCategory(category, country, 1)
  }, [category, country])

  const handlePageChange = (page) => {
    fetchByCategory(category, country, page)
    window.scrollTo({ top: 0 })
  }

  if (loading && articles.length === 0) return <Loader />
  if (error) return <ErrorMessage message={error} retry={() => fetchByCategory(category, country, 1)} />

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold capitalize">{category} News</h1>
        <div className="flex gap-2">
          <CategoryFilter selected={category} />
          <CountrySelector selected={country} onChange={setCountry} />
        </div>
      </div>
      <NewsGrid articles={articles} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalResults / pageSize)}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default CategoryPage