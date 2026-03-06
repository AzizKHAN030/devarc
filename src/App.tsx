import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
import Player from '@vimeo/player';
import { useTranslation } from 'react-i18next';
import { 
  Menu, 
  X, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft,
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
  Plus,
  Globe
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

const INTERIOR_STEPS = [
  {
    id: 1,
    startTime: 0,
    endTime: 13
  },
  {
    id: 2,
    startTime: 13,
    endTime: 23
  },
  {
    id: 3,
    startTime: 23,
    endTime: 40 // Assuming a reasonable end time
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

const Preloader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-devarc-dark flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center gap-8"
      >
        <div className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white">
          DEV<span className="text-devarc-accent">ARC</span>
        </div>
        
        <div className="w-48 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5, 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 bg-devarc-accent"
          />
        </div>
      </motion.div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-devarc-deep rounded-full blur-[120px]" />
      </div>
    </motion.div>
  );
};

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('nav.services'), id: 'services' },
    { name: t('nav.portfolio'), id: 'portfolio' },
    { name: t('nav.about'), id: 'about' },
    { name: t('nav.contact'), id: 'contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl py-4 border-b border-devarc-dark/5' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-4 sm:px-8 flex justify-between items-center">
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
          {navItems.map((item, i) => (
            <motion.a 
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              href={`#${item.id}`}
              className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-colors relative group ${isScrolled ? 'text-devarc-dark/60' : 'text-white/60'} hover:text-devarc-accent`}
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-devarc-accent transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
          ))}
          
          {/* Language Switcher */}
          <div className="flex items-center gap-4 border-l border-devarc-dark/10 pl-8 ml-4">
            <Globe size={14} className={isScrolled ? 'text-devarc-dark/40' : 'text-white/40'} />
            <div className="flex gap-3">
              {['RU', 'EN', 'UZ'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang.toLowerCase())}
                  className={`text-[10px] font-bold transition-colors ${
                    i18n.language.toUpperCase() === lang 
                      ? 'text-devarc-accent' 
                      : isScrolled ? 'text-devarc-dark/40 hover:text-devarc-dark' : 'text-white/40 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-500 ${isScrolled ? 'bg-devarc-dark text-white shadow-devarc-dark/10' : 'bg-white text-devarc-dark shadow-white/10'} hover:bg-devarc-accent hover:text-white shadow-xl`}
          >
            {t('nav.inquiry')}
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
              {navItems.map((item) => (
                <a key={item.id} href={`#${item.id}`} onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-display font-bold text-devarc-dark">
                  {item.name}
                </a>
              ))}
              <div className="flex gap-6 pt-4 border-t border-devarc-dark/5">
                {['RU', 'EN', 'UZ'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      changeLanguage(lang.toLowerCase());
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-sm font-bold ${i18n.language.toUpperCase() === lang ? 'text-devarc-accent' : 'text-devarc-dark/40'}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const isInView = useInView(containerRef, { amount: 0.1 });
  const playPromiseRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      const iframe = videoRef.current.querySelector('iframe');
      if (iframe) {
        playerRef.current = new Player(iframe);
        playerRef.current.setMuted(true);
        playerRef.current.setLoop(true);
      }
    }
  }, []);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    if (isInView) {
      playPromiseRef.current = player.play();
      playPromiseRef.current.catch(() => {});
    } else {
      const pauseVideo = () => {
        if (!isInView) {
          player.pause().catch(() => {});
        }
      };

      if (playPromiseRef.current) {
        playPromiseRef.current.then(pauseVideo).catch(pauseVideo);
      } else {
        pauseVideo();
      }
    }
  }, [isInView]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden snap-start bg-black">
      {/* Full Screen Vimeo Background */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-black">
        <motion.div style={{ scale }} className="w-full h-full relative bg-black">
          <div ref={videoRef} className="w-full h-full">
            <iframe 
              src="https://player.vimeo.com/video/1169827783?background=1&autoplay=0&loop=1&byline=0&title=0&muted=1&quality=720p" 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-[177.77777778vh] h-[56.25vw]"
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture" 
              allowFullScreen
              title="Background Video"
            ></iframe>
          </div>
        </motion.div>
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-8 relative z-10">
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
              {t('hero.est')}
            </motion.span>
            <h1 className="text-[10vw] sm:text-[12vw] lg:text-[8vw] font-display font-bold text-white leading-[0.85] tracking-tighter mb-8">
              <motion.span 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="block"
              >
                {t('hero.title1')}
              </motion.span>
              <motion.span 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="block text-devarc-accent"
              >
                {t('hero.title2')}
              </motion.span>
              <motion.span 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="block"
              >
                {t('hero.title3')}
              </motion.span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-white/80 text-base sm:text-lg max-w-md leading-relaxed mb-10"
            >
              {t('hero.subtitle')}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-8"
            >
              <button className="group flex items-center gap-4 text-white font-bold uppercase tracking-widest text-[11px]">
                {t('hero.explore')} 
                <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-devarc-dark transition-all duration-500">
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
        className="absolute bottom-12 left-4 sm:left-8 flex flex-col gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40"
      >
        <div className="w-px h-24 bg-white/10 relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 96] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-devarc-accent"
          />
        </div>
        <span>{t('hero.scroll')}</span>
      </motion.div>
    </section>
  );
};

const Services = () => {
  const { t } = useTranslation();

  const servicesData: Service[] = [
    {
      title: t('services.architecture.title'),
      description: t('services.architecture.desc'),
      icon: <Compass className="w-6 h-6" />,
      features: [t('services.architecture.f1'), t('services.architecture.f2'), t('services.architecture.f3')]
    },
    {
      title: t('services.interior.title'),
      description: t('services.interior.desc'),
      icon: <Layout className="w-6 h-6" />,
      features: [t('services.interior.f1'), t('services.interior.f2'), t('services.interior.f3')]
    },
    {
      title: t('services.exterior.title'),
      description: t('services.exterior.desc'),
      icon: <Home className="w-6 h-6" />,
      features: [t('services.exterior.f1'), t('services.exterior.f2'), t('services.exterior.f3')]
    }
  ];

  return (
    <section id="services" className="py-20 sm:py-32 bg-white snap-start">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 sm:gap-12 mb-16 sm:mb-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-xl"
          >
            <h2 className="text-devarc-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4 sm:mb-6">{t('services.tag')}</h2>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-devarc-dark leading-tight tracking-tighter">
              {t('services.title')}
            </h3>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="text-devarc-muted text-base sm:text-lg max-w-sm leading-relaxed lg:mt-12"
          >
            {t('services.desc')}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-devarc-dark/5 border border-devarc-dark/5 rounded-3xl sm:rounded-[2.5rem] overflow-hidden">
          {servicesData.map((service, idx) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 sm:p-12 hover:bg-devarc-paper transition-colors duration-500 group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-devarc-dark text-white flex items-center justify-center mb-6 sm:mb-8 group-hover:bg-devarc-accent transition-colors duration-500">
                {service.icon}
              </div>
              <h4 className="text-xl sm:text-2xl font-display font-bold mb-3 sm:mb-4">{service.title}</h4>
              <p className="text-devarc-muted mb-6 sm:mb-8 leading-relaxed text-sm">
                {service.description}
              </p>
              <ul className="space-y-3 sm:space-y-4">
                {service.features.map(feature => (
                  <li key={feature} className="flex items-center gap-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-devarc-dark/60">
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
  const { t } = useTranslation();
  return (
    <section id="portfolio" className="py-20 sm:py-32 bg-devarc-paper snap-start">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 sm:mb-20 gap-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-devarc-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4 sm:mb-6">{t('portfolio.tag')}</h2>
            <h3 className="text-4xl sm:text-5xl font-display font-bold text-devarc-dark tracking-tighter">{t('portfolio.title')}</h3>
          </motion.div>
          <motion.button 
            whileHover={{ x: 10 }}
            className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-devarc-dark"
          >
            {t('portfolio.viewAll')} <ArrowRight size={16} />
          </motion.button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
          {PROJECTS.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx % 2 * 0.2 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] rounded-2xl sm:rounded-[2rem] overflow-hidden mb-6 sm:mb-8">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-4 group-hover:translate-y-0">
                  <ArrowUpRight size={20} className="text-white" />
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em] text-devarc-accent mb-1 sm:mb-2 block">
                    {t(`portfolio.categories.${project.category.toLowerCase()}`)}
                  </span>
                  <h4 className="text-xl sm:text-2xl font-display font-bold text-devarc-dark group-hover:text-devarc-accent transition-colors">{project.title}</h4>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-devarc-muted mt-2">{project.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ArchitectureSteps = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const activeStepRef = useRef(0);
  const isInView = useInView(containerRef, { amount: 0.1 });
  const isInViewRef = useRef(false);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    isInViewRef.current = isInView;
    const player = playerRef.current;
    if (!player) return;

    if (isInView) {
      playPromiseRef.current = player.play();
      playPromiseRef.current.catch(() => {});
    } else {
      const pauseVideo = () => {
        if (!isInView) {
          player.pause().catch(() => {});
        }
      };

      if (playPromiseRef.current) {
        playPromiseRef.current.then(pauseVideo).catch(pauseVideo);
      } else {
        pauseVideo();
      }
    }
  }, [isInView]);

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

        // If already in view when initialized, play it
        if (isInViewRef.current) {
          playerRef.current.play().catch(() => {});
        }

        playerRef.current.on('timeupdate', (data) => {
          if (!isInViewRef.current) return;
          
          const currentStep = activeStepRef.current;
          if (data.seconds >= WORK_STEPS[currentStep].endTime) {
            if (currentStep < WORK_STEPS.length - 1) {
              const nextStep = currentStep + 1;
              if (isMobile) {
                const container = scrollContainerRef.current;
                if (container) {
                  container.scrollTo({ left: nextStep * window.innerWidth, behavior: 'smooth' });
                }
              } else {
                const container = containerRef.current;
                if (container) {
                  const scrollPos = container.offsetTop + (nextStep * window.innerHeight);
                  window.scrollTo({ top: scrollPos, behavior: 'smooth' });
                }
              }
            }
          }
        });
      }
    }
  }, [isMobile]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollXProgress } = useScroll({
    container: scrollContainerRef,
    axis: "x"
  });

  useEffect(() => {
    const progress = isMobile ? scrollXProgress : scrollYProgress;
    const unsubscribe = progress.on("change", (v) => {
      if (!isInViewRef.current) return;
      
      const step = Math.min(
        Math.floor(v * WORK_STEPS.length + 0.1),
        WORK_STEPS.length - 1
      );
      if (step !== activeStep) {
        setActiveStep(step);
        if (playerRef.current) {
          playerRef.current.setCurrentTime(WORK_STEPS[step].startTime);
          playPromiseRef.current = playerRef.current.play();
          playPromiseRef.current.catch(() => {});
        }
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, scrollXProgress, activeStep, isMobile]);

  const scrollToStep = (index: number) => {
    if (isMobile) {
      const container = scrollContainerRef.current;
      if (container) {
        container.scrollTo({ left: index * window.innerWidth, behavior: 'smooth' });
      }
    } else {
      const container = containerRef.current;
      if (container) {
        const scrollPos = container.offsetTop + (index * window.innerHeight);
        window.scrollTo({ top: scrollPos, behavior: 'smooth' });
      }
    }
  };

  return (
    <section ref={containerRef} className="relative bg-devarc-dark text-white">
      <div className="flex flex-col lg:flex-row min-h-screen lg:min-h-[500vh]">
        {/* Sticky Video Side */}
        <div className="lg:w-1/2 h-[40vh] lg:h-[calc(100vh-5rem)] sticky top-[60px] lg:top-20 overflow-hidden order-1 lg:order-1 bg-black z-20">
          <div ref={videoRef} className="w-full h-full relative bg-black">
            <iframe 
              src="https://player.vimeo.com/video/1169842314?background=1&autoplay=0&loop=0&byline=0&title=0&muted=1" 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-[177.77vh] h-[56.25vw]"
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture" 
              title="Work Steps Video"
            ></iframe>
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        </div>

        {/* Scrollable Content Side */}
        <div 
          ref={scrollContainerRef}
          className="lg:w-1/2 order-2 lg:order-2 flex lg:block overflow-x-auto lg:overflow-x-visible snap-x lg:snap-none snap-mandatory lg:snap-none no-scrollbar"
        >
          {WORK_STEPS.map((step, index) => (
            <div key={step.id} className="w-screen lg:w-full shrink-0 lg:shrink h-[60vh] lg:h-screen flex items-center lg:items-center px-4 sm:px-8 lg:px-24 snap-center lg:snap-start snap-always">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ margin: "-20% 0px -20% 0px" }}
                className="max-w-md w-full"
              >
                <span className="text-devarc-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4 sm:mb-6 block">
                  {t('steps.phase')} 0{index + 1}
                </span>
                <h3 className="text-3xl sm:text-4xl lg:text-6xl font-display font-bold mb-6 sm:mb-8 leading-tight tracking-tighter">
                  {t(`steps.step${index + 1}.title`)}
                </h3>
                <p className="text-white/60 text-base sm:text-lg leading-relaxed">
                  {t(`steps.step${index + 1}.desc`)}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Mobile Controls */}
        <div className="lg:hidden absolute bottom-8 left-0 right-0 flex justify-between px-6 z-30 pointer-events-none">
          <button 
            onClick={() => scrollToStep(Math.max(0, activeStep - 1))}
            className={`w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center pointer-events-auto transition-opacity ${activeStep === 0 ? 'opacity-30' : 'opacity-100'}`}
            disabled={activeStep === 0}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button 
            onClick={() => scrollToStep(Math.min(WORK_STEPS.length - 1, activeStep + 1))}
            className={`w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center pointer-events-auto transition-opacity ${activeStep === WORK_STEPS.length - 1 ? 'opacity-30' : 'opacity-100'}`}
            disabled={activeStep === WORK_STEPS.length - 1}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

const InteriorSteps = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const activeStepRef = useRef(0);
  const isInView = useInView(containerRef, { amount: 0.1 });
  const isInViewRef = useRef(false);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    isInViewRef.current = isInView;
    const player = playerRef.current;
    if (!player) return;

    if (isInView) {
      playPromiseRef.current = player.play();
      playPromiseRef.current.catch(() => {});
    } else {
      const pauseVideo = () => {
        if (!isInView) {
          player.pause().catch(() => {});
        }
      };

      if (playPromiseRef.current) {
        playPromiseRef.current.then(pauseVideo).catch(pauseVideo);
      } else {
        pauseVideo();
      }
    }
  }, [isInView]);

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

        if (isInViewRef.current) {
          playerRef.current.play().catch(() => {});
        }

        playerRef.current.on('timeupdate', (data) => {
          if (!isInViewRef.current) return;
          
          const currentStep = activeStepRef.current;
          if (data.seconds >= INTERIOR_STEPS[currentStep].endTime) {
            if (currentStep < INTERIOR_STEPS.length - 1) {
              const nextStep = currentStep + 1;
              if (isMobile) {
                const container = scrollContainerRef.current;
                if (container) {
                  container.scrollTo({ left: nextStep * window.innerWidth, behavior: 'smooth' });
                }
              } else {
                const container = containerRef.current;
                if (container) {
                  const scrollPos = container.offsetTop + (nextStep * window.innerHeight);
                  window.scrollTo({ top: scrollPos, behavior: 'smooth' });
                }
              }
            }
          }
        });
      }
    }
  }, [isMobile]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollXProgress } = useScroll({
    container: scrollContainerRef,
    axis: "x"
  });

  useEffect(() => {
    const progress = isMobile ? scrollXProgress : scrollYProgress;
    const unsubscribe = progress.on("change", (v) => {
      if (!isInViewRef.current) return;
      
      const step = Math.min(
        Math.floor(v * INTERIOR_STEPS.length + 0.1),
        INTERIOR_STEPS.length - 1
      );
      if (step !== activeStep) {
        setActiveStep(step);
        if (playerRef.current) {
          playerRef.current.setCurrentTime(INTERIOR_STEPS[step].startTime);
          playPromiseRef.current = playerRef.current.play();
          playPromiseRef.current.catch(() => {});
        }
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, scrollXProgress, activeStep, isMobile]);

  const scrollToStep = (index: number) => {
    if (isMobile) {
      const container = scrollContainerRef.current;
      if (container) {
        container.scrollTo({ left: index * window.innerWidth, behavior: 'smooth' });
      }
    } else {
      const container = containerRef.current;
      if (container) {
        const scrollPos = container.offsetTop + (index * window.innerHeight);
        window.scrollTo({ top: scrollPos, behavior: 'smooth' });
      }
    }
  };

  return (
    <section ref={containerRef} className="relative bg-white text-devarc-dark">
      <div className="flex flex-col lg:flex-row min-h-screen lg:min-h-[300vh]">
        {/* Sticky Video Side (Right) */}
        <div className="lg:w-1/2 h-[40vh] lg:h-[calc(100vh-5rem)] sticky top-[60px] lg:top-20 overflow-hidden order-1 lg:order-2 bg-black z-20">
          <div ref={videoRef} className="w-full h-full relative bg-black">
            <iframe 
              src="https://player.vimeo.com/video/1169842748?background=1&autoplay=0&loop=0&byline=0&title=0&muted=1" 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-[177.77vh] h-[56.25vw]"
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture" 
              title="Interior Steps Video"
            ></iframe>
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        </div>

        {/* Scrollable Content Side (Left) */}
        <div 
          ref={scrollContainerRef}
          className="lg:w-1/2 order-2 lg:order-1 flex lg:block overflow-x-auto lg:overflow-x-visible snap-x lg:snap-none snap-mandatory lg:snap-none no-scrollbar"
        >
          {INTERIOR_STEPS.map((step, index) => (
            <div key={step.id} className="w-screen lg:w-full shrink-0 lg:shrink h-[60vh] lg:h-screen flex items-center lg:items-center px-4 sm:px-8 lg:px-24 snap-center lg:snap-start snap-always">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ margin: "-20% 0px -20% 0px" }}
                className="max-w-md w-full"
              >
                <span className="text-devarc-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4 sm:mb-6 block">
                  {t('interiorSteps.phase')} 0{index + 1}
                </span>
                <h3 className="text-3xl sm:text-4xl lg:text-6xl font-display font-bold mb-6 sm:mb-8 leading-tight tracking-tighter">
                  {t(`interiorSteps.step${index + 1}.title`)}
                </h3>
                <p className="text-devarc-muted text-base sm:text-lg leading-relaxed">
                  {t(`interiorSteps.step${index + 1}.desc`)}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Mobile Controls */}
        <div className="lg:hidden absolute bottom-8 left-0 right-0 flex justify-between px-6 z-30 pointer-events-none">
          <button 
            onClick={() => scrollToStep(Math.max(0, activeStep - 1))}
            className={`w-12 h-12 rounded-full bg-devarc-dark/5 backdrop-blur-md border border-devarc-dark/10 flex items-center justify-center pointer-events-auto transition-opacity ${activeStep === 0 ? 'opacity-30' : 'opacity-100'}`}
            disabled={activeStep === 0}
          >
            <ChevronLeft className="w-6 h-6 text-devarc-dark" />
          </button>
          <button 
            onClick={() => scrollToStep(Math.min(INTERIOR_STEPS.length - 1, activeStep + 1))}
            className={`w-12 h-12 rounded-full bg-devarc-dark/5 backdrop-blur-md border border-devarc-dark/10 flex items-center justify-center pointer-events-auto transition-opacity ${activeStep === INTERIOR_STEPS.length - 1 ? 'opacity-30' : 'opacity-100'}`}
            disabled={activeStep === INTERIOR_STEPS.length - 1}
          >
            <ChevronRight className="w-6 h-6 text-devarc-dark" />
          </button>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 sm:py-32 bg-white overflow-hidden snap-start">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div ref={ref} className="relative">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1 }}
              className="aspect-square rounded-3xl sm:rounded-[3rem] overflow-hidden relative z-10"
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
              className="absolute -bottom-6 -left-6 sm:-bottom-10 sm:-left-10 w-2/3 aspect-video bg-devarc-dark rounded-2xl sm:rounded-3xl z-20 p-6 sm:p-12 flex flex-col justify-center"
            >
              <div className="text-devarc-accent text-3xl sm:text-5xl font-display font-bold mb-1 sm:mb-2">12Y</div>
              <div className="text-white/60 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                {t('about.years')}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-devarc-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4 sm:mb-6">{t('about.tag')}</h2>
            <h3 className="text-4xl sm:text-5xl font-display font-bold text-devarc-dark mb-6 sm:mb-8 leading-tight tracking-tighter">
              {t('about.title')}
            </h3>
            <p className="text-devarc-muted text-base sm:text-lg mb-8 sm:mb-12 leading-relaxed">
              {t('about.desc')}
            </p>
            
            <div className="space-y-6 sm:space-y-8">
              {[
                { label: t('about.innovation.label'), desc: t('about.innovation.desc') },
                { label: t('about.precision.label'), desc: t('about.precision.desc') },
                { label: t('about.harmony.label'), desc: t('about.harmony.desc') }
              ].map((item, i) => (
                <motion.div 
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 sm:gap-6 group"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-devarc-dark/10 flex items-center justify-center group-hover:bg-devarc-dark group-hover:text-white transition-all duration-500 flex-shrink-0">
                    <span className="text-[10px] font-bold">0{i+1}</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-widest mb-1">{item.label}</h5>
                    <p className="text-[10px] sm:text-xs text-devarc-muted">{item.desc}</p>
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
  const { t } = useTranslation();
  return (
    <section id="contact" className="py-20 sm:py-32 bg-white snap-start">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="bg-devarc-dark rounded-3xl sm:rounded-[4rem] p-8 sm:p-12 lg:p-24 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
            <div className="grid grid-cols-6 h-full border-l border-white/20">
              {[...Array(6)].map((_, i) => <div key={i} className="border-r border-white/20 h-full" />)}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 relative z-10">
            <div>
              <h2 className="text-devarc-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-6 sm:mb-8">{t('contact.tag')}</h2>
              <h3 className="text-3xl sm:text-5xl lg:text-7xl font-display font-bold text-white mb-8 sm:mb-12 leading-[1.1] sm:leading-[0.9] tracking-tighter">
                {t('contact.title')} <span className="text-devarc-accent">{t('contact.titleAccent')}</span>
              </h3>
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/5 flex items-center justify-center text-devarc-accent flex-shrink-0">
                    <Mail size={20} sm:size={24} />
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">{t('contact.email')}</p>
                    <p className="text-lg sm:text-xl font-display font-bold text-white">hello@devarc.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/5 flex items-center justify-center text-devarc-accent flex-shrink-0">
                    <Phone size={20} sm:size={24} />
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">{t('contact.phone')}</p>
                    <p className="text-lg sm:text-xl font-display font-bold text-white">+1 (555) 000-1234</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl p-8 sm:p-12 rounded-2xl sm:rounded-[3rem] border border-white/10">
              <form className="space-y-6 sm:space-y-8">
                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/40">{t('contact.form.name')}</label>
                    <input type="text" className="w-full bg-transparent border-b border-white/10 py-3 sm:py-4 focus:outline-none focus:border-devarc-accent transition-colors text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/40">{t('contact.form.email')}</label>
                    <input type="email" className="w-full bg-transparent border-b border-white/10 py-3 sm:py-4 focus:outline-none focus:border-devarc-accent transition-colors text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/40">{t('contact.form.message')}</label>
                  <textarea rows={4} className="w-full bg-transparent border-b border-white/10 py-3 sm:py-4 focus:outline-none focus:border-devarc-accent transition-colors text-white resize-none" />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-devarc-accent text-white py-5 sm:py-6 rounded-xl sm:rounded-2xl font-bold uppercase tracking-widest text-[10px] sm:text-[11px] hover:bg-white hover:text-devarc-dark transition-all duration-500"
                >
                  {t('contact.form.submit')}
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
  const { t } = useTranslation();
  return (
    <footer className="bg-white py-12 sm:py-20 border-t border-devarc-dark/5 snap-start">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 sm:gap-12">
          <div className="text-2xl sm:text-3xl font-display font-bold tracking-tighter text-devarc-dark">
            DEV<span className="text-devarc-accent">ARC</span>
          </div>
          
          <div className="flex gap-8 sm:gap-12">
            {['Instagram', 'LinkedIn', 'Behance'].map(social => (
              <a key={social} href="#" className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-devarc-dark/40 hover:text-devarc-accent transition-colors">
                {social}
              </a>
            ))}
          </div>

          <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-devarc-dark/40">
            {t('footer.rights')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const archRef = useRef(null);
  const intRef = useRef(null);
  
  const isArchInView = useInView(archRef, { margin: "-10% 0px -10% 0px" });
  const isIntInView = useInView(intRef, { margin: "-10% 0px -10% 0px" });

  useEffect(() => {
    if (isArchInView || isIntInView) {
      document.documentElement.classList.add('snap-mandatory-active');
    } else {
      document.documentElement.classList.remove('snap-mandatory-active');
    }
  }, [isArchInView, isIntInView]);

  useEffect(() => {
    // Simulate preloading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen selection:bg-devarc-accent selection:text-white relative">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="loader" />}
      </AnimatePresence>
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <div ref={archRef}>
        <ArchitectureSteps />
      </div>
      <div ref={intRef}>
        <InteriorSteps />
      </div>
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
