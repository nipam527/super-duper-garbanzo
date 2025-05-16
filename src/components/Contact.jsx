import { useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactUs = () => {
  const contactRef = useRef(null);
  const formRef = useRef(null);
  const buttonRef = useRef(null);
  const particleCanvasRef = useRef(null);

  useEffect(() => {
    // Scroll-triggered animations for the form section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contactRef.current,
        start: 'top 85%',
        end: 'bottom 20%',
        scrub: 0.5,
      },
    });

    tl.fromTo(
      '.contact-heading',
      { opacity: 1, y: -50, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power4.out' }
    )
      .fromTo(
        '.contact-subheading',
        { opacity: 1, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out' },
        '-=0.5'
      )
      .fromTo(
        '.form-container',
        { opacity: 1, rotateX: 20, y: 50 },
        { opacity: 1, rotateX: 0, y: 0, duration: 1.2, ease: 'power4.out' },
        '-=0.3'
      );

    // 3D tilt effect on form container
    const formContainer = formRef.current;
    const handleMouseMove = (e) => {
      const rect = formContainer.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const tiltX = (y / rect.height) * 15;
      const tiltY = -(x / rect.width) * 15;
      gsap.to(formContainer, {
        rotateX: tiltX,
        rotateY: tiltY,
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(formContainer, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    formContainer.addEventListener('mousemove', handleMouseMove);
    formContainer.addEventListener('mouseleave', handleMouseLeave);

    // Particle effect on button hover
    const canvas = particleCanvasRef.current;
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const button = buttonRef.current;

    const resizeCanvas = () => {
      canvas.width = button.offsetWidth;
      canvas.height = button.offsetHeight;
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

    button.addEventListener('mouseenter', () => {
      for (let i = 0; i < 20; i++) {
        particlesArray.push(new Particle());
      }
      gsap.to(button, {
        scale: 1.05,
        boxShadow: '0 0 25px rgba(106, 219, 214, 0.8)',
        duration: 0.3,
        ease: 'power3.out',
      });
      if (particlesArray.length > 0 && !window.particleAnimation) {
        window.particleAnimation = requestAnimationFrame(animateParticles);
      }
    });

    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        scale: 1,
        boxShadow: '0 0 15px rgba(106, 219, 214, 0.4)',
        duration: 0.3,
        ease: 'power3.out',
      });
    });

    // Placeholder typing animation
    const inputs = document.querySelectorAll('.contact-input, .contact-textarea');
    inputs.forEach((input) => {
      const placeholderText = input.getAttribute('placeholder');
      input.setAttribute('data-placeholder', placeholderText);
      input.setAttribute('placeholder', '');

      const chars = placeholderText.split('');
      const spanContainer = document.createElement('span');
      spanContainer.className = 'placeholder-span';
      chars.forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.animationDelay = `${index * 0.1}s`;
        spanContainer.appendChild(span);
      });

      input.parentElement.style.position = 'relative';
      input.parentElement.appendChild(spanContainer);

      // Pulse border animation on scroll
      gsap.to(input, {
        '--border-opacity': 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: input,
          start: 'top 80%',
        },
      });
    });

    return () => {
      formContainer.removeEventListener('mousemove', handleMouseMove);
      formContainer.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
      if (window.particleAnimation) {
        cancelAnimationFrame(window.particleAnimation);
        window.particleAnimation = null;
      }
    };
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_shbrpf6',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_ov0av6k',
        e.target,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'nTg0KLD5lZ_i7FmM-'
      )
      .then(
        (result) => {
          alert('Message sent successfully!');
          console.log(result.text);
        },
        (error) => {
          alert('Failed to send message: ' + error.text);
          console.error(error.text);
        }
      );

    e.target.reset();
  };

  return (
    <section
      id="contact-us"
      ref={contactRef}
      className="relative flex items-center justify-center min-h-screen py-16 overflow-hidden bg-cream"
    >
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

          /* Glassmorphism Form Container */
          .form-container {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(12px);
            border: 2px solid #6ADBD6;
            box-shadow: 0 10px 40px rgba(42, 46, 77, 0.15);
            transform-style: preserve-3d;
            position: relative;
            overflow: hidden;
            border-radius: 1.5rem;
          }

          /* Form Inputs and Textarea */
          .contact-input,
          .contact-textarea {
            background: rgba(255, 255, 255, 0.25);
            border: 1px solid rgba(255, 255, 255, 0.4);
            color: #2A2E4D;
            position: relative;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
            --border-opacity: 0;
            caret-color: #FF6F7D;
          }
          .contact-input:focus,
          .contact-textarea:focus {
            border-color: #6ADBD6;
            box-shadow: 0 0 12px rgba(106, 219, 214, 0.4);
          }
          .contact-input::placeholder,
          .contact-textarea::placeholder {
            color: transparent;
          }

          /* Placeholder Animation */
          .placeholder-span {
            position: absolute;
            top: 50%;
            left: 1.25rem;
            transform: translateY(-50%);
            color: #2A2E4D;
            pointer-events: none;
            font-size: 0.9rem;
            font-family: 'Roboto Mono', monospace;
          }
          .contact-input:focus + .placeholder-span,
          .contact-textarea:focus + .placeholder-span,
          .contact-input:not(:placeholder-shown) + .placeholder-span,
          .contact-textarea:not(:placeholder-shown) + .placeholder-span {
            display: none;
          }
          .placeholder-span span {
            display: inline-block;
            opacity: 0;
            animation: typeIn 0.5s forwards;
          }
          @keyframes typeIn {
            0% { opacity: 0; transform: translateY(5px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          /* Pulsing Border Animation */
          .contact-input::before,
          .contact-textarea::before {
            content: '';
            position: absolute;
            inset: -2px;
            border: 2px solid #6ADBD6;
            opacity: var(--border-opacity);
            animation: pulseBorder 2s infinite;
            border-radius: 1rem;
            pointer-events: none;
          }
          @keyframes pulseBorder {
            0% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.03); }
            100% { opacity: 0.3; transform: scale(1); }
          }

          /* Glowing Button */
          .contact-button {
            position: relative;
            background: #220234;
            color: white;
            box-shadow: 0 0 15px rgba(106, 219, 214, 0.4);
            overflow: hidden;
            font-size: 1.1rem;
            padding: 1rem 2rem;
            border-radius: 0.75rem;
          }
          .particle-canvas {
            position: absolute;
            top: 0;
            left: 0;
            pointer-events: none;
          }

          @media (max-width: 768px) {
            .contact-heading {
              font-size: 2rem;
            }
            .contact-subheading {
              font-size: 0.9rem;
            }
            .contact-input,
            .contact-textarea {
              padding: 0.75rem;
            }
            .contact-button {
              padding: 0.75rem 1.5rem;
              font-size: 1rem;
            }
            .placeholder-span {
              font-size: 0.75rem;
              left: 0.75rem;
            }
          }
        `}
      </style>

      <div className="container flex flex-col items-center gap-12 px-4 mx-auto sm:px-6 lg:px-8">
        {/* Contact Form Section */}
        <div className="w-full">
          <h2 className="mb-4 text-3xl font-bold text-center sm:text-4xl font-orbitron text-indigo contact-heading">
            Transmit Signal
          </h2>
          <p className="mb-8 text-base font-medium text-center text-coral-600 contact-subheading font-roboto-mono">
            Send a cosmic message across the universe!
          </p>
          <div ref={formRef} className="max-w-lg p-6 mx-auto form-container sm:p-8">
            <form onSubmit={sendEmail} className="space-y-5">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full p-3 text-sm sm:p-4 rounded-xl contact-input font-roboto-mono text-indigo focus:outline-none"
                  aria-label="Your Name"
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full p-3 text-sm sm:p-4 rounded-xl contact-input font-roboto-mono text-indigo focus:outline-none"
                  aria-label="Your Email"
                />
              </div>
              <div className="relative">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  rows="5"
                  className="w-full p-3 text-sm resize-none sm:p-4 rounded-xl contact-textarea font-roboto-mono text-indigo focus:outline-none"
                  aria-label="Your Message"
                ></textarea>
              </div>
              <div className="relative">
                <button
                  ref={buttonRef}
                  type="submit"
                  className="w-full contact-button font-roboto-mono"
                  aria-label="Send Message"
                >
                  Send Message
                  <canvas ref={particleCanvasRef} className="particle-canvas"></canvas>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;