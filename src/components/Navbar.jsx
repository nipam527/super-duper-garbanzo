import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes, FaHome, FaUser, FaFolderOpen, FaEnvelope } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleResumeView = () => {
    // Show toast notification
    toast.info('Opening resume...', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Log the view event (for tracking purposes)
    console.log('Resume viewed at:', new Date().toISOString());
    // Optionally, you can integrate with an analytics service here, e.g.:
    // window.gtag('event', 'view', { 'event_category': 'Resume', 'event_label': 'Nipam_Parmar_Resume.pdf' });
  };

  useEffect(() => {
    // Scroll handler to update isScrolled state
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: 'home', label: 'Home', icon: <FaHome className="mr-3" /> },
    { to: 'about', label: 'About', icon: <FaUser className="mr-3" /> },
    { to: 'projects', label: 'Projects', icon: <FaFolderOpen className="mr-3" /> },
    { to: 'contact-us', label: 'Contact', icon: <FaEnvelope className="mr-3" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 z-50 w-full px-8 py-6 shadow-md bg-cream">
      <ToastContainer />

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

          nav, nav * {
            font-family: 'Inter', sans-serif;
          }

          .bg-cream {
            background-color: #FFF8F0;
          }
          .text-indigo {
            color: #2A2E4D;
          }
          .text-coral-600 {
            color: #FF6F7D;
          }
          .text-teal-500 {
            color: #6ADBD6;
          }
          .bg-teal-500 {
            background-color: #6ADBD6;
          }

          .nav-container {
            max-width: 90rem;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #FFF8F0;
          }

          .nav-logo {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            background: none;
            transition: transform 0.3s ease;
          }
          .nav-logo:hover {
            transform: scale(1.05) translateY(-2px);
          }

          .logo-gradient {
            font-size: 2.25rem;
            font-weight: 800;
            background: linear-gradient(90deg, #FF6F7D, #6ADBD6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .logo-secondary {
            font-size: 1.5rem;
            font-weight: 600;
            color: #2A2E4D;
          }
          .logo-emoji {
            font-size: 2rem;
            transition: transform 0.3s ease;
          }
          .nav-logo:hover .logo-emoji {
            transform: rotate(15deg);
          }

          .nav-links {
            display: flex;
            gap: 3rem;
            align-items: center;
            background: none;
          }

          .nav-link {
            position: relative;
            display: flex;
            align-items: center;
            font-size: 1.5rem;
            font-weight: 600;
            color: #2A2E4D;
            background: none;
            padding: 0.5rem 0;
            cursor: pointer;
            transition: color 0.3s ease, transform 0.3s ease;
          }
          .nav-link:hover {
            color: #FF6F7D;
            transform: translateY(-3px);
          }
          .nav-link.active {
            color: #FF6F7D;
          }
          .nav-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: #FF6F7D;
            box-shadow: 0 2px 8px rgba(255, 111, 125, 0.3);
            transform: scaleX(0);
            transform-origin: bottom left;
            transition: transform 0.3s ease;
          }
          .nav-link:hover::after,
          .nav-link.active::after {
            transform: scaleX(1);
          }
          .nav-link:hover svg,
          .nav-link.active svg {
            color: #FF6F7D;
          }

          .menu-button {
            color: #2A2E4D;
            background: none;
            cursor: pointer;
            transition: color 0.3s ease;
          }
          .menu-button:hover {
            color: #FF6F7D;
          }

          .mobile-menu {
            background: #FFF8F0;
          }

          .animate-fadeIn {
            animation: fadeIn 0.8s ease-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-15px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-slideIn {
            animation: slideIn 0.4s ease-out;
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(-25px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @media (max-width: 768px) {
            .nav-links {
              display: none;
            }
            .mobile-menu .nav-links {
              display: flex;
              flex-direction: column;
              gap: 2rem;
              padding: 2rem 0;
            }
            .mobile-menu .nav-link {
              font-size: 1.75rem;
              justify-content: center;
            }
          }
          @media (min-width: 769px) {
            .menu-button {
              display: none;
            }
          }
        `}
      </style>

      <div className="nav-container">
        <Link
          to="home"
          smooth={true}
          duration={500}
          className="nav-logo animate-fadeIn"
          style={{ animationDelay: '0.2s' }}
        >
          <span className="logo-gradient">Nipam</span>
          <span className="logo-secondary">.dev</span>
          <span className="logo-emoji">💻</span>
        </Link>

        <div className="hidden nav-links md:flex">
          {navLinks.map(({ to, label, icon }, index) => (
            <Link
              key={to}
              to={to}
              smooth={true}
              duration={500}
              className={`nav-link animate-fadeIn ${isScrolled ? 'text-indigo' : 'text-indigo'}`}
              activeClass="active"
              spy={true}
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              {icon}
              {label}
            </Link>
          ))}
          
        </div>

        <button
          className="menu-button md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes size={32} /> : <FaBars size={32} />}
        </button>
      </div>

      {isOpen && (
        <div className="py-6 mobile-menu md:hidden animate-slideIn">
          <div className="nav-links">
            {navLinks.map(({ to, label, icon }, index) => (
              <Link
                key={to}
                to={to}
                smooth={true}
                duration={500}
                className={`nav-link ${isScrolled ? 'text-indigo' : 'text-indigo'}`}
                activeClass="active"
                spy={true}
                onClick={closeMenu}
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                {icon}
                {label}
              </Link>
            ))}
            
            
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;