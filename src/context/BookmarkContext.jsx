import { createContext, useContext, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const BookmarkContext = createContext()

export const useBookmarks = () => useContext(BookmarkContext)

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useLocalStorage('bookmarks', [])

  useEffect(() => {
    if (!Array.isArray(bookmarks)) {
      console.warn('Bookmarks was not an array, resetting to empty array')
      setBookmarks([])
    }
  }, [bookmarks, setBookmarks])

  const addBookmark = (article) => {
    const current = Array.isArray(bookmarks) ? bookmarks : []
    if (!current.some(b => b.url === article.url)) {
      setBookmarks([...current, article])
    }
  }

  const removeBookmark = (url) => {
    const current = Array.isArray(bookmarks) ? bookmarks : []
    setBookmarks(current.filter(b => b.url !== url))
  }

  const isBookmarked = (url) => {
    if (!Array.isArray(bookmarks)) return false
    return bookmarks.some(b => b.url === url)
  }

  const clearBookmarks = () => setBookmarks([])

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks: Array.isArray(bookmarks) ? bookmarks : [],
        addBookmark,
        removeBookmark,
        isBookmarked,
        clearBookmarks,
        bookmarkCount: Array.isArray(bookmarks) ? bookmarks.length : 0,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  )
}