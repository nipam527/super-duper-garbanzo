import { useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import profile from '../assets/Nipam_profile.jpg';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hero = () => {
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const taglineRef = useRef(null);
  const contactButtonRef = useRef(null);
  const resumeButtonRef = useRef(null);
  const imageRef = useRef(null);
  const svgRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    // Split text for staggered animation
    const splitHeading = new SplitText(headingRef.current, { type: 'chars, words' });
    const splitTagline = new SplitText(taglineRef.current, { type: 'chars, words' });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: heroRef.current, start: 'top 80%' },
    });

    // Staggered heading animation
    tl.fromTo(
      splitHeading.chars,
      { opacity: 0, y: 20, rotateX: -10 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.6,
        stagger: 0.02,
        ease: 'power3.out',
      }
    );

    // Typed text fade-in
    tl.fromTo(
      '.hero-typed',
      { opacity: 0, scale: 0.95, color: '#FF6F7D' },
      { opacity: 1, scale: 1, color: '#6ADBD6', duration: 0.5, ease: 'power3.out' },
      '-=0.3'
    );

    // Staggered tagline animation
    tl.fromTo(
      splitTagline.chars,
      { opacity: 0, x: 10 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.015,
        ease: 'power3.out',
      },
      '-=0.2'
    );

    // Tagline underline
    tl.fromTo(
      '.tagline-underline',
      { scaleX: 0, transformOrigin: 'left' },
      { scaleX: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.2'
    );

    // CTA buttons bounce
    tl.fromTo(
      '.cta-button',
      { opacity: 0, y: 20, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.2)',
      },
      '-=0.3'
    );

    // Image animation
    tl.fromTo(
      '.hero-image',
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    );

    // SVG background parallax
    gsap.to(svgRef.current, {
      y: 50,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Image pulse
    gsap.to('.hero-image-container::before', {
      scale: 1.05,
      opacity: 0.8,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Mouse trail effect
    const trail = trailRef.current;
    let trailDots = [];
    const maxDots = 10;

    const updateTrail = (e) => {
      const dot = document.createElement('div');
      dot.className = 'trail-dot';
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      trail.appendChild(dot);
      trailDots.push(dot);

      gsap.to(dot, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
          dot.remove();
          trailDots = trailDots.filter((d) => d !== dot);
        },
      });

      if (trailDots.length > maxDots) {
        const oldDot = trailDots.shift();
        oldDot.remove();
      }
    };

    window.addEventListener('mousemove', updateTrail);

    // Hover effects
    const image = imageRef.current;
    image.addEventListener('mouseenter', () =>
      gsap.to(image, { scale: 1.1, duration: 0.4, ease: 'power3.out' })
    );
    image.addEventListener('mouseleave', () =>
      gsap.to(image, { scale: 1, duration: 0.4, ease: 'power3.out' })
    );

    [contactButtonRef.current, resumeButtonRef.current].forEach((button) => {
      if (button) {
        gsap.set(button, { transformOrigin: 'center' });
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.08,
            boxShadow: '0 8px 20px rgba(255, 111, 125, 0.4)',
            duration: 0.3,
            ease: 'power3.out',
          });
        });
        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            boxShadow: '0 4px 8px rgba(255, 111, 125, 0.2)',
            duration: 0.3,
            ease: 'power3.out',
          });
        });
      }
    });

    // Cleanup
    return () => {
      splitHeading.revert();
      splitTagline.revert();
      window.removeEventListener('mousemove', updateTrail);
      image.removeEventListener('mouseenter', () => {});
      image.removeEventListener('mouseleave', () => {});
      [contactButtonRef.current, resumeButtonRef.current].forEach((button) => {
        if (button) {
          button.removeEventListener('mouseenter', () => {});
          button.removeEventListener('mouseleave', () => {});
        }
      });
    };
  }, []);

  return (
    <motion.section
      id="home"
      ref={heroRef}
      className="relative flex items-center justify-center min-h-screen py-16 overflow-hidden bg-cream"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 opacity-10" ref={svgRef}>
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            d="M50,50 C60,70 80,70 90,50 C100,30 120,30 130,50 C140,70 160,70 170,50"
            fill="none"
            stroke="#6ADBD6"
            strokeWidth="2"
          />
          <circle cx="50" cy="50" r="5" fill="#6ADBD6" />
          <circle cx="90" cy="50" r="5" fill="#6ADBD6" />
          <circle cx="130" cy="50" r="5" fill="#6ADBD6" />
          <circle cx="170" cy="50" r="5" fill="#6ADBD6" />
        </svg>
      </div>

      <div className="absolute inset-0 pointer-events-none" ref={trailRef}></div>

      <style>
        {`
          .bg-cream {
            background-color: #FFF8F0;
          }
          .bg-coral-600 {
            background-color: #FF6F7D;
          }
          .hover\\:bg-coral-700:hover {
            background-color: #E55F6C;
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
          .border-coral-600 {
            border-color: #FF6F7D;
          }
          .ring-coral-400 {
            --tw-ring-color: #FF9DA7;
          }
          .trail-dot {
            position: fixed;
            width: 6px;
            height: 6px;
            background: #FF6F7D;
            border-radius: 50%;
            pointer-events: none;
            z-index: 10;
          }
          .hero-image-container::before {
            content: '';
            position: absolute;
            inset: -4px;
            border-radius: 50%;
            background: linear-gradient(45deg, #FF6F7D, #6ADBD6);
            filter: blur(8px);
            opacity: 0.6;
            animation: rotateBorder 8s linear infinite;
            z-index: -1;
          }
          @keyframes rotateBorder {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .tagline-underline {
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #FF6F7D;
            transform-origin: left;
          }
          .hero-heading {
            text-shadow: 0 2px 4px rgba(42, 46, 77, 0.1);
          }
        `}
      </style>

      <div className="z-10 flex flex-col items-center gap-8 px-4 mx-auto max-w-7xl sm:gap-10 sm:px-6 lg:px-8 md:flex-row">
        <div className="w-full text-center md:w-3/5 md:text-left">
          <h1
            ref={headingRef}
            className="text-3xl font-extrabold text-indigo hero-heading sm:text-4xl md:text-5xl lg:text-6xl font-inter"
          >
            Hi, I’m <span className="text-coral-600">Nipam Parmar</span>
          </h1>

          <div className="mt-4 text-base font-semibold text-teal-700 hero-typed sm:text-lg md:text-xl lg:text-2xl font-inter">
            <TypeAnimation
              sequence={[
                'Aspiring Data Scientist 📊',
                2000,
                'Machine Learning Enthusiast 🤖',
                2000,
                'Deep Learning Explorer 🧠',
                2000,
                'Frontend Developer 🧩',
                2000,
                'Tech Innovator 🚀',
                2000,
                'Innovative Problem Solver 💡',
                2000,
                'Analytical Thinker 🔍'
                ,2000,
              ]}
              speed={30}
              repeat={Infinity}
              wrapper="span"
            />
          </div>

          <div className="relative mt-6">
            <p
              ref={taglineRef}
              className="text-sm text-indigo description-line sm:text-base md:text-lg font-inter"
            >
              Building thoughtful solutions with clean code and clear vision.
            </p>
            <span className="tagline-underline"></span>
          </div>

          <div className="flex flex-col items-center gap-4 mt-6 sm:mt-8 cta-button sm:flex-row md:items-start">
            <a
              href="#contact-us"
              ref={contactButtonRef}
              className="inline-block px-6 py-3 text-base font-semibold text-white bg-coral-600 rounded-full sm:px-8 sm:py-3.5 sm:text-lg font-inter hover:bg-coral-900 focus:outline-none focus:ring-2 focus:ring-coral-400 focus:ring-offset-2 "
              aria-label="Contact Nipam Parmar"
            
            >
              Contact Me
            </a>
            
          </div>
        </div>

        <div className="relative flex justify-center mt-6 md:mt-0 md:w-2/5">
          <div className="relative hero-image-container">
            <img
              ref={imageRef}
              src={profile}
              alt="Nipam Parmar, Data Scientist and Machine Learning Expert"
              className="object-cover w-48 h-48 border-4 rounded-full border-coral-600 hero-image sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;