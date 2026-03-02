import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/formatDate'
import { truncateText } from '../../utils/truncateText'

const FeaturedNews = ({ article }) => {
  return (
    <div className="mb-8 bg-white rounded-lg shadow-lg overflow-hidden">
      <Link to={`/news/${encodeURIComponent(article.title)}`} state={{ article }}>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="h-64 md:h-auto">
            <img
              src={article.urlToImage || '/placeholder-image.jpg'}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = '/placeholder-image.jpg' }}
            />
          </div>
          <div className="p-6 flex flex-col justify-center">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <span>{article.source?.name}</span>
              <span className="mx-1">•</span>
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">{article.title}</h2>
            <p className="text-gray-600 mb-4">{truncateText(article.description, 200)}</p>
            <span className="text-blue-600 font-semibold hover:underline">Read full article →</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default FeaturedNews