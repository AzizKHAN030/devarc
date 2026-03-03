import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
import Player from '@vimeo/player';
import { 
  Menu, 
  X, 
  ArrowRight, 
  ChevronRight, 
  Home, 
  Layout, 
  Compass, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Linkedin, 
  Facebook,
  Award,
  Users,
  CheckCircle2,
  ArrowUpRight,
  Plus
} from 'lucide-react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  category: 'Architecture' | 'Interior' | 'Exterior';
  image: string;
  year: string;
}

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

// --- Data ---
const PROJECTS: Project[] = [
  { id: 1, title: 'The Obsidian Villa', category: 'Architecture', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200', year: '2024' },
  { id: 2, title: 'Nordic Light Loft', category: 'Interior', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200', year: '2023' },
  { id: 3, title: 'Azure Garden Estate', category: 'Exterior', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200', year: '2024' },
  { id: 4, title: 'Crystal Pavilion', category: 'Architecture', image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200', year: '2022' },
  { id: 5, title: 'Ethereal Living', category: 'Interior', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200', year: '2023' },
  { id: 6, title: 'Serenity Poolside', category: 'Exterior', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200', year: '2024' },
];

const SERVICES: Service[] = [
  {
    title: 'Architecture Planning',
    description: 'Mastering the art of structural integrity and spatial harmony.',
    icon: <Compass className="w-6 h-6" />,
    features: ['Site Analysis', 'Conceptual Design', 'Structural Planning']
  },
  {
    title: 'Interior Design',
    description: 'Curating atmospheres that resonate with human emotion.',
    icon: <Layout className="w-6 h-6" />,
    features: ['Space Optimization', 'Material Selection', 'Lighting Design']
  },
  {
    title: 'Exterior Design',
    description: 'Defining the boundary between nature and architecture.',
    icon: <Home className="w-6 h-6" />,
    features: ['Facade Design', 'Landscape Architecture', 'Outdoor Living']
  }
];

const WORK_STEPS = [
  {
    id: 1,
    title: "Groundwork & Excavation",
    description: "The journey begins with precision site analysis and heavy-duty excavation. We prepare the earth to support the weight of innovation, ensuring a stable foundation for the structure to come.",
    startTime: 0,
    endTime: 8
  },
  {
    id: 2,
    title: "Foundation & Vertical Structure",
    description: "Reinforced concrete footings and vertical columns form the skeleton of the building. This phase focuses on structural integrity and the first visible rise of the architectural form.",
    startTime: 8,
    endTime: 14
  },
  {
    id: 3,
    title: "Structural Framing",
    description: "As the floors take shape, the complexity of the design becomes apparent. We use advanced engineering techniques to create expansive spans and unique geometric volumes.",
    startTime: 14,
    endTime: 20
  },
  {
    id: 4,
    title: "Enclosure & Facade",
    description: "The building is sealed with high-performance glazing and exterior shells. This is where the aesthetic vision meets technical performance, protecting the interior while defining the character.",
    startTime: 20,
    endTime: 29
  },
  {
    id: 5,
    title: "Final Finishing",
    description: "The final touch involves meticulous interior detailing, landscape integration, and architectural lighting. We transform a structure into a living, breathing environment of luxury.",
    startTime: 29,
    endTime: 49
  }
];

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl py-4 border-b border-devarc-dark/5' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-8 flex justify-between items-center">
        <motion.a 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          href="#" 
          className="flex items-center gap-2 group"
        >
          <div className={`text-2xl font-display font-bold tracking-tighter transition-colors duration-500 ${isScrolled ? 'text-devarc-dark' : 'text-white'}`}>
            DEV<span className="text-devarc-accent">ARC</span>
          </div>
        </motion.a>

        <div className="hidden md:flex items-center gap-12">
          {['Services', 'Portfolio', 'About', 'Contact'].map((item, i) => (
            <motion.a 
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              href={`#${item.toLowerCase()}`}
              className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-colors relative group ${isScrolled ? 'text-devarc-dark/60' : 'text-white/60'} hover:text-devarc-accent`}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-devarc-accent transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
          ))}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-500 ${isScrolled ? 'bg-devarc-dark text-white shadow-devarc-dark/10' : 'bg-white text-devarc-dark shadow-white/10'} hover:bg-devarc-accent hover:text-white shadow-xl`}
          >
            Inquiry
          </motion.button>
        </div>

        <button 
          className={`md:hidden transition-colors ${isScrolled ? 'text-devarc-dark' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border-b border-devarc-dark/5 md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-6">
              {['Services', 'Portfolio', 'About', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-display font-bold text-devarc-dark">
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center overflow-hidden snap-start">
      {/* Full Screen Vimeo Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div style={{ scale }} className="w-full h-full relative">
          <iframe 
            src="https://player.vimeo.com/video/1169827783?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&quality=720p" 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-[177.77777778vh] h-[56.25vw]"
            frameBorder="0" 
            allow="autoplay; fullscreen; picture-in-picture" 
            allowFullScreen
            title="Background Video"
          ></iframe>
        </motion.div>
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="container mx-auto px-8 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.span 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block text-devarc-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-6"
            >
              Est. 2012 — Architecture Studio
            </motion.span>
            <h1 className="text-[12vw] lg:text-[8vw] font-display font-bold text-white leading-[0.85] tracking-tighter mb-8">
              <motion.span 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="block"
              >
                CRAFTING
              </motion.span>
              <motion.span 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="block text-devarc-accent"
              >
                SILENCE
              </motion.span>
              <motion.span 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="block"
              >
                IN SPACE
              </motion.span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-white/80 text-lg max-w-md leading-relaxed mb-10"
            >
              We design environments that transcend the ordinary, blending minimalist aesthetics with structural innovation.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-8"
            >
              <button className="group flex items-center gap-4 text-white font-bold uppercase tracking-widest text-[11px]">
                Explore Works 
                <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-devarc-dark transition-all duration-500">
                  <ArrowRight size={16} />
                </span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-12 left-8 flex flex-col gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40"
      >
        <span>Scroll</span>
        <div className="w-px h-24 bg-white/10 relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 96] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-devarc-accent"
          />
        </div>
      </motion.div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-32 bg-white snap-start">
      <div className="container mx-auto px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-xl"
          >
            <h2 className="text-devarc-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-6">Our Expertise</h2>
            <h3 className="text-5xl md:text-6xl font-display font-bold text-devarc-dark leading-tight tracking-tighter">
              Holistic solutions for modern living.
            </h3>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="text-devarc-muted text-lg max-w-sm leading-relaxed lg:mt-12"
          >
            From the first sketch to the final brick, we ensure every detail aligns with our vision of perfection.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-devarc-dark/5 border border-devarc-dark/5 rounded-[2.5rem] overflow-hidden">
          {SERVICES.map((service, idx) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-12 hover:bg-devarc-paper transition-colors duration-500 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-devarc-dark text-white flex items-center justify-center mb-8 group-hover:bg-devarc-accent transition-colors duration-500">
                {service.icon}
              </div>
              <h4 className="text-2xl font-display font-bold mb-4">{service.title}</h4>
              <p className="text-devarc-muted mb-8 leading-relaxed text-sm">
                {service.description}
              </p>
              <ul className="space-y-4">
                {service.features.map(feature => (
                  <li key={feature} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-devarc-dark/60">
                    <Plus size={12} className="text-devarc-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-32 bg-devarc-paper snap-start">
      <div className="container mx-auto px-8">
        <div className="flex justify-between items-end mb-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-devarc-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-6">Portfolio</h2>
            <h3 className="text-5xl font-display font-bold text-devarc-dark tracking-tighter">Selected Works</h3>
          </motion.div>
          <motion.button 
            whileHover={{ x: 10 }}
            className="hidden md:flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-devarc-dark"
          >
            View All Projects <ArrowRight size={16} />
          </motion.button>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {PROJECTS.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx % 2 * 0.2 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden mb-8">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-4 group-hover:translate-y-0">
                  <ArrowUpRight size={20} className="text-white" />
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-devarc-accent mb-2 block">{project.category}</span>
                  <h4 className="text-2xl font-display font-bold text-devarc-dark group-hover:text-devarc-accent transition-colors">{project.title}</h4>
                </div>
                <span className="text-[11px] font-bold text-devarc-muted mt-2">{project.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ArchitectureSteps = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const activeStepRef = useRef(0);

  useEffect(() => {
    activeStepRef.current = activeStep;
  }, [activeStep]);

  useEffect(() => {
    if (videoRef.current) {
      const iframe = videoRef.current.querySelector('iframe');
      if (iframe) {
        playerRef.current = new Player(iframe);
        playerRef.current.setMuted(true);
        playerRef.current.setLoop(false);

        playerRef.current.on('timeupdate', (data) => {
          const currentStep = activeStepRef.current;
          if (data.seconds >= WORK_STEPS[currentStep].endTime) {
            if (currentStep < WORK_STEPS.length - 1) {
              const nextStep = currentStep + 1;
              const container = containerRef.current;
              if (container) {
                const scrollPos = container.offsetTop + (nextStep * window.innerHeight);
                window.scrollTo({ top: scrollPos, behavior: 'smooth' });
              }
            }
          }
        });
      }
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const step = Math.min(
        Math.floor(v * WORK_STEPS.length),
        WORK_STEPS.length - 1
      );
      if (step !== activeStep) {
        setActiveStep(step);
        if (playerRef.current) {
          playerRef.current.setCurrentTime(WORK_STEPS[step].startTime);
          playerRef.current.play();
        }
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, activeStep]);

  return (
    <section ref={containerRef} className="relative bg-devarc-dark text-white snap-start">
      <div className="flex flex-col lg:flex-row min-h-[500vh]">
        {/* Sticky Video Side */}
        <div className="lg:w-1/2 h-screen sticky top-0 overflow-hidden order-2 lg:order-1">
          <div ref={videoRef} className="w-full h-full relative">
            <iframe 
              src="https://player.vimeo.com/video/1169842314?background=1&autoplay=1&loop=0&byline=0&title=0&muted=1" 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-[177.77vh] h-[56.25vw]"
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture" 
              title="Work Steps Video"
            ></iframe>
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        </div>

        {/* Scrollable Content Side */}
        <div className="lg:w-1/2 order-1 lg:order-2">
          {WORK_STEPS.map((step, index) => (
            <div key={step.id} className="h-screen flex items-center px-8 lg:px-24 snap-start">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ margin: "-20% 0px -20% 0px" }}
                className="max-w-md"
              >
                <span className="text-devarc-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">
                  Phase 0{index + 1}
                </span>
                <h3 className="text-4xl lg:text-6xl font-display font-bold mb-8 leading-tight tracking-tighter">
                  {step.title}
                </h3>
                <p className="text-white/60 text-lg leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 bg-white overflow-hidden snap-start">
      <div className="container mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div ref={ref} className="relative">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1 }}
              className="aspect-square rounded-[3rem] overflow-hidden relative z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
                alt="Studio" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute -bottom-10 -left-10 w-2/3 aspect-video bg-devarc-dark rounded-3xl z-20 p-12 flex flex-col justify-center"
            >
              <div className="text-devarc-accent text-5xl font-display font-bold mb-2">12Y</div>
              <div className="text-white/60 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                Defining the future of architectural excellence since 2012.
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-devarc-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-6">Our Philosophy</h2>
            <h3 className="text-5xl font-display font-bold text-devarc-dark mb-8 leading-tight tracking-tighter">
              We don't just build structures; we create experiences.
            </h3>
            <p className="text-devarc-muted text-lg mb-12 leading-relaxed">
              At DEVARC, we believe that architecture is the silent language of space. Our approach is rooted in the pursuit of essentialism—stripping away the noise to reveal the soul of a project.
            </p>
            
            <div className="space-y-8">
              {[
                { label: 'Innovation', desc: 'Pushing boundaries with sustainable tech.' },
                { label: 'Precision', desc: 'Meticulous attention to every millimeter.' },
                { label: 'Harmony', desc: 'Seamless integration with the environment.' }
              ].map((item, i) => (
                <motion.div 
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-6 group"
                >
                  <div className="w-12 h-12 rounded-full border border-devarc-dark/10 flex items-center justify-center group-hover:bg-devarc-dark group-hover:text-white transition-all duration-500">
                    <span className="text-[10px] font-bold">0{i+1}</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-sm uppercase tracking-widest mb-1">{item.label}</h5>
                    <p className="text-xs text-devarc-muted">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-white snap-start">
      <div className="container mx-auto px-8">
        <div className="bg-devarc-dark rounded-[4rem] p-12 lg:p-24 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
            <div className="grid grid-cols-6 h-full border-l border-white/20">
              {[...Array(6)].map((_, i) => <div key={i} className="border-r border-white/20 h-full" />)}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-24 relative z-10">
            <div>
              <h2 className="text-devarc-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-8">Contact</h2>
              <h3 className="text-5xl lg:text-7xl font-display font-bold text-white mb-12 leading-[0.9] tracking-tighter">
                Ready to start your <span className="text-devarc-accent">journey?</span>
              </h3>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-devarc-accent">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Email</p>
                    <p className="text-xl font-display font-bold text-white">hello@devarc.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-devarc-accent">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Phone</p>
                    <p className="text-xl font-display font-bold text-white">+1 (555) 000-1234</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl p-12 rounded-[3rem] border border-white/10">
              <form className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Name</label>
                    <input type="text" className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-devarc-accent transition-colors text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Email</label>
                    <input type="email" className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-devarc-accent transition-colors text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Message</label>
                  <textarea rows={4} className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-devarc-accent transition-colors text-white resize-none" />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-devarc-accent text-white py-6 rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-white hover:text-devarc-dark transition-all duration-500"
                >
                  Send Inquiry
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white py-20 border-t border-devarc-dark/5 snap-start">
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-3xl font-display font-bold tracking-tighter text-devarc-dark">
            DEV<span className="text-devarc-accent">ARC</span>
          </div>
          
          <div className="flex gap-12">
            {['Instagram', 'LinkedIn', 'Behance'].map(social => (
              <a key={social} href="#" className="text-[11px] font-bold uppercase tracking-widest text-devarc-dark/40 hover:text-devarc-accent transition-colors">
                {social}
              </a>
            ))}
          </div>

          <div className="text-[11px] font-bold uppercase tracking-widest text-devarc-dark/40">
            © 2024 DEVARC Studio
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-devarc-accent selection:text-white">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <ArchitectureSteps />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
