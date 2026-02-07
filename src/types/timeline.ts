export type EventType = 'work' | 'education' | 'cert';

export interface TimelineEvent {
    id: string;
    year: number;
    title: string;
    subtitle: string;
    description: string[];
    type: EventType;
    technologies?: string[];
    location: string;
    dateRange: string;
}
