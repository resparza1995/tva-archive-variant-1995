import React, { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { timelineData } from '../data/timeline';
import { TimelineEvent } from '../types/timeline';

interface EventPointProps {
    event: TimelineEvent;
    onSelect: (event: TimelineEvent) => void;
    position: [number, number, number];
}

const EventPoint: React.FC<EventPointProps> = ({ event, onSelect, position }) => {
    const [hovered, setHovered] = useState(false);
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
            const s = hovered ? 1.8 : 1.1 + Math.sin(state.clock.elapsedTime * 1.5 + event.year) * 0.1;
            meshRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
        }
    });

    const getColor = (type: string) => {
        switch (type) {
            case 'education': return '#d8b4fe'; // Neon Purple
            case 'cert': return '#22d3ee'; // Neon Cyan
            case 'work': return '#60a5fa'; // Neon Blue
            default: return '#ffffff';
        }
    };

    const color = getColor(event.type);

    return (
        <group position={position}>
            <mesh
                ref={meshRef}
                onClick={() => onSelect(event)}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <octahedronGeometry args={[0.22, 0]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={hovered ? 8 : 3}
                    metalness={0.9}
                    roughness={0.2}
                />
            </mesh>

            <pointLight distance={3} intensity={hovered ? 2 : 0.6} color={color} />

            {hovered && (
                <Html distanceFactor={10} position={[0, 1.2, 0]} center>
                    <div className="pointer-events-none select-none flex flex-col items-center">
                        <div className="bg-black/95 backdrop-blur-3xl border-2 border-white/20 px-8 py-5 rounded-2xl text-[14px] whitespace-nowrap text-white font-mono uppercase tracking-[0.2em] shadow-[0_0_60px_rgba(0,0,0,1)] flex flex-col items-center gap-3 min-w-[280px]">
                            <span style={{ color }} className="font-black border-b border-white/10 pb-2 w-full text-center text-base tracking-widest">{event.dateRange}</span>
                            <span className="text-white font-black text-center leading-tight text-lg max-w-[350px] whitespace-normal uppercase tracking-tighter italic">{event.title}</span>
                            <div className="w-16 h-[2px] bg-white/20 my-1 rounded-full" />
                            <span className="text-[11px] text-white/50 font-bold tracking-[0.3em]">{event.location}</span>
                        </div>
                    </div>
                </Html>
            )}
        </group>
    );
};

const TimelinePath: React.FC<{ points: [number, number, number][], color: string, radius: number }> = ({ points, color, radius }) => {
    const spherePoints = useMemo(() => {
        if (points.length < 2) return [];

        const pathPoints: THREE.Vector3[] = [];
        const segmentsPerStep = 15;

        for (let i = 0; i < points.length - 1; i++) {
            const start = new THREE.Vector3(...points[i]);
            const end = new THREE.Vector3(...points[i + 1]);

            for (let j = 0; j <= segmentsPerStep; j++) {
                const t = j / segmentsPerStep;
                // Slerp for better spherical pathing
                const p = new THREE.Vector3().lerpVectors(start, end, t);
                p.normalize().multiplyScalar(radius + 0.1);
                pathPoints.push(p);
            }
        }
        return pathPoints;
    }, [points, radius]);

    return (
        <group>
            {/* Bead based path (Nodes) */}
            {spherePoints.map((p, i) => (
                <mesh key={i} position={p}>
                    <boxGeometry args={[0.04, 0.04, 0.04]} />
                    <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={i % 3 === 0 ? 5 : 1}
                        transparent
                        opacity={0.4}
                    />
                </mesh>
            ))}
        </group>
    );
};

export const TimelineSphere: React.FC<{ onSelectEvent: (event: TimelineEvent) => void }> = ({ onSelectEvent }) => {
    const radius = 8;

    const eventPoints = useMemo(() => {
        const sortedData = [...timelineData].sort((a, b) => a.year - b.year);
        const startYear = 1995;
        const endYear = 2026;
        const totalYears = endYear - startYear + 1;

        return sortedData.map((event, i) => {
            const t = (event.year - startYear) / totalYears;

            // Map types to distinct spherical zones
            // Education = North Hemisphere, Certs = Equator, Work = South Hemisphere
            let latOffset = 0;
            if (event.type === 'education') latOffset = 0.5; // Top
            if (event.type === 'cert') latOffset = 0;      // Middle
            if (event.type === 'work') latOffset = -0.5;   // Bottom

            // Longitudinal spread following time
            const phi = (t * Math.PI * 4) + (i * 0.2);
            // Latitude with slight drift based on time for organic look
            const theta = Math.acos(latOffset + Math.sin(t * Math.PI) * 0.3);

            const radiusOffset = radius + 0.1;
            const x = radiusOffset * Math.sin(theta) * Math.cos(phi);
            const y = radiusOffset * Math.cos(theta);
            const z = radiusOffset * Math.sin(theta) * Math.sin(phi);

            return {
                event,
                position: [x, y, z] as [number, number, number]
            };
        });
    }, [radius]);

    const branches = useMemo(() => {
        const types = ['education', 'work', 'cert'];
        // Find the absolute earliest event position to use as the common root
        const rootPoint = [...eventPoints].sort((a, b) => a.event.year - b.event.year)[0]?.position;

        return types.map(type => {
            const categoryPoints = eventPoints
                .filter(p => p.event.type === type)
                .sort((a, b) => a.event.year - b.event.year)
                .map(p => p.position);

            // Prepend the root point if it's not already the first element
            const joinedPoints = rootPoint ? [rootPoint, ...categoryPoints] : categoryPoints;

            const color = type === 'education' ? '#d8b4fe' : type === 'cert' ? '#22d3ee' : '#60a5fa';
            return joinedPoints.length > 1 ? { points: joinedPoints, color } : null;
        }).filter(Boolean);
    }, [eventPoints]);

    return (
        <div className="flex-1 w-full h-0 relative bg-[#000000] cursor-move">
            <Canvas shadows dpr={[1, 1.5]} gl={{ toneMapping: THREE.NoToneMapping }}>
                <PerspectiveCamera makeDefault position={[18, 18, 18]} fov={40} />
                <fog attach="fog" args={['#000000', 10, 50]} />

                <ambientLight intensity={0.05} />

                <Suspense fallback={null}>
                    <group>
                        <EffectComposer multisampling={0}>
                            <Bloom luminanceThreshold={0.2} intensity={0.4} radius={0.4} />
                        </EffectComposer>

                        {/* Visible Globe Structure - Now extremely subtle */}
                        <group>
                            {/* Main Wireframe Sphere */}
                            <mesh>
                                <sphereGeometry args={[radius, 32, 32]} />
                                <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.01} />
                            </mesh>

                            {/* Orbital/Latitudinal Rings */}
                            {[-0.5, 0, 0.5].map((yOffset, i) => (
                                <mesh key={i} position={[0, radius * yOffset, 0]} rotation={[Math.PI / 2, 0, 0]}>
                                    <torusGeometry args={[radius * Math.sqrt(1 - yOffset * yOffset), 0.005, 16, 128]} />
                                    <meshBasicMaterial color="#ffffff" transparent opacity={0.03} />
                                </mesh>
                            ))}

                            {/* Longitudinal Ribs */}
                            {[0, Math.PI / 4, Math.PI / 2, Math.PI * 0.75].map((rotation, i) => (
                                <mesh key={i} rotation={[0, rotation, 0]}>
                                    <torusGeometry args={[radius, 0.003, 16, 128]} />
                                    <meshBasicMaterial color="#ffffff" transparent opacity={0.02} />
                                </mesh>
                            ))}
                        </group>

                        {eventPoints.map((ep) => (
                            <EventPoint
                                key={ep.event.id}
                                event={ep.event}
                                onSelect={onSelectEvent}
                                position={ep.position}
                            />
                        ))}

                        {branches.map((branch, i) => branch && (
                            <TimelinePath key={i} points={branch.points} color={branch.color} radius={radius} />
                        ))}

                        <Stars radius={150} depth={50} count={2000} factor={4} saturation={1} fade speed={1} />

                        <mesh>
                            <sphereGeometry args={[radius * 0.95, 64, 64]} />
                            <meshBasicMaterial color="#050510" transparent opacity={0.3} />
                        </mesh>
                    </group>
                </Suspense>

                <OrbitControls
                    enablePan={false}
                    minDistance={12}
                    maxDistance={35}
                    autoRotate
                    autoRotateSpeed={0.15}
                    makeDefault
                />
            </Canvas>


            {/* UI Legend */}
            <div className="absolute bottom-32 right-4 lg:bottom-40 lg:right-10 z-50">
                <div className="bg-black/90 backdrop-blur-2xl border border-white/10 p-4 lg:p-6 rounded-2xl lg:rounded-3xl shadow-2xl min-w-[160px] lg:min-w-[200px]">
                    <h3 className="text-white/30 font-mono text-[8px] lg:text-[9px] tracking-[0.4em] lg:tracking-[0.5em] mb-4 lg:mb-5 uppercase font-bold text-center lg:text-left">Orbital Strands</h3>
                    <div className="flex flex-col gap-3 lg:gap-4">
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-[9px] lg:text-[11px] font-mono text-white/70 uppercase tracking-tighter lg:tracking-normal">North (Academic)</span>
                            <div className="w-8 lg:w-12 h-[2px] lg:h-[3px] bg-[#d8b4fe] shadow-[0_0_15px_#d8b4fe]" />
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-[9px] lg:text-[11px] font-mono text-white/70 uppercase tracking-tighter lg:tracking-normal">South (Professional)</span>
                            <div className="w-8 lg:w-12 h-[2px] lg:h-[3px] bg-[#60a5fa] shadow-[0_0_15px_#60a5fa]" />
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-[9px] lg:text-[11px] font-mono text-white/70 uppercase tracking-tighter lg:tracking-normal">Equator (Certs)</span>
                            <div className="w-8 lg:w-12 h-[2px] lg:h-[3px] bg-[#22d3ee] shadow-[0_0_15px_#22d3ee]" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-40 left-1/2 -translate-x-1/2 pointer-events-none text-center">
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-[1em] font-bold animate-pulse drop-shadow-md">Infinite Expansion Spiral</p>
            </div>
        </div>
    );
};
