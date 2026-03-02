import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/formatDate'
import { truncateText } from '../../utils/truncateText'
import { useBookmarks } from '../../context/BookmarkContext'
import { Bookmark, BookmarkCheck, ExternalLink } from 'lucide-react'
import Badge from '../ui/Badge'

const NewsCard = ({ article, isFeatured = false }) => {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks()
  const bookmarked = isBookmarked(article.url)

  const handleBookmark = (e) => {
    e.preventDefault() // prevent link click
    if (bookmarked) {
      removeBookmark(article.url)
    } else {
      addBookmark(article)
    }
  }

  const handleExternalClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    window.open(article.url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition ${isFeatured ? 'col-span-2 row-span-2' : ''}`}>
      <Link to={`/news/${encodeURIComponent(article.title)}`} state={{ article }} className="block">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={article.urlToImage || '/placeholder-image.jpg'} 
            alt={article.title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => { e.target.src = '/placeholder-image.jpg' }}
          />
          <button 
            onClick={handleBookmark}
            className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100"
          >
            {bookmarked ? <BookmarkCheck size={18} className="text-blue-600" /> : <Bookmark size={18} />}
          </button>
        </div>
        <div className="p-4">
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <span>{article.source?.name}</span>
            <span className="mx-1">•</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          <h3 className={`font-bold mb-2 ${isFeatured ? 'text-2xl' : 'text-lg'}`}>
            {truncateText(article.title, isFeatured ? 100 : 80)}
          </h3>
          {isFeatured && (
            <p className="text-gray-600 text-sm mb-3">{truncateText(article.description, 120)}</p>
          )}
          <div className="flex justify-between items-center">
            <Badge>{article.source?.name}</Badge>
            {/* Changed anchor to button to avoid nested links */}
            <button
              onClick={handleExternalClick}
              className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center"
            >
              Read more <ExternalLink size={14} className="ml-1" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default NewsCard