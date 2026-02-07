import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, GraduationCap, Code2, ChevronLeft, ChevronRight } from 'lucide-react';
import { TimelineEvent } from '../types/timeline';
import { timelineData } from '../data/timeline';
import { getX, getY, generateMainPath } from '../utils/timeline';
import { useTimelineDimensions } from '../hooks/useTimelineDimensions';
import { clsx } from 'clsx';

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

    const config = useTimelineDimensions();
    const { startYear, endYear, yearWidth, timelineY, eduY, certY, workY } = config;
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
        { d: generateMainPath(timelineWidth, config), color: '#8b5cf6', width: 6, opacity: 0.8 },
        { d: `M ${getX(2014, config)} ${timelineY} C ${getX(2015, config)} ${timelineY}, ${getX(2015, config)} ${eduY}, ${getX(2016, config)} ${eduY} L ${getX(2023, config)} ${eduY} C ${getX(2023.5, config)} ${eduY}, ${getX(2023.8, config)} ${timelineY}, ${getX(2024, config)} ${timelineY}`, color: '#a78bfa', width: 2, opacity: 0.5 },
        { d: `M ${getX(2024.5, config)} ${timelineY} C ${getX(2024.7, config)} ${timelineY}, ${getX(2024.8, config)} ${certY}, ${getX(2025, config)} ${certY} L ${getX(2026, config)} ${certY}`, color: '#06b6d4', width: 2, opacity: 0.4 },
        { d: `M ${getX(2016, config)} ${timelineY} C ${getX(2017, config)} ${timelineY}, ${getX(2017, config)} ${workY}, ${getX(2018, config)} ${workY} L ${getX(endYear, config)} ${workY}`, color: '#3b82f6', width: 2, opacity: 0.5 },
    ];

    return (
        <div className="flex-1 relative overflow-hidden bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.03)_0%,transparent_100%)]">
            {/* Scroll Indicator */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-loki-purple z-[100] origin-left"
                style={{ scaleX }}
            />

            {/* Navigation Arrows */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-loki-bg to-transparent z-40 pointer-events-none flex items-center justify-start px-8">
                <button
                    onClick={() => scrollBy(-400)}
                    className="p-4 text-white/20 hover:text-loki-gold transition-all pointer-events-auto"
                >
                    <ChevronLeft size={48} strokeWidth={1} />
                </button>
            </div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-loki-bg to-transparent z-40 pointer-events-none flex items-center justify-end px-8">
                <button
                    onClick={() => scrollBy(400)}
                    className="p-4 text-white/20 hover:text-loki-gold transition-all pointer-events-auto"
                >
                    <ChevronRight size={48} strokeWidth={1} />
                </button>
            </div>

            <div
                ref={containerRef}
                className="h-full overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing scrollbar-none"
                onMouseDown={handleMouseDown}
                onMouseLeave={() => setIsDragging(false)}
                onMouseUp={() => setIsDragging(false)}
                onMouseMove={handleMouseMove}
            >
                <div
                    className="relative h-full"
                    style={{ width: `${timelineWidth + 400}px` }}
                >
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <defs>
                            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.03" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />

                        {/* Background strands - only on desktop */}
                        {!config.isMobile && [...Array(10)].map((_, i) => (
                            <motion.path
                                key={`strand-${i}`}
                                d={`M 0 ${timelineY + (i - 5) * 4} L ${timelineWidth + 400} ${timelineY + (i - 5) * 2}`}
                                stroke={i % 2 === 0 ? "#8b5cf6" : "#3b82f6"}
                                strokeWidth="0.5"
                                fill="none"
                                className="opacity-[0.05]"
                                animate={{ opacity: [0.03, 0.08, 0.03] }}
                                transition={{ duration: 4 + i, repeat: Infinity }}
                            />
                        ))}

                        {branchPaths.map((path, i) => (
                            <motion.path
                                key={i}
                                d={path.d}
                                stroke={path.color}
                                strokeWidth={path.width}
                                fill="none"
                                opacity={path.opacity}
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                        ))}
                    </svg>

                    {/* Timeline Nodes */}
                    {timelineData.map((event) => {
                        const x = getX(event.year, config);
                        const y = getY(event.type, event.year, config);
                        const isAbove = y <= timelineY;

                        return (
                            <div
                                key={event.id}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-[50]"
                                style={{ left: `${x}px`, top: `${y}px` }}
                            >
                                <div className="relative flex flex-col items-center">
                                    {/* Labels - Above for Top Branches, Below for Bottom Branches */}
                                    <div className={clsx(
                                        "absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none px-4 text-center w-[200px]",
                                        isAbove ? "bottom-full mb-6" : "top-full mt-6"
                                    )}>
                                        <p className="text-[10px] font-mono text-loki-gold tracking-[0.2em] mb-1">{event.dateRange}</p>
                                        <p className="text-[11px] whitespace-normal opacity-80 group-hover:opacity-100 transition-all group-hover:text-white uppercase tracking-tight leading-tight font-medium">
                                            {event.title.split('|')[0]}
                                        </p>
                                    </div>

                                    {/* Vertical Connector */}
                                    <div
                                        className={clsx(
                                            "w-[1px] bg-gradient-to-t from-white/10 to-transparent absolute pointer-events-none opacity-20 group-hover:opacity-100 transition-all",
                                            isAbove ? "top-full" : "bottom-full"
                                        )}
                                        style={{
                                            height: Math.abs(y - timelineY) - 15,
                                            transform: isAbove ? 'translateY(15px)' : 'translateY(-15px)'
                                        }}
                                    />

                                    <motion.button
                                        whileHover={{ scale: 1.2, rotate: 45 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => onSelectEvent(event)}
                                        className={clsx(
                                            "w-8 h-8 rotate-45 border-2 flex items-center justify-center transition-all duration-300 shadow-lg relative z-10",
                                            event.type === 'education' ? "bg-slate-900 border-loki-purple text-loki-purple shadow-loki-purple/20 hover:shadow-loki-purple/40" :
                                                event.type === 'cert' ? "bg-slate-900 border-loki-cyan text-loki-cyan shadow-loki-cyan/20 hover:shadow-loki-cyan/40" :
                                                    "bg-slate-900 border-loki-blue text-loki-blue shadow-loki-blue/20 hover:shadow-loki-blue/40"
                                        )}
                                    >
                                        <div className="-rotate-45">
                                            {event.type === 'education' ? <GraduationCap size={12} /> :
                                                event.type === 'cert' ? <Code2 size={12} /> :
                                                    <Briefcase size={12} />}
                                        </div>
                                    </motion.button>
                                </div>
                            </div>
                        );
                    })}

                    {/* Year Markers */}
                    <div className="absolute bottom-16 flex" style={{ left: config.padding, width: timelineWidth }}>
                        {Array.from({ length: endYear - startYear + 1 }).map((_, i) => (
                            <div key={i} className="flex flex-col items-center group relative" style={{ width: 0, overflow: 'visible' }}>
                                <div className="absolute left-0 -translate-x-1/2 flex flex-col items-center">
                                    <div className="w-[1px] h-10 bg-white/5 group-hover:bg-white/20 transition-colors" />
                                    <span className="text-[9px] font-mono mt-4 opacity-20 group-hover:opacity-100 transition-opacity text-loki-cyan">{startYear + i}</span>
                                </div>
                                {i < (endYear - startYear) && (
                                    <div style={{ width: yearWidth }} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
