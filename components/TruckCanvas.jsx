'use client';

import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useTexture, ContactShadows, Center, Bounds, Text, useProgress } from '@react-three/drei';
import * as THREE from 'three';

function isWebGLSupported() {
    if (typeof window === 'undefined') return true;
    try {
        const canvas = document.createElement('canvas');
        return Boolean(
            window.WebGLRenderingContext &&
            (canvas.getContext('webgl') || canvas.getContext('experimental-webgl') || canvas.getContext('webgl2'))
        );
    } catch {
        return false;
    }
}

function CanvasLoader() {
    const { active, progress } = useProgress();
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (!active && progress === 100) {
            const timer = setTimeout(() => setVisible(false), 450);
            return () => clearTimeout(timer);
        } else {
            setVisible(true);
        }
    }, [active, progress]);

    if (!visible) return null;

    return (
        <div
            className={`absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#080C10]/85 backdrop-blur-sm transition-opacity duration-500 pointer-events-none ${
                !active && progress === 100 ? 'opacity-0' : 'opacity-100'
            }`}
        >
            <div className="w-56 flex flex-col items-center gap-2.5">
                <div className="flex items-center justify-between w-full text-xs font-mono tracking-wider text-slate-300">
                    <span className="text-sky-400 font-bold uppercase">Loading Fleet Assets</span>
                    <span className="font-semibold text-slate-200">{Math.round(progress)}%</span>
                </div>
                {/* Thin Cyan Progress Bar */}
                <div className="w-full h-1 bg-slate-800/80 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-sky-500 transition-all duration-200 ease-out rounded-full shadow-[0_0_10px_rgba(14,165,233,0.7)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}

function FrontEagleBanner() {
    const flagTexture = useTexture('/images/truck-flag-eagle.jpg');

    return (
        <group position={[0, 2.68, 1.572]} rotation={[0, 0, 0]}>
            {/* American Flag & Bald Eagle Artwork Banner */}
            <mesh position={[0, 0, 0.002]}>
                <planeGeometry args={[2.34, 0.68]} />
                <meshStandardMaterial
                    map={flagTexture}
                    roughness={0.35}
                    metalness={0.1}
                    polygonOffset
                    polygonOffsetFactor={-2}
                    polygonOffsetUnits={-2}
                />
            </mesh>

            {/* Subtle Metallic Frame Bezel */}
            <mesh position={[0, 0, 0]}>
                <planeGeometry args={[2.37, 0.71]} />
                <meshStandardMaterial
                    color="#334155"
                    roughness={0.2}
                    metalness={0.8}
                    polygonOffset
                    polygonOffsetFactor={-1}
                    polygonOffsetUnits={-1}
                />
            </mesh>
        </group>
    );
}

function CargoBoxBranding({ isDriverSide }) {
    const xPos = isDriverSide ? -1.295 : 1.295;
    const yRot = isDriverSide ? -Math.PI / 2 : Math.PI / 2;

    return (
        <group position={[xPos, 2.05, -1.18]} rotation={[0, yRot, 0]}>
            {/* Clean Bold Fleet Header Wordmark */}
            <Text
                position={[0, 0, 0.002]}
                fontSize={0.36}
                letterSpacing={-0.01}
                color="#0B1117"
                anchorX="center"
                anchorY="middle"
                fontWeight="black"
                material-toneMapped={false}
                material-polygonOffset={true}
                material-polygonOffsetFactor={-2}
            >
                UMAJA LOGISTICS
            </Text>
        </group>
    );
}

function DecalsAndLettering() {
    return (
        <group>
            {/* Front American Flag & Eagle Artwork on Cargo Box */}
            <FrontEagleBanner />

            {/* Driver Side Clean Cargo Box Branding */}
            <CargoBoxBranding isDriverSide={true} />

            {/* Passenger Side Clean Cargo Box Branding */}
            <CargoBoxBranding isDriverSide={false} />
        </group>
    );
}

function Model({ activePreset }) {
    const { scene } = useGLTF('/models/truck.glb');
    const groupRef = useRef();

    // Enable shadows on all truck meshes
    React.useMemo(() => {
        if (scene) {
            scene.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
        }
    }, [scene]);

    // Smooth lerp transition based on activePreset
    useFrame((state, delta) => {
        if (!groupRef.current) return;

        let targetRotation = -Math.PI / 4; // Front 3/4 view

        if (activePreset === 'side') {
            targetRotation = -Math.PI / 2; // Side Profile view
        } else if (activePreset === 'rear') {
            targetRotation = Math.PI * 0.95; // Liftgate & Rear view
        }

        groupRef.current.rotation.y = THREE.MathUtils.damp(
            groupRef.current.rotation.y,
            targetRotation,
            4.0,
            delta
        );
    });

    return (
        <group ref={groupRef}>
            <Center top>
                <primitive object={scene} scale={[100, 100, 100]} />
                <DecalsAndLettering />
            </Center>
        </group>
    );
}

useGLTF.preload('/models/truck.glb');
useTexture.preload('/images/truck-flag-eagle.jpg');

export default function TruckCanvas({ activePreset = 'front' }) {
    const [hasWebGL, setHasWebGL] = useState(true);

    useEffect(() => {
        setHasWebGL(isWebGLSupported());
    }, []);

    if (!hasWebGL) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#080C10] border border-white/[0.08] rounded-xl p-6 text-center text-slate-300">
                <div className="w-12 h-12 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-3">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                    </svg>
                </div>
                <p className="text-sm font-bold text-white mb-1">3D Fleet Viewer Unavailable</p>
                <p className="text-xs text-slate-400 max-w-xs font-mono">
                    WebGL hardware acceleration is disabled or blocked in your browser environment.
                </p>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full cursor-grab active:cursor-grabbing select-none pointer-events-auto">
            {/* Sleek Minimalist Progress Loader */}
            <CanvasLoader />

            <Canvas
                camera={{ position: [5.2, 1.9, 5.6], fov: 36 }}
                dpr={[1, 1.5]}
                gl={{
                    antialias: true,
                    alpha: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.2,
                    powerPreference: 'high-performance',
                }}
            >
                {/* 100% Self-Contained High-End Studio Lighting Rig (Zero External CDN Calls) */}
                <ambientLight intensity={1.1} />
                <directionalLight position={[10, 15, 10]} intensity={2.2} castShadow />
                <directionalLight position={[-10, 10, -10]} intensity={1.0} color="#E0F2FE" />
                <directionalLight position={[0, -10, 0]} intensity={0.4} />
                <hemisphereLight skyColor="#FFFFFF" groundColor="#0F172A" intensity={0.8} />

                <Suspense fallback={null}>
                    {/* Auto-scaling and Centering Bounds */}
                    <Bounds fit clip observe margin={1.15}>
                        <Model activePreset={activePreset} />
                    </Bounds>

                    <ContactShadows
                        position={[0, 0, 0]}
                        opacity={0.85}
                        scale={16}
                        blur={2.4}
                        far={4.5}
                        color="#000000"
                    />
                </Suspense>

                <OrbitControls
                    makeDefault
                    enableZoom={false}
                    enablePan={false}
                    enableDamping={true}
                    dampingFactor={0.05}
                    maxPolarAngle={Math.PI / 2 - 0.05}
                    minPolarAngle={Math.PI / 4.2}
                    rotateSpeed={0.8}
                />
            </Canvas>
        </div>
    );
}