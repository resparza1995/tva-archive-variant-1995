import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone } from 'lucide-react';

export const OrientationOverlay: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[1000] bg-loki-bg flex flex-col items-center justify-center p-8 text-center sm:hidden landscape:hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-loki-purple/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-loki-blue/20 rounded-full blur-[100px]" />
            </div>

            <motion.div
                animate={{
                    rotate: [0, 90, 90, 0, 0],
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    times: [0, 0.3, 0.6, 0.9, 1]
                }}
                className="text-loki-gold mb-8"
            >
                <Smartphone size={80} strokeWidth={1} />
            </motion.div>

            <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-4">
                Temporal Registry Restricted
            </h2>

            <p className="text-slate-400 text-sm font-mono leading-relaxed mb-8 max-w-[250px]">
                Please rotate your device to <span className="text-loki-cyan">Landscape Mode</span> to access the TVA Archive correctly.
            </p>

            <div className="flex flex-col items-center gap-2">
                <span className="text-[8px] font-mono text-slate-600 tracking-[0.4em] uppercase">Status: Awaiting Rotation</span>
                <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                            className="w-1.5 h-1.5 rounded-full bg-loki-gold"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
