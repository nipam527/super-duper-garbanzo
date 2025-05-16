import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
// import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    console.log('Initial dark mode from localStorage:', saved);
    return saved === 'true';
  });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    console.log('Applying dark mode, isDarkMode:', isDarkMode);
    console.log('Before applying, documentElement classes:', document.documentElement.classList.toString());
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
    console.log('After applying, documentElement classes:', document.documentElement.classList.toString());

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    console.log('Toggling dark mode to:', !isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="relative font-['Inter']">
      <ErrorBoundary>
        <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        <div className="fixed top-0 left-0 z-50 w-full h-1 bg-blue-200 scroll-progress dark:bg-gray-700">
          <div
            className="h-full transition-all duration-300 bg-blue-600 dark:bg-blue-400"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
          
        </main>
        {/* <Footer /> */}
        <Footer />
      </ErrorBoundary>
    </div>
  );
};

export default App;