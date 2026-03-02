import { NewsProvider } from './context/NewsContext'
import { BookmarkProvider } from './context/BookmarkContext'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ui/ScrollToTop'

function App() {
  return (
    <NewsProvider>
      <BookmarkProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-6">
            <AppRoutes />
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      </BookmarkProvider>
    </NewsProvider>
  )
}

export default App