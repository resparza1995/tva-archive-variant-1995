import { TimelineEvent } from '../types/timeline';

export const timelineData: TimelineEvent[] = [
    {
        id: 'base-1',
        year: 1995,
        title: 'Nacimiento',
        subtitle: 'Bilbao, Vizcaya',
        description: ['Punto de origen de la línea temporal.'],
        type: 'education',
        location: 'Bilbao',
        dateRange: '03/08/1995'
    },
    {
        id: 'ase-2016',
        year: 2016,
        title: 'Administración de Sistemas Informáticos en Red',
        subtitle: 'CIP FP Batoi - Formación Profesional Superior.',
        description: ['Administración de servidores Linux / Windows', 'Virtualización', 'Redes'],
        type: 'education',
        location: 'Alcoy',
        dateRange: '2014 - 2016'
    },
    {
        id: 'work-2016',
        year: 2016,
        title: 'Administrador de sistemas (Prácticas)',
        subtitle: 'INASE Informática',
        description: ['Mantenimiento de servidores Windows.', 'Configuración e instalación de dispositivos en red.', 'Servicio técnico.'],
        type: 'work',
        location: 'Ontinyent',
        dateRange: '04/2016 - 08/2016'
    },
    {
        id: 'edu-2020',
        year: 2020,
        title: 'Bachelor of ICT',
        subtitle: 'LAB University of Applied Sciences',
        description: ['Double Degree program.', 'Erasmus+ Exchange program.'],
        type: 'education',
        location: 'Lahti, Finland',
        dateRange: '2020'
    },
    {
        id: 'work-2020',
        year: 2020,
        title: 'Software Developer',
        subtitle: 'MERAKY Technology',
        description: ['Diseño y desarrollo de soluciones para ingeniería industrial.', 'Visión artificial y robótica.'],
        technologies: ['Python', 'Java', 'Javascript', 'SQL', 'OpenCV', 'Raspberry Pi', 'Arduino', 'Python'],
        type: 'work',
        location: 'Ontinyent',
        dateRange: '06/2020 - 12/2020'
    },
    {
        id: 'edu-2021',
        year: 2021,
        title: 'Grado en Ingeniería Informática',
        subtitle: 'Universitat Politècnica de València (UPV)',
        description: ['Especialización en administración de redes y sistemas.', 'TFG: Dataset for artificial intelligence.'],
        type: 'education',
        location: 'Alcoy',
        dateRange: '2016 - 2021'
    },
    {
        id: 'work-2021',
        year: 2021,
        title: 'Fullstack Developer',
        subtitle: 'Devoltec',
        description: [
            'Desarrollo de un ERP Web a medida.',
            'Diseño de sistema de control de producción con sockets y MQTT.',
            'Migración de proyectos .NET 7 a .NET 8.'
        ],
        technologies: ['Java', 'Node.js', 'Express', 'NestJS', 'Typescript', '.Net', 'Angular', 'SQL', 'NoSQL', 'MQTT'],
        type: 'work',
        location: 'Ontinyent',
        dateRange: '08/2021 - 03/2024'
    },
    {
        id: 'edu-2023',
        year: 2023,
        title: 'Máster en Ingeniería y Tecnología de Sistemas Software',
        subtitle: 'Universitat Politècnica de València (UPV)',
        description: ['Especialización avanzada en desarrollo de software.', 'TFM: Análisis y corrección de vulnerabilidades de un producto software con SonarQube.'],
        type: 'education',
        location: 'Valencia',
        dateRange: '2021 - 2023'
    },
    {
        id: 'work-2024',
        year: 2024,
        title: 'Engineer',
        subtitle: 'NTTDATA',
        description: [
            'Proyectos para el sector público: banca, sanidad y movilidad.',
            'Referente técnico',
            'Análisis, diseño, desarrollo y mantenimiento de soluciones software.',
            'Promover buenas prácticas y estándares de calidad.'
        ],
        technologies: ['Java', 'JSP', 'PL/SQL', 'Git', 'SonarQube', 'Oracle SQL', 'GenAI'],
        type: 'work',
        location: 'Bilbao',
        dateRange: '04/2024 - Actualidad'
    },
    {
        id: 'cert-2025-1',
        year: 2025,
        title: 'Certified Cloud Associate',
        subtitle: 'INE Security',
        description: ['Certificación profesional en fundamentos de Cloud Security.'],
        type: 'cert',
        location: 'Remote',
        dateRange: '01/2025'
    },
    {
        id: 'cert-2025-2',
        year: 2025.6,
        title: 'eJPTv2 Certificate',
        subtitle: 'eLearnSecurity Junior Penetration Tester',
        description: ['Certificación profesional en Pentesting y Ciberseguridad ofensiva.'],
        type: 'cert',
        location: 'Remote',
        dateRange: '08/2025'
    }
];

export const TIMELINE_CONFIG = {
    startYear: 2014,
    endYear: 2026,
    yearWidth: 330,
    timelineY: 280,
    eduY: 140,
    certY: 190,
    workY: 380,
    padding: 200
};
