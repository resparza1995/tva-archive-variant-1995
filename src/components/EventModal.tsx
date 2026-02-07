import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import { TimelineEvent } from '../types/timeline';

interface EventModalProps {
    event: TimelineEvent | null;
    onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
    return (
        <AnimatePresence>
            {event && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-10 bg-loki-bg/90 backdrop-blur-xl"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 50 }}
                        className="bg-slate-900 border border-white/10 rounded-[2rem] max-w-4xl w-full h-[80vh] flex flex-col overflow-hidden relative shadow-[0_0_100px_rgba(0,0,0,0.8)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={`h-2 w-full ${event.type === 'education' ? 'bg-loki-purple' : event.type === 'cert' ? 'bg-loki-cyan' : 'bg-loki-blue'}`} />
                        <div className="flex-1 overflow-y-auto p-8 sm:p-12 scrollbar-thin scrollbar-thumb-white/10">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-12">
                                <div className="max-w-xl">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-loki-gold text-[10px] font-mono uppercase tracking-[0.2em]">
                                            {event.type === 'education' ? 'Learning_Stream' : event.type === 'cert' ? 'Cert_Verification' : 'Experience_Log'}
                                        </span>
                                        <span className="text-[10px] font-mono text-white/30 tracking-widest">STAMP://{event.dateRange}</span>
                                    </div>
                                    <h2 className="text-2xl sm:text-4xl font-black text-white italic tracking-tighter leading-[1.1] mb-4 uppercase">{event.title}</h2>
                                    <p className="text-lg sm:text-xl text-loki-cyan/80 font-medium italic opacity-80">{event.subtitle}</p>
                                </div>
                                <button onClick={onClose} className="group flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase opacity-40 hover:opacity-100 transition-opacity bg-white/5 px-6 py-3 rounded-full border border-white/10">Return to Timeline</button>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                                <div className="lg:col-span-8 space-y-12">
                                    <section>
                                        <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] mb-6">Entry Description</h3>
                                        <ul className="space-y-6">
                                            {event.description.map((item, i) => (
                                                <li key={i} className="flex gap-6 items-start group">
                                                    <span className="text-loki-purple text-2xl font-black opacity-30 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                                                    <p className="text-lg sm:text-xl text-slate-300 leading-relaxed pt-1">{item}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                    {event.technologies && (
                                        <section>
                                            <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] mb-4">Core Technologies</h3>
                                            <div className="flex flex-wrap gap-3">
                                                {event.technologies.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-4 py-2 rounded-xl bg-loki-cyan/5 border border-loki-cyan/20 text-xs text-loki-cyan font-mono hover:bg-loki-cyan/10 hover:border-loki-cyan/40 transition-all cursor-default shadow-[0_0_20px_rgba(6,182,212,0.05)]"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </section>
                                    )}
                                </div>
                                <div className="lg:col-span-4 space-y-8">
                                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6 shadow-glow">
                                        <div>
                                            <p className="text-[9px] font-mono text-white/40 uppercase tracking-widest mb-2">Location Coordinates</p>
                                            <div className="flex items-center gap-3 text-white"><MapPin size={18} className="text-loki-cyan" /><span className="text-sm font-bold uppercase">{event.location}</span></div>
                                        </div>
                                        <div className="w-full h-[1px] bg-white/10" />
                                        <div>
                                            <p className="text-[9px] font-mono text-white/40 uppercase tracking-widest mb-2">Temporal Window</p>
                                            <div className="flex items-center gap-3 text-white"><Calendar size={18} className="text-loki-purple" /><span className="text-sm font-bold uppercase">{event.dateRange}</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
