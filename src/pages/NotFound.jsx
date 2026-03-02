import { Link } from 'react-router-dom'
import { FileQuestion } from 'lucide-react'
import Button from '../components/ui/Button'

const NotFound = () => {
  return (
    <div className="text-center py-20">
      <FileQuestion size={64} className="mx-auto text-gray-400 mb-4" />
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-xl text-gray-600 mb-6">Page not found</p>
      <Link to="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  )
}

export default NotFound