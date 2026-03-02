import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from './Button'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null

  const pages = []
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...')
    }
  }

  return (
    <div className="flex justify-center items-center space-x-2 my-6">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="outline"
        size="sm"
      >
        <ChevronLeft size={16} />
      </Button>
      {pages.map((page, idx) => (
        <Button
          key={idx}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          variant={page === currentPage ? 'primary' : 'outline'}
          size="sm"
          disabled={page === '...'}
        >
          {page}
        </Button>
      ))}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="outline"
        size="sm"
      >
        <ChevronRight size={16} />
      </Button>
    </div>
  )
}

export default Pagination