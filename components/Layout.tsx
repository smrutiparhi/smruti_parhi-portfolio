
import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../constants';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: 'Work', href: '#projects' },
    { name: 'Stack', href: '#skills' },
    { name: 'Resume', href: '#resume' },
  ];

  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-2 md:py-4' : 'py-6 md:py-8'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'glass rounded-full px-5 py-2 md:px-6 md:py-3 shadow-2xl' : ''}`}>
            <a href="#" className="group relative z-50">
              <div className="relative py-3 px-2 overflow-visible">
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 scale-150"></div>
                
                {/* Logo container */}
                <div className="relative flex items-center gap-1 overflow-visible">
                  {/* S */}
                  <div className="relative overflow-visible" style={{animation: 'wave 3s ease-in-out infinite'}}>
                    <span className="text-2xl md:text-3xl font-black font-outfit italic text-white drop-shadow-[0_0_25px_rgba(99,102,241,0.5)] group-hover:drop-shadow-[0_0_35px_rgba(99,102,241,0.8)] transition-all duration-300 group-hover:scale-110 inline-block group-hover:-rotate-6 leading-none" style={{lineHeight: '1.2'}}>
                      S
                    </span>
                    <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></div>
                  </div>
                  
                  {/* R */}
                  <div className="relative -ml-1 overflow-visible" style={{animation: 'wave 3s ease-in-out infinite', animationDelay: '0.2s'}}>
                    <span className="text-2xl md:text-3xl font-black font-outfit italic text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 drop-shadow-[0_0_25px_rgba(168,85,247,0.5)] group-hover:drop-shadow-[0_0_35px_rgba(168,85,247,0.8)] transition-all duration-300 group-hover:scale-110 inline-block leading-none" style={{lineHeight: '1.2'}}>
                      R
                    </span>
                    <div className="absolute top-0 right-0 w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                  </div>
                  
                  {/* P */}
                  <div className="relative -ml-1 overflow-visible" style={{animation: 'wave 3s ease-in-out infinite', animationDelay: '0.4s'}}>
                    <span className="text-2xl md:text-3xl font-black font-outfit italic text-transparent bg-clip-text bg-gradient-to-br from-pink-400 via-rose-400 to-orange-400 drop-shadow-[0_0_25px_rgba(244,114,182,0.5)] group-hover:drop-shadow-[0_0_35px_rgba(244,114,182,0.8)] transition-all duration-300 group-hover:scale-110 inline-block group-hover:rotate-6 leading-none" style={{lineHeight: '1.2', display: 'inline-block'}}>
                      P
                    </span>
                    <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                  </div>
                  
                  {/* Decorative slash */}
                  <div className="w-0.5 h-6 md:h-8 bg-gradient-to-b from-transparent via-indigo-500 to-transparent ml-1 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-12"></div>
                </div>
                
                {/* Underline accent */}
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </a>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="hover:text-white transition-colors">{link.name}</a>
              ))}
              <a href="#contact" className="group flex items-center gap-2 text-white">
                <span className="h-2 w-2 bg-indigo-500 rounded-full animate-pulse"></span>
                Contact
              </a>
            </nav>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={toggleMenu}
              className="md:hidden text-white relative z-50 p-2"
              aria-label="Toggle Menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-slate-950 z-40 transition-transform duration-500 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full items-center justify-center p-8 text-center space-y-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-black font-outfit text-white uppercase tracking-widest hover:text-indigo-500 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setIsMenuOpen(false)}
              className="text-3xl font-black font-outfit text-white uppercase tracking-widest hover:text-indigo-500 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-slate-950 pt-24 pb-12 md:pt-32 md:pb-16 relative overflow-hidden no-print">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 md:gap-20 mb-16 md:mb-20">
            <div>
              <h2 className="text-3xl md:text-5xl font-black font-outfit text-white mb-6 md:mb-8 tracking-tighter">Let's create something<br /><span className="text-indigo-500">remarkable.</span></h2>
              <p className="text-slate-400 text-base md:text-lg max-w-sm mb-8 md:mb-10 leading-relaxed">
                Currently taking on new projects and looking for exciting collaborations in the AI and web space.
              </p>
              <div className="flex gap-4">
                <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 glass flex items-center justify-center rounded-xl hover:bg-indigo-600 transition-all duration-300">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 glass flex items-center justify-center rounded-xl hover:bg-indigo-600 transition-all duration-300">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href={`https://wa.me/${PERSONAL_INFO.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 glass flex items-center justify-center rounded-xl hover:bg-green-500 transition-all duration-300">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 md:gap-10">
              <div>
                <h4 className="text-white font-bold mb-4 md:mb-6">Navigation</h4>
                <ul className="space-y-3 md:space-y-4 text-slate-500 text-sm">
                  <li><a href="#about" className="hover:text-indigo-400 transition-colors">Timeline</a></li>
                  <li><a href="#projects" className="hover:text-indigo-400 transition-colors">Projects</a></li>
                  <li><a href="#resume" className="hover:text-indigo-400 transition-colors">CV / Resume</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4 md:mb-6">Say Hello</h4>
                <ul className="space-y-3 md:space-y-4 text-slate-500 text-sm">
                  <li><a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-indigo-400 transition-colors truncate block">{PERSONAL_INFO.email}</a></li>
                  <li className="text-slate-500">{PERSONAL_INFO.location}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-900 gap-4 text-center md:text-left">
            <p className="text-slate-600 text-[10px] font-black tracking-[0.3em] uppercase">
              &copy; {new Date().getFullYear()} SMRUTI RANJAN PARHI - All Rights Reserved
            </p>
            <p className="text-slate-600 text-[10px] font-black tracking-[0.3em] uppercase">
              Crafted with Passion & Precision
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
