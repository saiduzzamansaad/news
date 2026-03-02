import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import CategoryPage from '../pages/CategoryPage'
import SearchPage from '../pages/SearchPage'
import NewsDetails from '../pages/NewsDetails'
import BookmarkPage from '../pages/BookmarkPage'
import NotFound from '../pages/NotFound'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:category" element={<CategoryPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/news/:id" element={<NewsDetails />} />
      <Route path="/bookmarks" element={<BookmarkPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes