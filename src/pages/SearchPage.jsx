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
    window.scrollTo({ top: 0 })
  }

  return (
    <div>
      <div className="mb-6">
        <SearchBar onSearch={handleSearch} initialValue={query} />
        <div className="mt-2 flex flex-wrap gap-2 justify-end">
          <LanguageSelector selected={language} onChange={handleLanguageChange} />
          <DateFilter onDateChange={handleDateChange} />
          <SortDropdown value={sort} onChange={handleSort} />
        </div>
      </div>

      {loading && articles.length === 0 && <Loader />}
      {error && <ErrorMessage message={error} retry={() => fetchSearch(query, currentPage, sort, language, fromDate)} />}
      {!loading && !error && articles.length === 0 && query && (
        <div className="text-center py-10">No articles found for "{query}"</div>
      )}
      {!query && !loading && (
        <div className="text-center py-10">Enter a search term above</div>
      )}

      {articles.length > 0 && (
        <>
          <p className="mb-4 text-gray-600">Found {totalResults} results</p>
          <NewsGrid articles={articles} />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalResults / pageSize)}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  )
}

export default SearchPage