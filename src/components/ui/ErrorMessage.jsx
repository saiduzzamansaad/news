import { AlertCircle, RefreshCw } from 'lucide-react'
import Button from './Button'

const ErrorMessage = ({ message, retry }) => (
  <div className="text-center py-10">
    <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
    <p className="text-red-600 mb-4">{message || 'Something went wrong'}</p>
    {retry && (
      <Button onClick={retry} variant="outline">
        <RefreshCw size={16} className="mr-2" /> Try Again
      </Button>
    )}
  </div>
)
export default ErrorMessage