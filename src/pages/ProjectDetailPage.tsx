
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowUpRight, Globe, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROJECTS } from '../data/projects';

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const project = PROJECTS.find(p => p.id === Number(id));

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (project && selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % project.gallery.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (project && selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + project.gallery.length) % project.gallery.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedImageIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-devarc-paper">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Project Not Found</h1>
          <Link to="/projects" className="text-devarc-accent font-bold uppercase tracking-widest text-sm">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-devarc-paper min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-8">
        <Link 
          to="/projects" 
          className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-devarc-dark/60 hover:text-devarc-accent transition-colors mb-12 group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          {t('nav.backToProjects', 'Back to Projects')}
        </Link>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Chaotic Image Grid */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.gallery.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative rounded-2xl overflow-hidden shadow-sm group cursor-zoom-in ${
                    idx % 3 === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-square'
                  } ${idx % 4 === 1 ? 'md:mt-12' : ''} ${idx % 4 === 2 ? 'md:-mt-12' : ''}`}
                  onClick={() => setSelectedImageIndex(idx)}
                >
                  <img 
                    src={img} 
                    alt={`${project.title} gallery ${idx}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-devarc-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-500">
                      <Maximize2 size={20} className="text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-32 space-y-12">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-devarc-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">
                  {t(`portfolio.categories.${project.category.toLowerCase()}`)}
                </span>
                <h1 className="text-4xl sm:text-6xl font-display font-bold text-devarc-dark tracking-tighter mb-8 leading-tight">
                  {project.title}
                </h1>
                
                <div className="space-y-8">
                  <div>
                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-devarc-dark/40 mb-3">Description</h5>
                    <p className="text-devarc-muted text-lg leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex justify-between py-6 border-y border-devarc-dark/5">
                    <div>
                      <h5 className="text-[10px] font-bold uppercase tracking-widest text-devarc-dark/40 mb-1">Year</h5>
                      <p className="text-sm font-bold text-devarc-dark">{project.year}</p>
                    </div>
                    <div>
                      <h5 className="text-[10px] font-bold uppercase tracking-widest text-devarc-dark/40 mb-1">Location</h5>
                      <p className="text-sm font-bold text-devarc-dark">Tashkent, UZ</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-devarc-dark text-white py-6 rounded-2xl font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 group hover:bg-devarc-accent transition-all duration-500"
                    >
                      <Globe size={18} className="group-hover:rotate-12 transition-transform" />
                      See Immersive 360°
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Related Projects or CTA */}
              <div className="pt-12 border-t border-devarc-dark/5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-devarc-dark/40 mb-6">Next Project</p>
                <Link 
                  to={`/projects/${project.id === PROJECTS.length ? 1 : project.id + 1}`}
                  className="group block"
                >
                  <h4 className="text-2xl font-display font-bold text-devarc-dark group-hover:text-devarc-accent transition-colors flex items-center gap-4">
                    {PROJECTS[project.id % PROJECTS.length].title}
                    <ArrowUpRight size={24} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </h4>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && project && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-devarc-dark/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-12"
            onClick={() => setSelectedImageIndex(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors z-[110] p-2"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex(null);
              }}
            >
              <X size={32} />
            </motion.button>

            {/* Navigation Buttons */}
            <button
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all z-[110] group"
              onClick={handlePrev}
            >
              <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
            </button>

            <button
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all z-[110] group"
              onClick={handleNext}
            >
              <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 font-bold text-[10px] uppercase tracking-[0.4em]">
              {selectedImageIndex + 1} / {project.gallery.length}
            </div>
            
            <motion.img
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              src={project.gallery[selectedImageIndex]}
              alt="Full size"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl cursor-default"
              referrerPolicy="no-referrer"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default ProjectDetailPage;
