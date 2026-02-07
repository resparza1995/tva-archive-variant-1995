import { TIMELINE_CONFIG } from '../data/timeline';

export const getX = (year: number, config = TIMELINE_CONFIG) => {
    return (year - config.startYear) * config.yearWidth + config.padding;
};

export const getY = (type: string, year: number, config = TIMELINE_CONFIG) => {
    const { timelineY, eduY, certY, workY } = config;
    if (type === 'education') {
        if (year === 1995) return timelineY;
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

export const generateMainPath = (width: number, config = TIMELINE_CONFIG) => {
    const { timelineY } = config;
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
