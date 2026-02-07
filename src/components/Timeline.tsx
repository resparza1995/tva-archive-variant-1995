import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, GraduationCap, Code2, ChevronLeft, ChevronRight } from 'lucide-react';
import { TimelineEvent } from '../types/timeline';
import { timelineData, TIMELINE_CONFIG } from '../data/timeline';
import { getX, getY, generateMainPath } from '../utils/timeline';

interface TimelineProps {
    onSelectEvent: (event: TimelineEvent) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ onSelectEvent }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollXProgress } = useScroll({ container: containerRef });
    const scaleX = useSpring(scrollXProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const { startYear, endYear, yearWidth, timelineY, eduY, certY, workY } = TIMELINE_CONFIG;
    const timelineWidth = (endYear - startYear + 1) * yearWidth;

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !containerRef.current) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const scrollBy = (amount: number) => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
        }
    };

    const branchPaths = [
        { d: generateMainPath(timelineWidth), color: '#8b5cf6', width: 6, opacity: 0.8 },
        { d: `M ${getX(2014)} ${timelineY} C ${getX(2015)} ${timelineY}, ${getX(2015)} ${eduY}, ${getX(2016)} ${eduY} L ${getX(2022)} ${eduY} C ${getX(2022.5)} ${eduY}, ${getX(2022.8)} ${timelineY}, ${getX(2023)} ${timelineY}`, color: '#a78bfa', width: 2, opacity: 0.5 },
        { d: `M ${getX(2024.5)} ${timelineY} C ${getX(2024.7)} ${timelineY}, ${getX(2024.8)} ${certY}, ${getX(2025)} ${certY} L ${getX(2026)} ${certY}`, color: '#06b6d4', width: 2, opacity: 0.4 },
        { d: `M ${getX(2016)} ${timelineY} C ${getX(2017)} ${timelineY}, ${getX(2017)} ${workY}, ${getX(2018)} ${workY} L ${getX(endYear)} ${workY}`, color: '#3b82f6', width: 2, opacity: 0.5 },
    ];

    return (
        <>
            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-loki-purple to-loki-cyan z-[100] origin-left" style={{ scaleX }} />

            <div className="fixed top-1/2 left-0 w-full -translate-y-1/2 flex justify-between px-2 z-40 pointer-events-none">
                <button onClick={() => scrollBy(-600)} className="p-8 flex items-center justify-center text-white/30 hover:text-white/90 transition-all pointer-events-auto group">
                    <div className="w-0.5 h-16 bg-white/20 group-hover:bg-loki-purple/70 transition-all mr-2 blur-[1px]" />
                    <ChevronLeft size={56} strokeWidth={1} className="group-hover:-translate-x-2 transition-transform" />
                </button>
                <button onClick={() => scrollBy(600)} className="p-8 flex items-center justify-center text-white/30 hover:text-white/90 transition-all pointer-events-auto group">
                    <ChevronRight size={56} strokeWidth={1} className="group-hover:translate-x-2 transition-transform" />
                    <div className="w-0.5 h-16 bg-white/20 group-hover:bg-loki-blue/70 transition-all ml-2 blur-[1px]" />
                </button>
            </div>

            <main
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={() => setIsDragging(false)}
                onMouseUp={() => setIsDragging(false)}
                onMouseMove={handleMouseMove}
                className={`flex-1 overflow-x-auto overflow-y-hidden relative select-none scrollbar-hide ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            >
                <div className="relative h-full" style={{ width: timelineWidth + 600 }}>
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

                    <svg className="absolute top-0 left-0 h-full w-full pointer-events-none overflow-visible">
                        <defs>
                            <filter id="main-glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /></filter>
                            <filter id="branch-glow"><feGaussianBlur stdDeviation="2" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /></filter>
                        </defs>
                        {[...Array(12)].map((_, i) => (
                            <motion.path key={`strand-${i}`} d={`M 0 ${timelineY + (i - 6) * 4} L ${timelineWidth + 400} ${timelineY + (i - 6) * 2.5}`} stroke={i % 2 === 0 ? "#8b5cf6" : "#3b82f6"} strokeWidth="0.5" fill="none" className="opacity-10" animate={{ opacity: [0.05, 0.15, 0.05], strokeWidth: [0.3, 0.7, 0.3] }} transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }} />
                        ))}
                        {branchPaths.map((p, i) => (
                            <motion.path key={i} d={p.d} stroke={p.color} strokeWidth={p.width} fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: p.opacity }} transition={{ duration: 3, delay: i * 0.4 }} filter={p.width > 3 ? "url(#main-glow)" : "url(#branch-glow)"} />
                        ))}
                    </svg>

                    {timelineData.map((event, index) => {
                        const x = getX(event.year);
                        const y = getY(event.type, event.year);

                        return (
                            <motion.div key={event.id} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + index * 0.05 }} style={{ left: x, top: y }} className="absolute -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center group">
                                <div
                                    className={`w-px bg-gradient-to-t from-white/20 to-transparent absolute ${y <= timelineY ? 'top-full' : 'bottom-full'} pointer-events-none opacity-20 group-hover:opacity-100 transition-all`}
                                    style={{ height: Math.abs(y - timelineY) }}
                                />
                                <motion.button
                                    whileHover={{ scale: 1.4, rotate: 45 }}
                                    onClick={() => { if (!isDragging) onSelectEvent(event); }}
                                    className={`w-7 h-7 rounded-sm border-2 rotate-45 flex items-center justify-center transition-all duration-500 overflow-hidden ${event.type === 'education' ? 'bg-loki-bg border-loki-purple shadow-[0_0_10px_#8b5cf6] text-loki-purple' :
                                        event.type === 'cert' ? 'bg-loki-bg border-loki-cyan shadow-[0_0_10px_#06b6d4] text-loki-cyan' :
                                            'bg-loki-bg border-loki-blue shadow-[0_0_10px_#3b82f6] text-loki-blue'
                                        } group-hover:border-white group-hover:shadow-[0_0_20px_white] cursor-pointer`}
                                >
                                    <div className="-rotate-45">
                                        {event.type === 'education' ? <GraduationCap size={12} /> :
                                            event.type === 'cert' ? <Code2 size={12} /> :
                                                <Briefcase size={12} />}
                                    </div>
                                </motion.button>
                                <div className="mt-5 flex flex-col items-center pointer-events-none px-4">
                                    <p className="text-[11px] font-mono text-loki-gold tracking-[0.2em] mb-1">{event.dateRange}</p>
                                    <p className="text-[12px] whitespace-nowrap opacity-80 group-hover:opacity-100 transition-all group-hover:text-white uppercase tracking-tight text-center max-w-[250px]">
                                        {event.title.split('|')[0]}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}

                    <div className="absolute bottom-20 left-0 flex" style={{ width: timelineWidth }}>
                        {Array.from({ length: endYear - startYear + 1 }).map((_, i) => (
                            <div key={i} style={{ width: yearWidth }} className="flex flex-col items-center group">
                                <div className="w-[1px] h-10 bg-white/5 group-hover:bg-white/20 transition-colors" />
                                <span className="text-[10px] font-mono mt-4 opacity-20 group-hover:opacity-100 transition-opacity text-loki-cyan">{startYear + i}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
};
