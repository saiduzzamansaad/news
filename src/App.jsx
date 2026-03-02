import { NewsProvider } from './context/NewsContext'
import { BookmarkProvider } from './context/BookmarkContext'
import { HistoryProvider } from './context/HistoryContext'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ui/ScrollToTop'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'

function AppContent() {
  useKeyboardShortcuts() // activate keyboard shortcuts
  return (
    <>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <AppRoutes />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}

function App() {
  return (
    <NewsProvider>
      <BookmarkProvider>
        <HistoryProvider>
          <div className="flex flex-col min-h-screen">
            <AppContent />
          </div>
        </HistoryProvider>
      </BookmarkProvider>
    </NewsProvider>
  )
}

export default App