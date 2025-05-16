import { useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
import { gsap } from 'gsap';

const ContactUs = () => {
  const formRef = useRef(null);
  const buttonRef = useRef(null);
  const particleCanvasRef = useRef(null);

  useEffect(() => {
    // Add floating label functionality
    const inputs = document.querySelectorAll('.contact-input, .contact-textarea');
    inputs.forEach((input) => {
      const placeholderText = input.getAttribute('placeholder');
      if (!placeholderText) return;

      const label = document.createElement('label');
      label.className = 'placeholder-label';
      label.textContent = placeholderText;
      label.setAttribute('for', input.name);
      input.parentElement.style.position = 'relative';
      input.parentElement.appendChild(label);

      input.setAttribute('placeholder', '');

      const toggleLabel = () => {
        if (input.value) {
          label.classList.add('active');
        } else {
          label.classList.remove('active');
        }
      };

      input.addEventListener('focus', toggleLabel);
      input.addEventListener('blur', toggleLabel);
      input.addEventListener('input', toggleLabel);
      toggleLabel();
    });

    // Particle effect on button hover
    const canvas = particleCanvasRef.current;
    const button = buttonRef.current;
    if (canvas && button) {
      const ctx = canvas.getContext('2d');
      let particlesArray = [];

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
          ctx.fillStyle = `rgba(106, 219, 214, ${this.life / 100})`;
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

      return () => {
        window.removeEventListener('resize', resizeCanvas);
        if (window.particleAnimation) {
          cancelAnimationFrame(window.particleAnimation);
          window.particleAnimation = null;
        }
      };
    }
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
      className="relative flex items-center justify-center min-h-screen py-16 bg-cream"
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Roboto+Mono:wght@400;500&display=swap');

          /* Base Styles */
          .bg-cream {
            background-color: #FFF8F0;
          }
          .text-indigo {
            color: #2A2E4D;
          }
          .text-coral-600 {
            color: #FF6F7D;
          }
          .font-orbitron {
            font-family: 'Orbitron', sans-serif;
          }
          .font-roboto-mono {
            font-family: 'Roboto Mono', monospace;
          }

          /* Form Container */
          .form-container {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(12px);
            border: 2px solid #6ADBD6;
            box-shadow: 0 10px 40px rgba(42, 46, 77, 0.15);
            border-radius: 1.5rem;
            padding: 2rem;
            max-width: 100%;
            box-sizing: border-box;
          }

          /* Form Inputs and Textarea */
          .contact-input,
          .contact-textarea {
            background: rgba(255, 255, 255, 0.25);
            border: 1px solid rgba(255, 255, 255, 0.4);
            color: #2A2E4D;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
            caret-color: #FF6F7D;
            width: 100%;
            box-sizing: border-box;
            border-radius: 0.75rem;
            padding: 0.75rem;
            font-family: 'Roboto Mono', monospace;
            font-size: 0.9rem;
          }
          .contact-input:focus,
          .contact-textarea:focus {
            border-color: #6ADBD6;
            box-shadow: 0 0 12px rgba(106, 219, 214, 0.4);
            outline: none;
          }

          /* Placeholder Label */
          .placeholder-label {
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: #2A2E4D;
            font-family: 'Roboto Mono', monospace;
            font-size: 0.9rem;
            pointer-events: none;
            transition: all 0.3s ease;
            background: transparent;
            padding: 0 4px;
            z-index: 1;
          }
          .placeholder-label.active {
            top: -0.75rem;
            font-size: 0.75rem;
          }

          /* Button */
          .contact-button {
            position: relative;
            background: #220234;
            color: white;
            font-size: 1rem;
            padding: 0.75rem 1.5rem;
            border-radius: 0.75rem;
            width: 100%;
            box-sizing: border-box;
            font-family: 'Roboto Mono', monospace;
            cursor: pointer;
            border: none;
            box-shadow: 0 0 15px rgba(106, 219, 214, 0.4);
            overflow: hidden;
          }
          .particle-canvas {
            position: absolute;
            top: 0;
            left: 0;
            pointer-events: none;
          }

          /* Responsive Styles */
          @media (max-width: 768px) {
            .contact-heading {
              font-size: 2rem;
            }
            .contact-subheading {
              font-size: 1rem;
            }
            .contact-input,
            .contact-textarea {
              padding: 0.5rem;
              font-size: 0.8rem;
            
            }
            .contact-button {
              padding: 0.5rem 1rem;
              font-size: 0.9rem;
            }
            .placeholder-label {
              font-size: 0.8rem;
              left: 0.75rem;
            }
            .placeholder-label.active {
              font-size: 0.65rem;
              top: -0.5rem;
            }
            .form-container {
              padding: 1.5rem;
            }
          }
        `}
      </style>

      <div className="container flex flex-col items-center gap-8 px-4 mx-auto sm:px-6 lg:px-8">
        <div className="w-full max-w-lg">
          <h2 className="mb-4 text-3xl font-bold text-center sm:text-4xl font-orbitron text-indigo contact-heading">
            Transmit Signal
          </h2>
          <p className="mb-8 text-base font-medium text-center text-coral-600 contact-subheading font-roboto-mono">
            Send a cosmic message across the universe!
          </p>
          <div ref={formRef} className="form-container">
            <form onSubmit={sendEmail} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="contact-input"
                  aria-label="Your Name"
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="contact-input"
                  aria-label="Your Email"
                />
              </div>
              <div className="relative">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  rows="5"
                  className="resize-none contact-textarea"
                  aria-label="Your Message"
                ></textarea>
              </div>
              <div className="relative">
                <button
                  ref={buttonRef}
                  type="submit"
                  className="contact-button"
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