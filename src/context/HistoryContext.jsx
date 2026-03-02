import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const HistoryContext = createContext()

export const useHistory = () => useContext(HistoryContext)

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useLocalStorage('history', [])

  const addToHistory = (article) => {
    setHistory(prev => {
      const filtered = prev.filter(a => a.url !== article.url)
      return [article, ...filtered].slice(0, 10) // keep last 10
    })
  }

  const clearHistory = () => setHistory([])

  return (
    <HistoryContext.Provider value={{ history, addToHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  )
}