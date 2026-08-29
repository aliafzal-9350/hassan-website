'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, Center, Bounds, Text } from '@react-three/drei';
import * as THREE from 'three';

function DecalsAndLettering() {
    const usdotText = `UMAJA LOGISTICS LLC\n128 SUNSET BLVD # 1345\nNEW CASTLE, DE 19720\nMC# 1508261\nDOT # 4008008`;

    return (
        <group>
            {/* ========================================================================= */}
            {/* 1. DRIVER SIDE (LEFT PROFILE, X < 0)                                      */}
            {/* ========================================================================= */}

            {/* --- Driver Side Cab Door USDOT Carrier Decal --- */}
            <group position={[-1.222, 1.19, 2.94]} rotation={[0, -Math.PI / 2, 0]}>
                {/* White Compliance Plaque Decal Sticker */}
                <mesh position={[0, 0, -0.002]}>
                    <planeGeometry args={[0.38, 0.26]} />
                    <meshStandardMaterial
                        color="#FFFFFF"
                        roughness={0.3}
                        metalness={0.05}
                        polygonOffset
                        polygonOffsetFactor={-1}
                        polygonOffsetUnits={-1}
                    />
                </mesh>
                {/* Clean Plaque Border */}
                <mesh position={[0, 0, -0.001]}>
                    <planeGeometry args={[0.39, 0.27]} />
                    <meshBasicMaterial
                        color="#E2E8F0"
                        polygonOffset
                        polygonOffsetFactor={-0.5}
                        polygonOffsetUnits={-0.5}
                    />
                </mesh>
                {/* Official Compliance Typography */}
                <Text
                    position={[0, 0, 0.002]}
                    fontSize={0.025}
                    lineHeight={1.28}
                    letterSpacing={0.02}
                    color="#1E293B"
                    anchorX="center"
                    anchorY="middle"
                    textAlign="center"
                    fontWeight="bold"
                    material-toneMapped={false}
                    material-polygonOffset={true}
                    material-polygonOffsetFactor={-2}
                >
                    {usdotText}
                </Text>
            </group>

            {/* --- Driver Side Cargo Box Enterprise Fleet Branding --- */}
            <group position={[-1.295, 2.10, -1.18]} rotation={[0, -Math.PI / 2, 0]}>
                {/* Primary Fleet Header Wordmark */}
                <Text
                    position={[0, 0.05, 0.002]}
                    fontSize={0.32}
                    letterSpacing={-0.02}
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

                {/* Subtle Sky Blue Accent Stripe */}
                <mesh position={[0, -0.16, 0.002]}>
                    <planeGeometry args={[3.1, 0.022]} />
                    <meshBasicMaterial
                        color="#0284C7"
                        polygonOffset
                        polygonOffsetFactor={-2}
                        polygonOffsetUnits={-2}
                    />
                </mesh>

                {/* Secondary Fleet Capabilities Line */}
                <Text
                    position={[0, -0.26, 0.002]}
                    fontSize={0.072}
                    letterSpacing={0.07}
                    color="#0284C7"
                    anchorX="center"
                    anchorY="middle"
                    fontWeight="bold"
                    material-toneMapped={false}
                    material-polygonOffset={true}
                    material-polygonOffsetFactor={-2}
                >
                    EXPEDITED FREIGHT • DOCK HIGH • TSA & TWIC
                </Text>
            </group>

            {/* ========================================================================= */}
            {/* 2. PASSENGER SIDE (RIGHT PROFILE, X > 0)                                   */}
            {/* ========================================================================= */}

            {/* --- Passenger Side Cab Door USDOT Carrier Decal --- */}
            <group position={[1.222, 1.19, 2.94]} rotation={[0, Math.PI / 2, 0]}>
                {/* White Compliance Plaque Decal Sticker */}
                <mesh position={[0, 0, -0.002]}>
                    <planeGeometry args={[0.38, 0.26]} />
                    <meshStandardMaterial
                        color="#FFFFFF"
                        roughness={0.3}
                        metalness={0.05}
                        polygonOffset
                        polygonOffsetFactor={-1}
                        polygonOffsetUnits={-1}
                    />
                </mesh>
                {/* Clean Plaque Border */}
                <mesh position={[0, 0, -0.001]}>
                    <planeGeometry args={[0.39, 0.27]} />
                    <meshBasicMaterial
                        color="#E2E8F0"
                        polygonOffset
                        polygonOffsetFactor={-0.5}
                        polygonOffsetUnits={-0.5}
                    />
                </mesh>
                {/* Official Compliance Typography */}
                <Text
                    position={[0, 0, 0.002]}
                    fontSize={0.025}
                    lineHeight={1.28}
                    letterSpacing={0.02}
                    color="#1E293B"
                    anchorX="center"
                    anchorY="middle"
                    textAlign="center"
                    fontWeight="bold"
                    material-toneMapped={false}
                    material-polygonOffset={true}
                    material-polygonOffsetFactor={-2}
                >
                    {usdotText}
                </Text>
            </group>

            {/* --- Passenger Side Cargo Box Enterprise Fleet Branding --- */}
            <group position={[1.295, 2.10, -1.18]} rotation={[0, Math.PI / 2, 0]}>
                {/* Primary Fleet Header Wordmark */}
                <Text
                    position={[0, 0.05, 0.002]}
                    fontSize={0.32}
                    letterSpacing={-0.02}
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

                {/* Subtle Sky Blue Accent Stripe */}
                <mesh position={[0, -0.16, 0.002]}>
                    <planeGeometry args={[3.1, 0.022]} />
                    <meshBasicMaterial
                        color="#0284C7"
                        polygonOffset
                        polygonOffsetFactor={-2}
                        polygonOffsetUnits={-2}
                    />
                </mesh>

                {/* Secondary Fleet Capabilities Line */}
                <Text
                    position={[0, -0.26, 0.002]}
                    fontSize={0.072}
                    letterSpacing={0.07}
                    color="#0284C7"
                    anchorX="center"
                    anchorY="middle"
                    fontWeight="bold"
                    material-toneMapped={false}
                    material-polygonOffset={true}
                    material-polygonOffsetFactor={-2}
                >
                    EXPEDITED FREIGHT • DOCK HIGH • TSA & TWIC
                </Text>
            </group>
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
                <ambientLight intensity={0.85} />
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