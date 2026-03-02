import { formatDate } from '../../utils/formatDate'

const NewsMeta = ({ article, showAuthor = true }) => {
  return (
    <div className="flex items-center text-xs text-gray-500 space-x-2">
      <span>{article.source?.name}</span>
      <span>•</span>
      <span>{formatDate(article.publishedAt)}</span>
      {showAuthor && article.author && (
        <>
          <span>•</span>
          <span>By {article.author}</span>
        </>
      )}
    </div>
  )
}

export default NewsMeta