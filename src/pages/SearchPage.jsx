import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useNews } from '../hooks/useNews'
import SearchBar from '../components/search/SearchBar'
import SortDropdown from '../components/filters/SortDropdown'
import NewsGrid from '../components/news/NewsGrid'
import Pagination from '../components/ui/Pagination'
import Loader from '../components/ui/Loader'
import ErrorMessage from '../components/ui/ErrorMessage'
import debounce from 'lodash.debounce' // install lodash.debounce or write own

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const sort = searchParams.get('sort') || 'publishedAt'
  
  const { articles, loading, error, totalResults, currentPage, pageSize, fetchSearch } = useNews()
  const [searchTerm, setSearchTerm] = useState(query)

  // Debounced search to avoid too many requests
  const debouncedSearch = useCallback(
    debounce((q, sortBy, page) => {
      if (q.trim()) {
        fetchSearch(q, page, sortBy)
      }
    }, 500),
    []
  )

  useEffect(() => {
    if (query) {
      debouncedSearch(query, sort, currentPage)
    }
  }, [query, sort, currentPage, debouncedSearch])

  const handleSearch = (newQuery) => {
    setSearchParams({ q: newQuery, sort })
  }

  const handleSort = (newSort) => {
    setSearchParams({ q: query, sort: newSort })
  }

  const handlePageChange = (page) => {
    setSearchParams({ q: query, sort, page })
    window.scrollTo({ top: 0 })
  }

  return (
    <div>
      <div className="mb-6">
        <SearchBar onSearch={handleSearch} initialValue={query} />
        <div className="mt-2 flex justify-end">
          <SortDropdown value={sort} onChange={handleSort} />
        </div>
      </div>

      {loading && articles.length === 0 && <Loader />}
      {error && <ErrorMessage message={error} retry={() => fetchSearch(query, currentPage, sort)} />}
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