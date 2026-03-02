import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTopHeadlines } from '../../services/newsService'
import { Flame } from 'lucide-react'

const TrendingNews = () => {
  const [trending, setTrending] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTopHeadlines('us', 1, 5)
      .then(data => setTrending(data.articles || []))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-3 bg-gray-200 rounded w-full mb-2"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg sticky top-20">
      <h3 className="font-bold text-lg mb-3 flex items-center">
        <Flame size={20} className="text-orange-500 mr-2" /> Trending Now
      </h3>
      {trending.map((article, index) => (
        <Link
          key={index}
          to={`/news/${encodeURIComponent(article.title)}`}
          state={{ article }}
          className="block mb-3 pb-2 border-b last:border-0 hover:bg-gray-100 transition p-2 rounded"
        >
          <p className="text-sm font-medium line-clamp-2">{article.title}</p>
          <span className="text-xs text-gray-500">{article.source?.name}</span>
        </Link>
      ))}
    </div>
  )
}

export default TrendingNews