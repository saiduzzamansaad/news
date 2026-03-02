import { useBookmarks } from '../context/BookmarkContext'
import NewsGrid from '../components/news/NewsGrid'
import Button from '../components/ui/Button'
import { BookmarkX } from 'lucide-react'

const BookmarkPage = () => {
  const { bookmarks, clearBookmarks } = useBookmarks()

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-20">
        <BookmarkX size={48} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">No bookmarks yet</h2>
        <p className="text-gray-600">Start adding articles to your bookmarks!</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Bookmarks ({bookmarks.length})</h1>
        <Button onClick={clearBookmarks} variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
          Clear All
        </Button>
      </div>
      <NewsGrid articles={bookmarks} />
    </div>
  )
}

export default BookmarkPage