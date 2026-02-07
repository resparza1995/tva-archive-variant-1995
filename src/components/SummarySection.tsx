import React from 'react';
import { motion } from 'framer-motion';

export const SummarySection: React.FC = () => {
    return (
        <section className="py-4 text-center relative z-10 bg-gradient-to-t from-slate-900 to-transparent mt-auto border-t border-white/5 flex flex-col items-center group/summary">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.05, skewX: -5 }}
                className="text-2xl font-bold mb-3 italic text-white/90 tracking-tight cursor-default transition-all duration-500 hover:text-loki-gold hover:drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]"
            >
                "For all time. Always."
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 0.8, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                whileHover={{ opacity: 1, scale: 1.01 }}
                className="max-w-3xl mx-auto text-slate-300 mb-6 leading-relaxed text-base px-4 transition-all duration-300 bg-white/0 hover:bg-white/[0.02] py-2 rounded-3xl"
            >
                Como <span className="text-loki-gold font-bold">Software Engineer</span>, me enfoco en la implementación de <span className="text-loki-purple font-bold italic">mejores prácticas</span> y el desarrollo de <span className="text-loki-blue font-bold italic">software seguro</span>.
                Mi expertise principal reside en el ecosistema <span className="text-white font-bold">Java</span>, manteniéndome a la vanguardia con herramientas de <span className="text-loki-cyan font-bold">GenAI </span>
                para potenciar la eficiencia y calidad técnica de cada solución.
            </motion.p>

            <div className="flex justify-center gap-16">
                {[
                    { label: 'Coding Languages', val: '+3', color: 'text-loki-purple' },
                    { label: 'Years', val: '5+', color: 'text-loki-blue' },
                    { label: 'Degrees', val: '2', color: 'text-loki-cyan' }
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 + (i * 0.1) }}
                        whileHover={{ y: -5, scale: 1.1 }}
                        className="text-center group"
                    >
                        <h4 className={`text-4xl font-bold ${stat.color} transition-all duration-300 drop-shadow-[0_0_8px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_0_15px_currentColor]`}>{stat.val}</h4>
                        <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mt-2 opacity-60">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            <footer className="mt-8 p-2 border-t border-white/5 w-full flex flex-col items-center gap-1 bg-black/50 overflow-hidden">
                <p className="text-[7px] font-mono text-slate-600 tracking-[0.3em] opacity-40 italic">TVA // TEMPORAL VARIANCE AUTHORITY DESIGN SYSTEM</p>
            </footer>
        </section>
    );
};
