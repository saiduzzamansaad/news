import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNews } from '../hooks/useNews'
import NewsGrid from '../components/news/NewsGrid'
import CountrySelector from '../components/filters/CountrySelector'
import Pagination from '../components/ui/Pagination'
import Loader from '../components/ui/Loader'
import ErrorMessage from '../components/ui/ErrorMessage'

const CountryPage = () => {
  const { countryCode } = useParams()
  const [country, setCountry] = useState(countryCode || 'us')
  const { articles, loading, error, totalResults, currentPage, pageSize, fetchTopHeadlines } = useNews()

  useEffect(() => {
    fetchTopHeadlines(country, 1)
  }, [country])

  const handleCountryChange = (newCountry) => {
    setCountry(newCountry)
    // Optionally update URL
    window.history.pushState(null, '', `/country/${newCountry}`)
  }

  const handlePageChange = (page) => {
    fetchTopHeadlines(country, page)
    window.scrollTo({ top: 0 })
  }

  if (loading && articles.length === 0) return <Loader />
  if (error) return <ErrorMessage message={error} retry={() => fetchTopHeadlines(country, 1)} />

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">News from {country.toUpperCase()}</h1>
        <CountrySelector selected={country} onChange={handleCountryChange} />
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

export default CountryPage