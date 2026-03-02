import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (e.key === 's') {
        e.preventDefault()
        navigate('/search')
        document.querySelector('input[type="text"]')?.focus()
      } else if (e.key === 'h') {
        navigate('/')
      } else if (e.key === 'b') {
        navigate('/bookmarks')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate])
}