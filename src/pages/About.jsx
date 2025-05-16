import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Tilt from 'react-parallax-tilt';

gsap.registerPlugin(ScrollTrigger, SplitText);

const About = () => {
  const aboutRef = useRef(null);
  const bioSectionRef = useRef(null);
  const headingRef = useRef(null);
  const bioRef = useRef(null);
  const skillsSectionRef = useRef(null);
  const skillsRef = useRef(null);
  const journeySectionRef = useRef(null);
  const timelineRef = useRef(null);
  const particleRef = useRef(null);
  const svgRef = useRef(null);
  const trailRef = useRef(null);
  const timelineLineRef = useRef(null);

  useEffect(() => {
    // Split text for staggered animation
    const splitHeading = new SplitText(headingRef.current, { type: 'chars, words' });
    const splitBio = new SplitText(bioRef.current, { type: 'chars, words' });

    const bioTl = gsap.timeline({
      scrollTrigger: { trigger: bioSectionRef.current, start: 'top 80%' },
    });

    // Staggered heading animation
    bioTl.fromTo(
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

    // Staggered bio text animation
    bioTl.fromTo(
      splitBio.chars,
      { opacity: 0, x: 10 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.015,
        ease: 'power3.out',
      },
      '-=0.3'
    );

    // Bio underline animation
    bioTl.fromTo(
      '.bio-underline',
      { scaleX: 0, transformOrigin: 'left' },
      { scaleX: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.2'
    );

    // Skills section animation
    const skillsTl = gsap.timeline({
      scrollTrigger: { trigger: skillsSectionRef.current, start: 'top 80%' },
    });

    skillsTl.fromTo(
      skillsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
    );

    skillsTl.fromTo(
      '.skill-badge',
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

    // Journey section animation
    const journeyTl = gsap.timeline({
      scrollTrigger: { trigger: journeySectionRef.current, start: 'top 80%' },
    });

    journeyTl.fromTo(
      timelineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
    );

    // Animate the timeline line with a glow effect
    journeyTl.fromTo(
      timelineLineRef.current,
      { height: '0%' },
      { height: '100%', duration: 1.5, ease: 'power3.out' },
      '-=0.4'
    );

    gsap.to('.timeline-line-glow', {
      opacity: 0.5,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      scrollTrigger: { trigger: journeySectionRef.current, start: 'top 80%' },
    });

    // Animate timeline entries
    gsap.utils.toArray('.timeline-entry').forEach((entry, index) => {
      const isLeft = index % 2 === 0;
      const titleElement = entry.querySelector('.timeline-title');
      const institutionElement = entry.querySelector('.timeline-institution');
      const descriptionElement = entry.querySelector('.timeline-description');

      // Animate the entry container
      journeyTl.fromTo(
        entry,
        { opacity: 0, x: isLeft ? -80 : 80, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
        },
        `-=${0.5 - index * 0.1}`
      );

      // Animate the marker with a pulse effect
      journeyTl.fromTo(
        entry.querySelector('.timeline-marker'),
        { scale: 0 },
        {
          scale: 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
        },
        '-=0.6'
      );

      gsap.to(entry.querySelector('.timeline-marker'), {
        scale: 1.2,
        opacity: 0.7,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        scrollTrigger: { trigger: entry, start: 'top 80%' },
      });

      // Fade in the title, institution, and description
      journeyTl.fromTo(
        [titleElement, institutionElement, descriptionElement],
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.4'
      );
    });

    // SVG background parallax
    gsap.to(svgRef.current, {
      y: 50,
      scrollTrigger: {
        trigger: aboutRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Background SVG elements parallax for Journey section
    gsap.to('.timeline-bg-shape', {
      y: -100,
      scrollTrigger: {
        trigger: journeySectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
    });

    // Particle background for the entire section
    const canvas = particleRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = canvas.parentElement.offsetHeight;
    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.fillStyle = '#FF6F7D';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animateParticles);
    };
    animateParticles();

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

    // Hover effects for skill badges and timeline entries
    gsap.utils.toArray('.skill-badge').forEach((badge) => {
      gsap.set(badge, { transformOrigin: 'center' });
      badge.addEventListener('mouseenter', () => {
        gsap.to(badge, {
          scale: 1.08,
          boxShadow: '0 8px 20px rgba(255, 111, 125, 0.4)',
          duration: 0.3,
          ease: 'power3.out',
        });
      });
      badge.addEventListener('mouseleave', () => {
        gsap.to(badge, {
          scale: 1,
          boxShadow: '0 4px 12px rgba(106, 219, 214, 0.3)',
          duration: 0.3,
          ease: 'power3.out',
        });
      });
    });

    gsap.utils.toArray('.timeline-content').forEach((content) => {
      gsap.set(content, { transformOrigin: 'center' });
      content.addEventListener('mouseenter', () => {
        gsap.to(content, {
          scale: 1.03,
          boxShadow: '0 8px 20px rgba(255, 111, 125, 0.5)',
          borderColor: '#FF6F7D',
          duration: 0.3,
          ease: 'power3.out',
        });
      });
      content.addEventListener('mouseleave', () => {
        gsap.to(content, {
          scale: 1,
          boxShadow: '0 4px 8px rgba(255, 111, 125, 0.2)',
          borderColor: 'rgba(255, 111, 125, 0.3)',
          duration: 0.3,
          ease: 'power3.out',
        });
      });
    });

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      splitHeading.revert();
      splitBio.revert();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', updateTrail);
      gsap.utils.toArray('.skill-badge').forEach((badge) => {
        badge.removeEventListener('mouseenter', () => {});
        badge.removeEventListener('mouseleave', () => {});
      });
      gsap.utils.toArray('.timeline-content').forEach((content) => {
        content.removeEventListener('mouseenter', () => {});
        content.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  const skills = [
    { name: 'React', level: 90, description: 'Building dynamic UIs with React and modern JavaScript.' },
    { name: 'JavaScript', level: 88, description: 'Proficient in ES6+ for web development.' },
    { name: 'Python', level: 92, description: 'Expert in Python for data science and ML.' },
    { name: 'TensorFlow', level: 85, description: 'Developing ML models with TensorFlow.' },
    { name: 'Data Analysis', level: 87, description: 'Extracting insights with pandas and numpy.' },
    { name: 'Machine Learning', level: 90, description: 'Building predictive models and neural networks.' },
    { name: 'Tailwind CSS', level: 80, description: 'Crafting responsive designs with Tailwind.' },
    { name: 'Node.js', level: 82, description: 'Creating server-side applications with Node.js.' },
    { name: 'SQL', level: 85, description: 'Managing and querying databases with SQL.' },
    { name: 'Git', level: 88, description: 'Version control and collaboration with Git.' },
  ];

  const journey = [
    {
      title: 'The NASA Space Apps Challenge',
      institution: 'Nirma University',
      period: 'December 2024',
      description: 'Pursuing specialized coursework in Machine Learning focused on building intelligent and adaptive applications.',
    },
    {
      title: 'Machine Learning Workshop',
      institution: 'TechFest IIT-Bombay & AWS',
      period: 'December 2024',
      description: 'Pursuing specialized coursework in Machine Learning focused on building intelligent and adaptive applications.',
    },
    {
      title: 'ZenFlow – Mindfulness & Well-being Platform',
      institution: 'Intra-College Hackathon, IITRAM',
      period: '2025',
      description: 'Developed an all-in-one mindfulness app featuring guided meditations, habit tracking, and community support; secured 2nd Runner-Up position.',
    },
    {
      title: 'Participant, 5-Day National Hands-on Workshop on Healthcare Infrastructure Using AI and Sensor Technology',
      institution: 'IITRAM (with GSBTM, DST Gujarat, and SSIP)',
      period: 'April 2025',
      description: 'Gained practical experience in applying AI and sensor technologies to healthcare infrastructure through an intensive national workshop.',
    },
  ];

  return (
    <motion.section
      id="about"
      ref={aboutRef}
      className="relative min-h-screen py-16 overflow-hidden bg-cream"
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
      <canvas ref={particleRef} className="absolute inset-0 pointer-events-none opacity-15"></canvas>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500&display=swap');

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
          .bg-coral-600 {
            background-color: #FF6F7D;
          }
          .hover\\:bg-coral-700:hover {
            background-color: #E55F6C;
          }
          .border-coral-600 {
            border-color: #FF6F7D;
          }
          .ring-coral-400 {
            --tw-ring-color: #FF9DA7;
          }
          .font-poppins {
            font-family: 'Poppins', sans-serif;
          }
          .font-inter {
            font-family: 'Inter', sans-serif;
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
          .skill-badge {
            background: linear-gradient(145deg, #6ADBD6, #5ACBC6);
            border: 1px solid rgba(255, 111, 125, 0.3);
            box-shadow: 0 4px 12px rgba(106, 219, 214, 0.3);
            border-radius: 9999px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          .skill-badge::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
              to right,
              rgba(255, 255, 255, 0),
              rgba(255, 255, 255, 0.3),
              rgba(255, 255, 255, 0)
            );
            transform: rotate(45deg);
            transition: transform 0.5s ease;
          }
          .skill-badge:hover::before {
            transform: translateX(100%) rotate(45deg);
          }
          .tooltip {
            position: absolute;
            background: #2A2E4D;
            color: #FFF8F0;
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 0.875rem;
            max-width: 200px;
            transform: translateY(10px);
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.3s ease;
            z-index: 10;
            font-family: 'Inter', sans-serif;
          }
          .skill-badge:hover .tooltip {
            opacity: 1;
            transform: translateY(0);
          }
          .section-divider {
            background: linear-gradient(to right, transparent, #FF6F7D, transparent);
            height: 2px;
            margin: 3rem 0;
          }
          .bio-underline {
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #FF6F7D;
            transform-origin: left;
          }
          .skills-heading, .journey-heading {
            text-shadow: 0 2px 4px rgba(42, 46, 77, 0.1);
          }
          .timeline-container {
            position: relative;
            max-width: 900px;
            margin: 0 auto;
            padding: 40px 0;
            z-index: 1;
          }
          .timeline-bg {
            position: absolute;
            inset: 0;
            pointer-events: none;
            opacity: 0.1;
            z-index: -1;
          }
          .timeline-bg-shape {
            fill: none;
            stroke: #6ADBD6;
            stroke-width: 2;
          }
          .timeline-line {
            position: absolute;
            left: 50%;
            top: 0;
            width: 6px;
            background: linear-gradient(to bottom, #FF6F7D, #6ADBD6);
            transform: translateX(-50%);
            height: 100%;
            box-shadow: 0 0 15px rgba(255, 111, 125, 0.5);
          }
          .timeline-line-glow {
            position: absolute;
            left: 50%;
            top: 0;
            width: 10px;
            background: radial-gradient(circle, rgba(255, 111, 125, 0.8), transparent);
            transform: translateX(-50%);
            height: 100%;
            opacity: 0;
          }
          .timeline-entry {
            display: flex;
            align-items: center;
            position: relative;
            margin: 60px 0;
          }
          .timeline-content {
            background: rgba(255, 248, 240, 0.7);
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 111, 125, 0.3);
            border-radius: 12px;
            padding: 25px;
            width: 45%;
            box-shadow: 0 4px 8px rgba(255, 111, 125, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
            position: relative;
            overflow: visible;
          }
          .timeline-content::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
            z-index: -1;
          }
          .timeline-entry:nth-child(odd) .timeline-content {
            margin-right: auto;
            margin-left: 0;
          }
          .timeline-entry:nth-child(even) .timeline-content {
            margin-left: auto;
            margin-right: 0;
          }
          .timeline-marker {
            position: absolute;
            left: 50%;
            width: 24px;
            height: 24px;
            background: #FF6F7D;
            border: 4px solid #FFF8F0;
            border-radius: 50%;
            transform: translateX(-50%);
            z-index: 1;
            box-shadow: 0 0 10px rgba(255, 111, 125, 0.7);
          }
          .timeline-entry:nth-child(odd)::after,
          .timeline-entry:nth-child(even)::before {
            content: '';
            position: absolute;
            top: 50%;
            width: 0;
            height: 0;
            border: 10px solid transparent;
          }
          .timeline-entry:nth-child(odd)::after {
            right: calc(50% - 24px);
            border-left-color: rgba(255, 248, 240, 0.7);
          }
          .timeline-entry:nth-child(even)::before {
            left: calc(50% - 24px);
            border-right-color: rgba(255, 248, 240, 0.7);
          }
          @media (max-width: 768px) {
            .timeline-line, .timeline-line-glow {
              left: 30px;
            }
            .timeline-content {
              width: 70%;
              margin-left: 60px !important;
              margin-right: 0 !important;
            }
            .timeline-marker {
              left: 30px;
            }
            .timeline-entry:nth-child(odd)::after,
            .timeline-entry:nth-child(even)::before {
              left: 44px;
              border-right-color: rgba(255, 248, 240, 0.7);
              border-left-color: transparent;
            }
          }
        `}
      </style>

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Bio Section */}
        <div ref={bioSectionRef} className="text-center">
          <h2
            ref={headingRef}
            className="text-3xl font-extrabold text-indigo sm:text-4xl md:text-5xl lg:text-6xl font-poppins hero-heading"
          >
            About <span className="text-coral-600">Me</span>
          </h2>
          <div className="relative max-w-3xl mx-auto mt-6">
            <p
              ref={bioRef}
              className="text-sm text-indigo sm:text-base md:text-lg font-inter"
            >
              I'm Nipam Parmar, a passionate data scientist and frontend developer dedicated to solving complex problems with data-driven insights and elegant code. My expertise spans machine learning, deep learning, and modern web development, fueled by a relentless curiosity and a drive to innovate.
            </p>
            <span className="bio-underline"></span>
          </div>
        </div>

        <div className="section-divider"></div>

        {/* Skills Section */}
        <div ref={skillsSectionRef} className="mt-12 text-center">
          <h3 ref={skillsRef} className="text-xl font-semibold text-indigo sm:text-2xl md:text-3xl font-poppins skills-heading">
            Skills
          </h3>
          <div className="mt-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {skills.map((skill) => (
                <Tilt key={skill.name} options={{ max: 15, scale: 1.02, speed: 300 }}>
                  <div
                    className="relative px-4 py-2 text-sm font-semibold rounded-full skill-badge text-indigo"
                  >
                    {skill.name}
                  </div>
                </Tilt>
              ))}
            </div>
          </div>
        </div>

        <div className="section-divider"></div>

        {/* Journey Section */}
        <div ref={journeySectionRef} className="mt-12 text-center">
          <h3 ref={timelineRef} className="text-xl font-semibold text-indigo sm:text-2xl md:text-3xl font-poppins journey-heading">
            Journey
          </h3>
          <div className="mt-6 timeline-container">
            <div className="timeline-bg">
              <svg viewBox="0 0 400 800" className="w-full h-full timeline-bg-shape">
                <path
                  d="M100,100 Q150,50 200,100 T300,100"
                  strokeDasharray="5,5"
                  className="timeline-bg-shape"
                />
                <circle cx="120" cy="200" r="8" fill="#FF6F7D" className="timeline-bg-shape" />
                <circle cx="280" cy="300" r="6" fill="#6ADBD6" className="timeline-bg-shape" />
                <path
                  d="M50,400 Q100,350 150,400 T250,400"
                  strokeDasharray="3,3"
                  className="timeline-bg-shape"
                />
                <circle cx="320" cy="500" r="10" fill="#FF6F7D" className="timeline-bg-shape" />
              </svg>
            </div>
            <div className="timeline-line" ref={timelineLineRef}></div>
            <div className="timeline-line-glow"></div>
            {journey.map((entry, index) => (
              <div key={index} className="timeline-entry">
                <div className="timeline-marker"></div>
                <Tilt options={{ max: 25, scale: 1.05, speed: 400 }}>
                  <div className="timeline-content">
                    <h4 className="text-lg font-semibold text-indigo font-poppins timeline-title">
                      {entry.title}
                    </h4>
                    <p className="text-sm text-indigo font-inter timeline-institution">
                      {entry.institution}, {entry.period}
                    </p>
                    <p className="mt-2 text-base text-indigo font-inter timeline-description">
                      {entry.description}
                    </p>
                  </div>
                </Tilt>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;