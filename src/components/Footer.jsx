// import { useState } from 'react';
// import { Link } from 'react-scroll';
// import { FaGithub, FaLinkedin, FaEnvelope, FaCopy } from 'react-icons/fa';
// import { motion, AnimatePresence } from 'framer-motion';

// const Footer = () => {
//   const email = 'your.email@example.com';
//   const [copySuccess, setCopySuccess] = useState(false);

//   const navLinks = [
//     { to: 'home', label: 'Home' },
//     { to: 'about', label: 'About' },
//     { to: 'projects', label: 'Projects' },
//     { to: 'contact', label: 'Contact' },
//   ];

//   const socialLinks = [
//     { href: 'https://github.com/yourusername', icon: <FaGithub size={28} />, label: 'GitHub' },
//     { href: 'https://linkedin.com/in/yourusername', icon: <FaLinkedin size={28} />, label: 'LinkedIn' },
//     { href: `mailto:${email}`, icon: <FaEnvelope size={28} />, label: 'Email' },
//   ];

//   const handleCopyEmail = async () => {
//     try {
//       if (navigator.clipboard) {
//         await navigator.clipboard.writeText(email);
//         setCopySuccess(true);
//         setTimeout(() => setCopySuccess(false), 2000);
//       } else {
//         const textArea = document.createElement('textarea');
//         textArea.value = email;
//         document.body.appendChild(textArea);
//         textArea.select();
//         document.execCommand('copy');
//         document.body.removeChild(textArea);
//         setCopySuccess(true);
//         setTimeout(() => setCopySuccess(false), 2000);
//       }
//     } catch (err) {
//       console.error('Failed to copy:', err);
//     }
//   };

//   const handleBackToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const linkVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
//   };

//   return (
//     <footer className="relative py-20 overflow-hidden text-gray-900 bg-white dark:bg-gray-900 dark:text-white">
//       <svg
//         className="absolute inset-0 z-0 w-full h-full opacity-20 animate-wave"
//         viewBox="0 0 1440 320"
//         preserveAspectRatio="none"
//         aria-hidden="true"
//       >
//         <path
//           fill="#dbeafe"
//           className="dark:fill-gray-700"
//           d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,165.3C672,149,768,139,864,154.7C960,171,1056,213,1152,213.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
//         />
//       </svg>

//       <div className="relative z-10 grid grid-cols-1 gap-12 px-6 mx-auto max-w-7xl sm:grid-cols-2 md:grid-cols-3">
//         <div className="space-y-8 text-center md:text-left">
//           <motion.div
//             className="text-lg leading-relaxed text-gray-600 dark:text-gray-300"
//             initial="hidden"
//             animate="visible"
//             variants={linkVariants}
//           >
//             <Typical
//               steps={['Innovate with Code', 2000, 'Create with Passion', 2000, 'Inspire with Design', 2000]}
//               loop={Infinity}
//               wrapper="p"
//             />
//           </motion.div>
//           <motion.div
//             className="flex justify-center gap-8 md:justify-start"
//             initial="hidden"
//             animate="visible"
//             variants={linkVariants}
//           >
//             {socialLinks.map(({ href, icon, label }) => (
//               <motion.a
//                 key={href}
//                 href={href}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="relative p-2 text-gray-600 transition-colors duration-300 rounded-full dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 bg-blue-50/50 dark:bg-gray-800/50 backdrop-blur-md group"
//                 whileHover={{ scale: 1.15 }}
//                 aria-label={label}
//                 role="button"
//                 tabIndex={0}
//                 onKeyDown={(e) => e.key === 'Enter' && window.open(href, '_blank')}
//               >
//                 {icon}
//                 <span className="absolute px-2 py-1 text-xs text-white transition-opacity duration-300 -translate-x-1/2 bg-blue-600 rounded opacity-0 -top-10 left-1/2 dark:bg-blue-500 group-hover:opacity-100">
//                   {label}
//                 </span>
//               </motion.a>
//             ))}
//           </motion.div>
//         </div>

//         <div className="space-y-8 text-center md:text-left">
//           <motion.h3
//             className="text-2xl font-bold tracking-widest text-gray-900 uppercase dark:text-white"
//             initial="hidden"
//             animate="visible"
//             variants={linkVariants}
//           >
//             Navigation
//           </motion.h3>
//           <ul className="space-y-5">
//             {navLinks.map(({ to, label }) => (
//               <motion.li
//                 key={to}
//                 initial="hidden"
//                 animate="visible"
//                 variants={linkVariants}
//                 transition={{ delay: 0.1 * navLinks.indexOf({ to, label }) }}
//               >
//                 <Link
//                   to={to}
//                   smooth={true}
//                   duration={500}
//                   className="px-3 py-1 text-lg font-medium text-gray-600 transition-colors duration-300 rounded-md cursor-pointer dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 bg-blue-50/50 dark:bg-gray-800/50 backdrop-blur-md"
//                   activeClass="text-blue-500 dark:text-blue-400 relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-blue-700 dark:after:from-blue-400 dark:after:to-blue-600 after:scale-x-100 after:shadow-[0_0_8px_rgba(59,130,246,0.5)]"
//                   aria-current={to === 'home' ? 'page' : undefined}
//                 >
//                   {label}
//                 </Link>
//               </motion.li>
//             ))}
//           </ul>
//         </div>

//         <div className="space-y-8 text-center md:text-left">
//           <motion.h3
//             className="text-2xl font-bold tracking-widest text-gray-900 uppercase dark:text-white"
//             initial="hidden"
//             animate="visible"
//             variants={linkVariants}
//           >
//             Contact
//           </motion.h3>
//           <div className="space-y-5">
//             <motion.p
//               className="text-lg text-gray-600 dark:text-gray-300"
//               initial="hidden"
//               animate="visible"
//               variants={linkVariants}
//             >
//               Have a project in mind? Let’s collaborate.
//             </motion.p>
//             <motion.div
//               className="relative flex items-center justify-center md:justify-start"
//               initial="hidden"
//               animate="visible"
//               variants={linkVariants}
//             >
//               <a
//                 href={`mailto:${email}`}
//                 className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-300 flex items-center text-lg drop-shadow-[0_0_5px_rgba(59,130,246,0.2)]"
//                 aria-label={`Email ${email}`}
//               >
//                 <FaEnvelope className="mr-2" />
//                 {email}
//               </a>
//               <motion.button
//                 onClick={handleCopyEmail}
//                 className="ml-3 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
//                 whileHover={{ scale: 1.2 }}
//                 whileTap={{ scale: 0.9 }}
//                 aria-label="Copy email to clipboard"
//               >
//                 <FaCopy size={20} />
//               </motion.button>
//               <AnimatePresence>
//                 {copySuccess && (
//                   <motion.span
//                     className="absolute px-2 py-1 text-xs text-white bg-blue-600 rounded -top-8 dark:bg-blue-500"
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 10 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     Copied!
//                   </motion.span>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       <motion.div
//         className="py-8 mt-16 border-t border-blue-200 dark:border-gray-700"
//         initial="hidden"
//         animate="visible"
//         variants={linkVariants}
//       >
//         <div className="flex flex-col items-center justify-between px-6 mx-auto max-w-7xl md:flex-row">
//           <p className="text-base text-gray-600 dark:text-gray-300">
//             © {new Date().getFullYear()} Nipam.dev. All rights reserved.
//           </p>
//           <motion.button
//             onClick={handleBackToTop}
//             className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 flex items-center gap-1.5 mt-4 md:mt-0 animate-pulseGlow"
//             whileHover={{ scale: 1.1 }}
//             aria-label="Scroll to top"
//           >
//             <span>Back to Top</span>
//             <motion.svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-5 h-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               animate={{ y: [0, -4, 0] }}
//               transition={{ repeat: Infinity, duration: 1.5 }}
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
//             </motion.svg>
//           </motion.button>
//         </div>
//       </motion.div>
//     </footer>
//   );
// };

// export default Footer;
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const backToTopParticleCanvasRef = useRef(null);
  const backToTopButtonRef = useRef(null);

  useEffect(() => {
    // Scroll-triggered animation for footer
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
        },
      }
    );

    // Social orbs animation
    gsap.fromTo(
      '.footer-social-orb',
      { opacity: 0, scale: 0, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
        },
      }
    );

    // Back to Top button animation and particle effect
    const backToTopButton = backToTopButtonRef.current;
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      gsap.to(backToTopButton, {
        scale: 1.2,
        duration: 0.2,
        ease: 'power3.out',
        yoyo: true,
        repeat: 1,
      });
    });

    // Particle effect on Back to Top button hover
    const canvas = backToTopParticleCanvasRef.current;
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    
    const resizeCanvas = () => {
      canvas.width = backToTopButton.offsetWidth;
      canvas.height = backToTopButton.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.life = 100;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = `rgba(106, 219, 214, ${this.life / 100})`; // teal-500
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const handleParticles = () => {
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        if (particlesArray[i].life <= 0) {
          particlesArray.splice(i, 1);
          i--;
        }
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      handleParticles();
      requestAnimationFrame(animateParticles);
    };

    backToTopButton.addEventListener('mouseenter', () => {
      for (let i = 0; i < 20; i++) {
        particlesArray.push(new Particle());
      }
      gsap.to(backToTopButton, {
        scale: 1.05,
        boxShadow: '0 0 25px rgba(106, 219, 214, 0.8)',
        duration: 0.3,
        ease: 'power3.out',
      });
      if (particlesArray.length > 0 && !window.backToTopParticleAnimation) {
        window.backToTopParticleAnimation = requestAnimationFrame(animateParticles);
      }
    });

    backToTopButton.addEventListener('mouseleave', () => {
      gsap.to(backToTopButton, {
        scale: 1,
        boxShadow: '0 0 15px rgba(106, 219, 214, 0.4)',
        duration: 0.3,
        ease: 'power3.out',
      });
    });

    // Social orb ripple effect
    const socialOrbs = footerRef.current.querySelectorAll('.footer-social-orb');
    socialOrbs.forEach((orb) => {
      orb.addEventListener('mouseenter', () => {
        gsap.to(orb, {
          scale: 1.2,
          boxShadow: '0 0 20px rgba(255, 111, 125, 0.7)',
          duration: 0.3,
          ease: 'power3.out',
        });
        gsap.to(orb.querySelector('.ripple'), {
          scale: 2,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          onComplete: () => {
            gsap.set(orb.querySelector('.ripple'), { scale: 0, opacity: 1 });
          },
        });
      });

      orb.addEventListener('mouseleave', () => {
        gsap.to(orb, {
          scale: 1,
          boxShadow: '0 0 8px rgba(255, 111, 125, 0.3)',
          duration: 0.3,
          ease: 'power3.out',
        });
      });
    });

    // Particle effect for footer background
    const footerCanvas = particleCanvasRef.current;
    const footerCtx = footerCanvas.getContext('2d');
    footerCanvas.width = window.innerWidth;
    footerCanvas.height = footerRef.current.offsetHeight;
    const footerParticlesArray = [];
    const particleCount = 20;

    class FooterParticle {
      constructor() {
        this.x = Math.random() * footerCanvas.width;
        this.y = Math.random() * footerCanvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.life = Math.random() * 60 + 60;
        this.opacity = 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
        this.opacity = this.life / 120;
        if (this.life <= 0) {
          this.x = Math.random() * footerCanvas.width;
          this.y = Math.random() * footerCanvas.height;
          this.life = Math.random() * 60 + 60;
          this.opacity = 1;
        }
      }

      draw() {
        footerCtx.fillStyle = `rgba(106, 219, 214, ${this.opacity})`; // teal-500
        footerCtx.beginPath();
        footerCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        footerCtx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      footerParticlesArray.push(new FooterParticle());
    }

    const animateFooterParticles = () => {
      footerCtx.clearRect(0, 0, footerCanvas.width, footerCanvas.height);
      footerParticlesArray.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animateFooterParticles);
    };
    animateFooterParticles();

    const handleResize = () => {
      footerCanvas.width = window.innerWidth;
      footerCanvas.height = footerRef.current.offsetHeight;
      resizeCanvas();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (window.backToTopParticleAnimation) {
        cancelAnimationFrame(window.backToTopParticleAnimation);
        window.backToTopParticleAnimation = null;
      }
    };
  }, []);

  const socialProfiles = [
    {
      name: 'GitHub',
      url: 'https://github.com/username',
      icon: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/username',
      icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/username',
      icon: 'M23.643 4.937c-.835.37-1.732.62-2.675.733a4.67 4.67 0 0 0 2.048-2.578 9.3 9.3 0 0 1-2.958 1.13 4.66 4.66 0 0 0-7.938 4.25 13.229 13.229 0 0 1-9.602-4.868 4.66 4.66 0 0 0 1.442 6.22 4.647 4.647 0 0 1-2.11-.583v.06a4.66 4.66 0 0 0 3.737 4.568 4.692 4.692 0 0 1-2.104.08 4.661 4.661 0 0 0 4.352 3.234 9.348 9.348 0 0 1-5.786 1.995c-.376 0-.747-.022-1.112-.065a13.175 13.175 0 0 0 7.14 2.093c8.57 0 13.255-7.098 13.255-13.254 0-.202-.005-.403-.014-.604a9.463 9.463 0 0 0 2.325-2.411z',
    },
  ];

  return (
    <footer ref={footerRef} className="relative py-8 overflow-hidden bg-cream">
      <canvas ref={particleCanvasRef} className="absolute inset-0 pointer-events-none opacity-15"></canvas>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Roboto+Mono:wght@400;500&display=swap');

          .bg-cream {
            background-color: #FFF8F0;
          }
          .text-indigo {
            color: #2A2E4D;
          }
          .text-coral-600 {
            color: #FF6F7D;
          }
          .bg-teal-500 {
            background-color: #6ADBD6;
          }
          .font-orbitron {
            font-family: 'Orbitron', sans-serif;
          }
          .font-roboto-mono {
            font-family: 'Roboto Mono', monospace;
          }

          /* Footer Social Orbs */
          .footer-social-orb {
            position: relative;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 0 8px rgba(255, 111, 125, 0.3);
            transition: none;
          }
          .footer-social-icon {
            fill: #2A2E4D;
            transition: fill 0.3s ease;
          }
          .footer-social-orb:hover .footer-social-icon {
            fill: #FF6F7D;
          }
          .ripple {
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(106, 219, 214, 0.4);
            transform: scale(0);
            opacity: 1;
          }

          /* Back to Top Button (Styled like Send Message) */
          .contact-button {
            position: relative;
            background: #220234;
            color: white;
            box-shadow: 0 0 15px rgba(106, 219, 214, 0.4);
            overflow: hidden;
            font-size: 1.1rem;
            padding: 1rem 2rem;
            border-radius: 0.75rem;
            font-family: 'Roboto Mono', monospace;
          }
          .particle-canvas {
            position: absolute;
            top: 0;
            left: 0;
            pointer-events: none;
          }

          @media (max-width: 768px) {
            .footer-social-orb {
              width: 2.5rem;
              height: 2.5rem;
            }
            .footer-social-icon {
              width: 1.25rem;
              height: 1.25rem;
            }
            .contact-button {
              padding: 0.75rem 1.5rem;
              font-size: 1rem;
            }
          }
        `}
      </style>

      <div className="container flex flex-col items-center gap-6 px-4 mx-auto sm:px-6 lg:px-8">
        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-4">
          {socialProfiles.map((profile, index) => (
            <a
              key={index}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center w-12 h-12 rounded-full footer-social-orb"
              aria-label={`Visit my ${profile.name} profile`}
            >
              <div className="ripple"></div>
              <svg className="w-6 h-6 footer-social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d={profile.icon} />
              </svg>
            </a>
          ))}
        </div>

        {/* Back to Top Button */}
        <button
          ref={backToTopButtonRef}
          className="contact-button"
          aria-label="Back to Top"
        >
          Back to Top
          <canvas ref={backToTopParticleCanvasRef} className="particle-canvas"></canvas>
        </button>

        {/* Copyright Notice */}
        <p className="text-sm text-indigo font-roboto-mono">
          © 2025 Nipam Parmar. 
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;