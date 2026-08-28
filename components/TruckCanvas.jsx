'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, Center, Bounds } from '@react-three/drei';
import * as THREE from 'three';

function Model({ activePreset }) {
    const { scene } = useGLTF('/models/truck.glb');
    const groupRef = useRef();

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
                <primitive object={scene} />
            </Center>
        </group>
    );
}

useGLTF.preload('/models/truck.glb');

export default function TruckCanvas({ activePreset = 'front' }) {
    return (
        <div className="w-full h-full cursor-grab active:cursor-grabbing select-none pointer-events-auto">
            <Canvas
                camera={{ position: [5.2, 1.9, 5.6], fov: 36 }}
                dpr={[1, 1.5]}
                gl={{
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.25,
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                }}
            >
                {/* Automotive Titanium & Ice Blue Studio Lighting */}
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 15, 8]} intensity={2.9} castShadow />
                <directionalLight position={[-10, 10, -6]} intensity={1.5} color="#94A3B8" />
                <pointLight position={[-6, 4, 6]} intensity={1.2} color="#38BDF8" />
                <directionalLight position={[0, -4, 4]} intensity={0.25} />

                <Suspense fallback={null}>
                    {/* Auto-scaling and Centering Bounds */}
                    <Bounds fit clip observe margin={1.15}>
                        <Model activePreset={activePreset} />
                    </Bounds>

                    <Environment preset="city" />
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