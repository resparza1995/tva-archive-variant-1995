import { TIMELINE_CONFIG } from '../data/timeline';

export const getX = (year: number) => {
    return (year - TIMELINE_CONFIG.startYear) * TIMELINE_CONFIG.yearWidth + TIMELINE_CONFIG.padding;
};

export const getY = (type: string, year: number) => {
    const { timelineY, eduY, certY, workY } = TIMELINE_CONFIG;
    if (type === 'education') {
        if (year === 1995 || year === 2023) return timelineY;
        return eduY;
    }
    if (type === 'cert') return certY;
    if (type === 'work') {
        if (year === 2016) return timelineY + 50;
        if (year === 2017) return (timelineY + workY) / 2;
        return workY;
    }
    return workY;
};

export const generateMainPath = (width: number) => {
    const { timelineY } = TIMELINE_CONFIG;
    let path = `M 0 ${timelineY}`;
    const segments = 24;
    const segmentWidth = width / segments;
    for (let i = 1; i <= segments; i++) {
        const x = i * segmentWidth;
        const y = timelineY + Math.sin(i) * 3;
        const cp1x = x - segmentWidth / 2;
        path += ` Q ${cp1x} ${timelineY + Math.sin(i - 1) * 3}, ${x} ${y}`;
    }
    return path;
};
