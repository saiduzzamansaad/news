import { Globe, Github, Twitter, Mail, Zap } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative mt-20 pb-10 px-4">
      {/* Futuristic Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-32 bg-blue-600/20 blur-[100px] -z-10 rounded-full" />

      <div className="container mx-auto">
        {/* Main Footer Box */}
        <div className="bg-gray-900/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden relative">
          
          {/* Animated Mesh Pattern Overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            
            {/* Brand Section */}
            <div className="text-center md:text-left space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-2 group cursor-pointer">
                <div className="p-2 bg-blue-600 rounded-xl group-hover:rotate-[360deg] transition-transform duration-700 shadow-lg shadow-blue-500/50">
                  <Zap size={20} className="text-white fill-white" />
                </div>
                <span className="text-2xl font-black tracking-tighter text-white">
                  NEWS<span className="text-blue-500">PORTAL</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm max-w-xs mx-auto md:mx-0 leading-relaxed">
                Delivering the future of journalism with real-time insights and global connectivity. 
              </p>
            </div>

            {/* Social Links - Micro-animations */}
            <div className="flex justify-center gap-4">
              {[
                { Icon: Twitter, href: "#" },
                { Icon: Github, href: "#" },
                { Icon: Globe, href: "#" },
                { Icon: Mail, href: "#" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="p-3 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-blue-400 hover:bg-white/10 hover:-translate-y-1.5 transition-all duration-300 shadow-xl"
                >
                  <social.Icon size={20} />
                </a>
              ))}
            </div>

            {/* Attribution & Rights */}
            <div className="text-center md:text-right space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">Powered by</span>
                <a 
                  href="https://newsapi.org" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  NewsAPI.org
                </a>
              </div>
              <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em]">
                &copy; {currentYear} — Redefining Media
              </p>
            </div>
          </div>

          {/* Bottom Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mt-10 md:mt-12" />
          
          <div className="mt-6 text-center">
            <span className="text-[10px] text-gray-600 font-mono tracking-tighter opacity-50">
              BUILD_VERSION: 2026.4.0_ALPHA // STABLE_RECOVERY_PROTOCOL_ACTIVE
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer