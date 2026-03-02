const Footer = () => {
      return (
        <footer className="bg-gray-900 text-white py-6 mt-10">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} NewsPortal. All rights reserved.</p>
            <p className="text-sm text-gray-400 mt-2">
              Powered by <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer" className="hover:underline">NewsAPI</a>
            </p>
          </div>
        </footer>
      )
    }
    
    export default Footer