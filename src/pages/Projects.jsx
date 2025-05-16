import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Tilt from 'react-parallax-tilt';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Projects = () => {
  const projectsSectionRef = useRef(null);
  const projectsHeadingRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    const loadFontsAndAnimate = async () => {
      try {
        // Wait for fonts to load
        await document.fonts.ready;
        console.log('Fonts loaded, running animations in Projects.jsx');

        // Wait for project cards to be rendered
        const waitForProjectCards = () => {
          return new Promise((resolve) => {
            const checkCards = () => {
              const cards = gsap.utils.toArray('.project-card');
              if (cards.length > 0 && cards.every(card => card.querySelector('.card-front') && card.querySelector('.card-back'))) {
                resolve(cards);
              } else {
                setTimeout(checkCards, 100); // Retry every 100ms
              }
            };
            checkCards();
          });
        };

        const projectCards = await waitForProjectCards();

        // Split text for heading animation
        const splitHeading = new SplitText(projectsHeadingRef.current, { type: 'chars, words' });

        const projectsTl = gsap.timeline({
          scrollTrigger: { trigger: projectsSectionRef.current, start: 'top 80%' },
        });

        // Staggered heading animation
        projectsTl.fromTo(
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

        // Animate project cards with 3D flip and glow
        projectCards.forEach((card, index) => {
          const front = card.querySelector('.card-front');
          const back = card.querySelector('.card-back');

          // Ensure front and back elements exist
          if (!front || !back) {
            console.warn(`Project card ${index} is missing front or back elements. Skipping animation.`);
            return;
          }

          const titleElement = front.querySelector('.project-title');
          const descriptionElement = back.querySelector('.project-description');

          if (!titleElement || !descriptionElement) {
            console.warn(`Project card ${index} is missing title or description elements. Skipping animation.`);
            return;
          }

          const splitTitle = new SplitText(titleElement, { type: 'chars' });
          const splitDescription = new SplitText(descriptionElement, { type: 'chars' });

          projectsTl.fromTo(
            card,
            { opacity: 0, y: 50, rotateX: 30 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.8,
              ease: 'power4.out',
            },
            `-=${0.5 - index * 0.15}`
          );

          // Typewriter effect for title
          projectsTl.fromTo(
            splitTitle.chars,
            { opacity: 0, textShadow: '0 0 0 rgba(255, 111, 125, 0)' },
            {
              opacity: 1,
              textShadow: '0 0 10px rgba(255, 111, 125, 0.7)',
              duration: 0.04,
              stagger: 0.03,
              ease: 'power1.in',
            },
            '-=0.5'
          );

          // 3D flip effect on hover
          card.addEventListener('mouseenter', () => {
            gsap.to(front, {
              rotateY: -180,
              duration: 0.6,
              ease: 'power3.out',
            });
            gsap.to(back, {
              rotateY: 0,
              duration: 0.6,
              ease: 'power3.out',
            });
            gsap.to(card, {
              scale: 1.05,
              boxShadow: '0 10px 25px rgba(255, 111, 125, 0.6)',
              borderColor: '#FF6F7D',
              filter: 'brightness(1.2) drop-shadow(0 0 15px rgba(106, 219, 214, 0.5))',
              duration: 0.4,
              ease: 'power3.out',
            });
            gsap.to(card.querySelector('.holo-sheen'), {
              x: '100%',
              duration: 0.8,
              ease: 'power2.out',
            });
            // Typewriter effect for description on flip
            gsap.fromTo(
              splitDescription.chars,
              { opacity: 0, textShadow: '0 0 0 rgba(106, 219, 214, 0)' },
              {
                opacity: 1,
                textShadow: '0 0 8px rgba(106, 219, 214, 0.5)',
                duration: 0.03,
                stagger: 0.02,
                ease: 'power1.in',
              }
            );
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(front, {
              rotateY: 0,
              duration: 0.6,
              ease: 'power3.out',
            });
            gsap.to(back, {
              rotateY: 180,
              duration: 0.6,
              ease: 'power3.out',
            });
            gsap.to(card, {
              scale: 1,
              boxShadow: '0 4px 8px rgba(255, 111, 125, 0.2)',
              borderColor: 'rgba(255, 111, 125, 0.3)',
              filter: 'brightness(1) drop-shadow(0 0 0 rgba(106, 219, 214, 0))',
              duration: 0.4,
              ease: 'power3.out',
            });
            gsap.to(card.querySelector('.holo-sheen'), {
              x: '-100%',
              duration: 0,
            });
          });

          // Glow trail effect on card hover
          const glowTrail = document.createElement('div');
          glowTrail.className = 'glow-trail';
          card.appendChild(glowTrail);

          card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            gsap.to(glowTrail, {
              left: x,
              top: y,
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out',
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(glowTrail, {
              opacity: 0,
              duration: 0.3,
              ease: 'power2.out',
            });
          });

          // Animate GitHub link icon on hover
          const githubLink = card.querySelector('.github-link');
          if (githubLink) {
            card.addEventListener('mouseenter', () => {
              gsap.to(githubLink, {
                scale: 1.2,
                opacity: 1,
                duration: 0.3,
                ease: 'power3.out',
              });
            });
            card.addEventListener('mouseleave', () => {
              gsap.to(githubLink, {
                scale: 1,
                opacity: 0.7,
                duration: 0.3,
                ease: 'power3.out',
              });
            });
          }
        });

        // Background parallax for Projects section
        gsap.to('.projects-bg-shape-1', {
          y: -120,
          scrollTrigger: {
            trigger: projectsSectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });

        gsap.to('.projects-bg-shape-2', {
          y: -60,
          scrollTrigger: {
            trigger: projectsSectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 3,
          },
        });

        // Particle system for Projects section
        const canvas = particleCanvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = projectsSectionRef.current.offsetHeight;
        const particles = [];
        const particleCount = 40;

        class Particle {
          constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.life = Math.random() * 60 + 60;
            this.opacity = 1;
          }
          update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life--;
            this.opacity = this.life / 120;
            if (this.life <= 0) {
              this.x = Math.random() * canvas.width;
              this.y = Math.random() * canvas.height;
              this.life = Math.random() * 60 + 60;
              this.opacity = 1;
            }
          }
          draw() {
            ctx.fillStyle = `rgba(106, 219, 214, ${this.opacity})`;
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

        const handleResize = () => {
          canvas.width = window.innerWidth;
          canvas.height = projectsSectionRef.current.offsetHeight;
        };
        window.addEventListener('resize', handleResize);
      } catch (error) {
        console.error('Error during animation setup in Projects.jsx:', error);
      }
    };

    loadFontsAndAnimate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', () => {});
      window.removeEventListener('mousemove', () => {});
      gsap.utils.toArray('.project-card').forEach((card) => {
        card.removeEventListener('mouseenter', () => {});
        card.removeEventListener('mouseleave', () => {});
        card.removeEventListener('mousemove', () => {});
        const front = card.querySelector('.card-front');
        const back = card.querySelector('.card-back');
        if (front && back) {
          const splitTitle = new SplitText(front.querySelector('.project-title'), { type: 'chars' });
          const splitDescription = new SplitText(back.querySelector('.project-description'), { type: 'chars' });
          splitTitle.revert();
          splitDescription.revert();
        }
      });
      const splitHeading = new SplitText(projectsHeadingRef.current, { type: 'chars, words' });
      splitHeading.revert();
    };
  }, []);

  const projects = [
    {
      title: 'ZenFlow – Mindfulness & Well-being Platform',
      period: '2025',
      description: 'Developed an all-in-one mindfulness app featuring guided meditations, habit tracking, time management challenges, and community support. Achieved 2nd Runner-Up in intra-college hackathon.',
      technologies: ['React.js', 'Tailwind CSS', 'Express', 'Node.js', 'MongoDB'],
      githubLink: 'https://github.com/nipam527/ZenFlow',
    },
    {
      title: 'QuizNix – Interactive Quiz Platform',
      period: '2024',
      description: 'Built a secure, animated quiz platform with user authentication, room & question management, real-time quiz participation, and results tracking. Designed with a distinctive yellow-and-black theme for engaging user experience.',
      technologies: ['Express.js', 'MongoDB', 'Mongoose', 'JWT', 'React', 'React Router', 'Axios', 'Framer Motion', 'Tailwind CSS'],
      githubLink: 'https://github.com/username/quiznix', // replace with actual link
    },
    {
      title: ' Interactive Learning Dashboard',
      period: 'May 2025',
      description: 'Dashboard for an e-learning platform where students can track progress, engage in interactive quizzes, and receive AI-driven recommendations for courses.',
      technologies: ['Next.js','Tailwindcss'],
      githubLink: 'https://github.com/nipam527/PixelForge',
    },
  ];

  return (
    <motion.section
      id="projects"
      ref={projectsSectionRef}
      className="relative min-h-screen py-16 overflow-hidden bg-cream"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 pointer-events-none" ref={trailRef}></div>
      <canvas ref={particleCanvasRef} className="absolute inset-0 pointer-events-none opacity-15"></canvas>

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
          .projects-container {
            position: relative;
            max-width: 1000px;
            margin: 0 auto;
            padding: 50px 0;
            z-index: 1;
          }
          .projects-bg {
            position: absolute;
            inset: 0;
            pointer-events: none;
            opacity: 0.08;
            z-index: -1;
          }
          .projects-bg-shape-1, .projects-bg-shape-2 {
            fill: none;
            stroke: #6ADBD6;
            stroke-width: 2;
          }
          .projects-bg-shape-2 {
            stroke: #FF6F7D;
            stroke-dasharray: 8, 8;
          }
          .project-card {
            position: relative;
            width: 100%;
            height: 300px;
            margin: 40px 0;
            perspective: 1000px;
            background: rgba(255, 248, 240, 0.6);
            backdrop-filter: blur(12px);
            border: 2px solid rgba(255, 111, 125, 0.3);
            border-radius: 16px;
            box-shadow: 0 4px 8px rgba(255, 111, 125, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, filter 0.3s ease;
            overflow: hidden;
          }
          .card-front, .card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            padding: 30px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
          }
          .card-front {
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
          }
          .card-back {
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
            transform: rotateY(180deg);
          }
          .holo-sheen {
            position: absolute;
            top: 0;
            left: -100%;
            width: 50%;
            height: 100%;
            background: linear-gradient(
              to right,
              transparent,
              rgba(255, 111, 125, 0.4),
              transparent
            );
            transform: skewX(-25deg);
            z-index: 0;
          }
          .glow-trail {
            position: absolute;
            width: 40px;
            height: 40px;
            background: radial-gradient(circle, rgba(106, 219, 214, 0.5), transparent);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            opacity: 0;
            z-index: 1;
          }
          .tech-tag {
            background: linear-gradient(145deg, #6ADBD6, #5ACBC6);
            border: 1px solid rgba(255, 111, 125, 0.3);
            border-radius: 9999px;
            padding: 4px 12px;
            margin: 4px;
            font-size: 0.875rem;
            color: #2A2E4D;
            font-family: 'Inter', sans-serif;
          }
          .projects-heading {
            text-shadow: 0 2px 4px rgba(42, 46, 77, 0.1);
          }
          /* GitHub Link Icon */
          .github-link {
            position: absolute;
            bottom: 10px;
            right: 10px;
            opacity: 0.7;
            transition: none; /* Handled by GSAP */
          }
          .github-icon {
            fill: #2A2E4D;
            transition: fill 0.3s ease;
          }
          .github-link:hover .github-icon {
            fill: #FF6F7D;
          }
          @media (max-width: 768px) {
            .project-card {
              height: 350px;
            }
            .github-link {
              bottom: 8px;
              right: 8px;
            }
            .github-icon {
              width: 20px;
              height: 20px;
            }
          }
        `}
      </style>

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 ref={projectsHeadingRef} className="text-xl font-semibold text-indigo sm:text-2xl md:text-3xl font-poppins projects-heading">
            Projects
          </h3>
          <div className="mt-6 projects-container">
            <div className="projects-bg">
              <svg viewBox="0 0 400 1200" className="w-full h-full">
                <path
                  d="M100,100 Q150,50 200,100 T300,100"
                  className="projects-bg-shape-1"
                />
                <circle cx="120" cy="200" r="8" fill="#FF6F7D" className="projects-bg-shape-1" />
                <circle cx="280" cy="300" r="6" fill="#6ADBD6" className="projects-bg-shape-1" />
                <path
                  d="M50,400 Q100,350 150,400 T250,400"
                  className="projects-bg-shape-2"
                />
                <circle cx="320" cy="500" r="10" fill="#FF6F7D" className="projects-bg-shape-2" />
                <path
                  d="M80,600 Q130,550 180,600 T280,600"
                  className="projects-bg-shape-1"
                />
              </svg>
            </div>
            {projects.map((project, index) => (
              <Tilt key={index} options={{ max: 25, scale: 1.1, speed: 500, perspective: 1000 }}>
                <div className="project-card">
                  <div className="holo-sheen"></div>
                  <div className="card-front">
                    <h4 className="text-lg font-semibold text-indigo font-poppins project-title">
                      {project.title}
                    </h4>
                    <p className="mt-2 text-sm text-indigo font-inter">{project.period}</p>
                    <div className="flex flex-wrap justify-center mt-4">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-link"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <svg
                          className="w-6 h-6 github-icon"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                        </svg>
                      </a>
                    )}
                  </div>
                  <div className="card-back">
                    <h4 className="text-lg font-semibold text-indigo font-poppins">{project.title}</h4>
                    <p className="mt-2 text-sm text-indigo font-inter project-description">
                      {project.description}
                    </p>
                  </div>
                </div>
              </Tilt>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;