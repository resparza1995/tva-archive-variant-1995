import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SummarySectionProps {
    isVisible: boolean;
}

export const SummarySection: React.FC<SummarySectionProps> = ({ isVisible }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.section
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="relative z-10 bg-gradient-to-t from-slate-900 to-transparent border-t border-white/5 flex flex-col items-center group/summary overflow-hidden flex-shrink-0"
                >
                    <div className="pt-8 pb-4 flex flex-col items-center w-full">
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl font-bold mb-4 italic text-white/90 tracking-tight cursor-default transition-all duration-500 hover:text-loki-gold hover:drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]"
                        >
                            "For all time. Always."
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.8 }}
                            transition={{ delay: 0.3 }}
                            className="max-w-3xl mx-auto text-slate-300 mb-8 leading-relaxed text-base px-6 text-center"
                        >
                            Como <span className="text-loki-gold font-bold">Ingeniero de Software</span>, me centro en el desarrollo de <span className="text-loki-blue font-bold italic">software seguro</span> siguiendo las <span className="text-loki-purple font-bold italic">mejores prácticas</span>.
                            Mi expertise principal reside en el ecosistema <span className="text-white font-bold">Java</span>, manteniéndome a la vanguardia con herramientas de <span className="text-loki-cyan font-bold">GenAI </span>
                            para potenciar la eficiencia y calidad técnica de cada solución.
                        </motion.p>

                        <div className="flex justify-center gap-16 mb-10">
                            {[
                                { label: 'Coding Languages', val: '+3', color: 'text-loki-purple' },
                                { label: 'Years', val: '5+', color: 'text-loki-blue' },
                                { label: 'Degrees', val: '2', color: 'text-loki-cyan' }
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
                                    className="text-center group"
                                >
                                    <h4 className={`text-4xl font-bold ${stat.color} transition-all duration-300 drop-shadow-[0_0_8px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_0_15px_currentColor]`}>{stat.val}</h4>
                                    <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mt-2 opacity-60">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <footer className="py-3 border-t border-white/5 w-full flex flex-col items-center bg-black/40 backdrop-blur-md">
                        <p className="text-[7px] font-mono text-slate-500 tracking-[0.4em] opacity-40 italic uppercase">TVA // TEMPORAL VARIANCE AUTHORITY // RECORD ARCHIVE SYSTEM</p>
                    </footer>
                </motion.section>
            )}
        </AnimatePresence>
    );
};
