
import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../data/projects';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const ProjectsPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-32 pb-20 bg-devarc-paper min-h-screen">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="mb-16">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-devarc-dark/60 hover:text-devarc-accent transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            {t('nav.backToHome', 'Back to Home')}
          </Link>
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h1 className="text-5xl sm:text-7xl font-display font-bold text-devarc-dark tracking-tighter mb-4">
              {t('portfolio.allProjects', 'All Projects')}
            </h1>
            <p className="text-devarc-muted text-lg max-w-2xl">
              {t('portfolio.allProjectsDesc', 'Explore our complete collection of architectural marvels, interior sanctuaries, and exterior landscapes.')}
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {PROJECTS.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-4 group-hover:translate-y-0">
                  <ArrowUpRight size={20} className="text-white" />
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-devarc-accent mb-1 block">
                    {t(`portfolio.categories.${project.category.toLowerCase()}`)}
                  </span>
                  <h4 className="text-xl font-display font-bold text-devarc-dark group-hover:text-devarc-accent transition-colors">{project.title}</h4>
                </div>
                <span className="text-[10px] font-bold text-devarc-muted mt-2">{project.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProjectsPage;
