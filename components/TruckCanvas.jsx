'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useTexture, Environment, ContactShadows, Center, Bounds, Text } from '@react-three/drei';
import * as THREE from 'three';

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

function CabDoorDecal({ isDriverSide }) {
    const xPos = isDriverSide ? -1.228 : 1.228;
    const yRot = isDriverSide ? -Math.PI / 2 : Math.PI / 2;

    return (
        <group position={[xPos, 1.42, 2.45]} rotation={[0, yRot, 0]}>
            {/* White Compliance Plaque Decal Sticker */}
            <mesh position={[0, 0, 0.001]}>
                <planeGeometry args={[0.62, 0.38]} />
                <meshStandardMaterial
                    color="#FFFFFF"
                    roughness={0.25}
                    metalness={0.05}
                    polygonOffset
                    polygonOffsetFactor={-2}
                    polygonOffsetUnits={-2}
                />
            </mesh>

            {/* Navy Plaque Border */}
            <mesh position={[0, 0, 0]}>
                <planeGeometry args={[0.635, 0.395]} />
                <meshBasicMaterial
                    color="#0F172A"
                    polygonOffset
                    polygonOffsetFactor={-1}
                    polygonOffsetUnits={-1}
                />
            </mesh>

            {/* Carrier Name Header */}
            <Text
                position={[0, 0.11, 0.004]}
                fontSize={0.052}
                letterSpacing={0.01}
                color="#0F172A"
                anchorX="center"
                anchorY="middle"
                fontWeight="black"
                material-toneMapped={false}
                material-polygonOffset={true}
                material-polygonOffsetFactor={-3}
            >
                UMAJA LOGISTICS LLC
            </Text>

            {/* Location & Authority */}
            <Text
                position={[0, 0.045, 0.004]}
                fontSize={0.034}
                letterSpacing={0.02}
                color="#334155"
                anchorX="center"
                anchorY="middle"
                fontWeight="bold"
                material-toneMapped={false}
                material-polygonOffset={true}
                material-polygonOffsetFactor={-3}
            >
                WILMINGTON, DE
            </Text>

            {/* Blue Divider Line */}
            <mesh position={[0, 0.015, 0.004]}>
                <planeGeometry args={[0.54, 0.008]} />
                <meshBasicMaterial
                    color="#0284C7"
                    polygonOffset
                    polygonOffsetFactor={-3}
                    polygonOffsetUnits={-3}
                />
            </mesh>

            {/* USDOT & MC Number Details */}
            <Text
                position={[0, -0.035, 0.004]}
                fontSize={0.033}
                letterSpacing={0.02}
                color="#0F172A"
                anchorX="center"
                anchorY="middle"
                fontWeight="bold"
                material-toneMapped={false}
                material-polygonOffset={true}
                material-polygonOffsetFactor={-3}
            >
                USDOT 4008008
            </Text>

            <Text
                position={[0, -0.09, 0.004]}
                fontSize={0.033}
                letterSpacing={0.02}
                color="#0284C7"
                anchorX="center"
                anchorY="middle"
                fontWeight="bold"
                material-toneMapped={false}
                material-polygonOffset={true}
                material-polygonOffsetFactor={-3}
            >
                MC# 1508261
            </Text>

            <Text
                position={[0, -0.14, 0.004]}
                fontSize={0.026}
                letterSpacing={0.04}
                color="#64748B"
                anchorX="center"
                anchorY="middle"
                fontWeight="bold"
                material-toneMapped={false}
                material-polygonOffset={true}
                material-polygonOffsetFactor={-3}
            >
                26FT DOCK HIGH • LIFTGATE
            </Text>
        </group>
    );
}

function CargoBoxBranding({ isDriverSide }) {
    const xPos = isDriverSide ? -1.295 : 1.295;
    const yRot = isDriverSide ? -Math.PI / 2 : Math.PI / 2;

    return (
        <group position={[xPos, 2.10, -1.18]} rotation={[0, yRot, 0]}>
            {/* Primary Fleet Header Wordmark */}
            <Text
                position={[0, 0.05, 0.002]}
                fontSize={0.34}
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
                <planeGeometry args={[3.2, 0.024]} />
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
                fontSize={0.075}
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
    );
}

function DecalsAndLettering() {
    return (
        <group>
            {/* Front American Flag & Eagle Artwork on Cargo Box */}
            <FrontEagleBanner />

            {/* Driver Side Decals */}
            <CabDoorDecal isDriverSide={true} />
            <CargoBoxBranding isDriverSide={true} />

            {/* Passenger Side Decals */}
            <CabDoorDecal isDriverSide={false} />
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