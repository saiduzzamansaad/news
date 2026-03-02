import NewsCard from './NewsCard'

const NewsGrid = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No articles to display.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
    </div>
  )
}

export default NewsGrid