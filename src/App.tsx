import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, Info } from 'lucide-react';
import { TimelineEvent } from './types/timeline';
import { Header } from './components/Header';
import { Timeline } from './components/Timeline';
import { EventModal } from './components/EventModal';
import { SummarySection } from './components/SummarySection';
import { OrientationOverlay } from './components/OrientationOverlay';

const App: React.FC = () => {
    const [selectedNode, setSelectedNode] = useState<TimelineEvent | null>(null);
    const [showSummary, setShowSummary] = useState(window.innerWidth > 1024);

    return (
        <div className="h-screen w-screen bg-loki-bg text-slate-200 overflow-hidden flex flex-col font-sans select-none">
            <OrientationOverlay />

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-loki-purple/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-loki-blue/10 rounded-full blur-[120px]" />
            </div>

            <Header />

            <Timeline onSelectEvent={setSelectedNode} />

            {/* Bottom Controls & Status */}
            <div className="fixed bottom-0 left-0 w-full p-8 z-[60] flex items-end justify-between pointer-events-none px-12 pb-10">
                <div className="flex gap-4 items-end">
                    <div className="hidden lg:flex bg-black/40 backdrop-blur-md border border-white/10 p-3 rounded-xl flex-col gap-1 items-start pointer-events-auto shadow-2xl">
                        <p className="text-[8px] font-mono text-loki-gold tracking-widest opacity-50 uppercase">Temporal Loom Throughput</p>
                        <div className="flex gap-1 h-3 items-end">
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ height: [4, Math.random() * 12 + 2, 4] }}
                                    transition={{ duration: 0.5 + Math.random(), repeat: Infinity }}
                                    className="w-1 bg-loki-purple opacity-40 rounded-full"
                                />
                            ))}
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowSummary(!showSummary)}
                        className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-xl flex items-center gap-2 pointer-events-auto shadow-2xl group transition-colors"
                    >
                        <motion.div
                            animate={{ rotate: showSummary ? 180 : 0 }}
                            className="text-loki-gold"
                        >
                            <ChevronUp size={16} />
                        </motion.div>
                        <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest">
                            {showSummary ? 'Hide Record' : 'View Record'}
                        </span>
                    </motion.button>
                </div>

                <div className="hidden lg:flex flex-col items-end gap-1 pointer-events-auto bg-black/40 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-2xl">
                    <p className="text-[8px] font-mono text-slate-500 tracking-[0.3em] uppercase">Status: <span className="text-loki-gold">Active</span></p>
                    <p className="text-[8px] font-mono text-loki-cyan tracking-[0.3em] uppercase">Timeline: Stable</p>
                </div>
            </div>

            <EventModal event={selectedNode} onClose={() => setSelectedNode(null)} />

            <SummarySection isVisible={showSummary} />
        </div>
    );
};

export default App;
