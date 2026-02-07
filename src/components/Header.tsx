import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';

export const Header: React.FC = () => {
    return (
        <header className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-start pointer-events-none">
            <div className="flex flex-col gap-1 pointer-events-auto">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4">
                    <motion.div
                        whileHover={{ scale: 1.15, rotate: 5, boxShadow: "0 0 25px rgba(196,181,253,0.5)" }}
                        className="w-12 h-12 rounded-full border-2 border-loki-gold flex items-center justify-center text-loki-gold font-bold text-xl shadow-[0_0_15px_rgba(196,181,253,0.3)] bg-loki-bg cursor-pointer transition-shadow"
                    >
                        R
                    </motion.div>
                    <div>
                        <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-loki-purple via-loki-gold to-loki-blue tracking-[0.1em]">RAFA ESPARZA</h1>
                        <div className="flex flex-col -mt-0.5">
                            <p className="text-sm font-bold text-loki-cyan/90 tracking-widest uppercase">Software Engineer</p>
                            <p className="text-[10px] tracking-[0.5em] text-white/40 font-mono">VARIANT ID: 1995-08-03</p>
                        </div>
                    </div>
                </motion.div>
            </div>
            <nav className="flex gap-6 bg-white/5 backdrop-blur-xl p-4 rounded-2xl border border-white/10 pointer-events-auto">
                <a href="https://github.com/resparza1995" target="_blank" rel="noopener noreferrer" className="hover:text-loki-purple transition-all hover:scale-110"><Github size={20} /></a>
                <a href="https://linkedin.com/in/raestor" target="_blank" rel="noopener noreferrer" className="hover:text-loki-blue transition-all hover:scale-110"><Linkedin size={20} /></a>
            </nav>
        </header>
    );
};
