import { useState, useEffect } from 'react';
import { TIMELINE_CONFIG } from '../data/timeline';

export const useTimelineDimensions = () => {
    const [dimensions, setDimensions] = useState({
        ...TIMELINE_CONFIG,
        isMobile: false
    });

    useEffect(() => {
        const update = () => {
            const h = window.innerHeight;
            const w = window.innerWidth;
            const isMobile = w < 768 || h < 600;

            // Adjust Year Width based on screen width
            const yearWidth = w < 1024 ? 280 : 360;

            // Calculate center and spacing based on actual height
            // Header is ~100px, Footer is ~80px
            const availableHeight = h - 200; // Account for header and footer more accurately

            // Proportional spread to match the "original" look
            // On desktop, the spread should be about 22-25% of the height
            // On mobile, we need a bit more density
            const spread = isMobile ? availableHeight * 0.35 : availableHeight * 0.22;

            // On desktop, centerY was 310. In a typical 900px height, that's ~1/3 from top
            const centerY = isMobile ? (100 + availableHeight / 2) : (h * 0.35);

            setDimensions({
                ...TIMELINE_CONFIG,
                yearWidth,
                timelineY: centerY,
                eduY: centerY - spread,
                certY: centerY - spread * 0.5,
                workY: centerY + spread * 1.5, // Work branch usually goes further down
                isMobile
            });
        };

        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    return dimensions;
};
