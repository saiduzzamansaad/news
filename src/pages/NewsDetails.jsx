import { useLocation, useNavigate } from 'react-router-dom'
import { useBookmarks } from '../context/BookmarkContext'
import { formatDate } from '../utils/formatDate'
import { Helmet } from 'react-helmet-async'
import { Bookmark, BookmarkCheck, ExternalLink, ArrowLeft, Share2 } from 'lucide-react'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'

const NewsDetails = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const article = location.state?.article

  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks()

  if (!article) {
    // If no article state (direct URL access), we could fetch by title, but NewsAPI doesn't support that.
    // For simplicity, redirect to home.
    navigate('/', { replace: true })
    return null
  }

  const bookmarked = isBookmarked(article.url)

  const handleBookmark = () => {
    if (bookmarked) removeBookmark(article.url)
    else addBookmark(article)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description,
        url: article.url,
      })
    } else {
      navigator.clipboard.writeText(article.url)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <>
      <Helmet>
        <title>{article.title} | NewsPortal</title>
        <meta name="description" content={article.description} />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-blue-600 mb-4">
          <ArrowLeft size={18} className="mr-1" /> Back
        </button>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {article.urlToImage && (
            <img src={article.urlToImage} alt={article.title} className="w-full max-h-96 object-cover" />
          )}

          <div className="p-6">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge>{article.source?.name}</Badge>
              <span className="text-gray-500 text-sm">{formatDate(article.publishedAt)}</span>
              {article.author && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-700 text-sm">By {article.author}</span>
                </>
              )}
            </div>

            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            <p className="text-gray-700 text-lg mb-6">{article.description}</p>
            <div className="prose max-w-none mb-6">
              <p>{article.content || article.description}</p>
            </div>

            <div className="flex flex-wrap gap-3 pt-4 border-t">
              <Button onClick={handleBookmark} variant={bookmarked ? 'primary' : 'outline'}>
                {bookmarked ? <BookmarkCheck size={18} className="mr-2" /> : <Bookmark size={18} className="mr-2" />}
                {bookmarked ? 'Saved' : 'Bookmark'}
              </Button>
              <Button onClick={handleShare} variant="outline">
                <Share2 size={18} className="mr-2" /> Share
              </Button>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="ml-auto">
                <Button variant="primary">
                  Read Full Article <ExternalLink size={18} className="ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </article>
      </div>
    </>
  )
}

export default NewsDetails