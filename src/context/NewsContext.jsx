import { createContext, useContext, useState, useCallback } from 'react'
import { getTopHeadlines, getByCategory, searchNews } from '../services/newsService'

const NewsContext = createContext()

export const useNews = () => useContext(NewsContext)

export const NewsProvider = ({ children }) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [totalResults, setTotalResults] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)

  const fetchNews = useCallback(async (fetcher, params = {}) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetcher(...Object.values(params))
      setArticles(data.articles || [])
      setTotalResults(data.totalResults || 0)
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchTopHeadlines = (country, page = 1) => {
    setCurrentPage(page)
    fetchNews(getTopHeadlines, [country, page, pageSize])
  }

  const fetchByCategory = (category, country, page = 1) => {
    setCurrentPage(page)
    fetchNews(getByCategory, [category, country, page, pageSize])
  }

  const fetchSearch = (query, page = 1, sortBy = 'publishedAt') => {
    setCurrentPage(page)
    fetchNews(searchNews, [query, page, pageSize, sortBy])
  }

  return (
    <NewsContext.Provider value={{
      articles,
      loading,
      error,
      totalResults,
      currentPage,
      pageSize,
      fetchTopHeadlines,
      fetchByCategory,
      fetchSearch,
    }}>
      {children}
    </NewsContext.Provider>
  )
}