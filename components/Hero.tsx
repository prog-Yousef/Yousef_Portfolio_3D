import { FaLocationArrow } from "react-icons/fa6";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";

// Particle System Component
const Particles = ({ count = 5000 }) => {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = THREE.MathUtils.randFloatSpread(20);
    }
    return pos;
  });

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += delta * 0.02;
      pointsRef.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

const Hero = () => {
  return (
    <div className="pb-20 pt-36 relative min-h-screen flex flex-col justify-center items-center">
      <div className="absolute inset-0 z-0 h-full w-full">
        <Canvas camera={{ position: [0, 1, 12], fov: 50 }}>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Particles count={5000} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} enablePan={false} />
        </Canvas>
      </div>

      <div className="relative z-10 w-full">
        <div>
          <Spotlight
            className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
            fill="white"
          />
          <Spotlight
            className="h-[80vh] w-[50vw] top-10 left-full"
            fill="purple"
          />
          <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
        </div>

        <div
          className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
         absolute top-0 left-0 flex items-center justify-center pointer-events-none"
        >
          <div
            className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
           bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
          />
        </div>

        <div className="flex justify-center items-center relative my-20 z-10">
          <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[70vw] flex flex-col items-center justify-center">
            <h1 
              className="text-center text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white leading-none tracking-tighter mb-6"
              style={{
                transform: "perspective(800px) rotateX(15deg) rotateY(-5deg) scale(1.1)",
                textShadow: `
                  1px 1px 0px #a855f7,
                  2px 2px 0px #9333ea,
                  3px 3px 0px #7e22ce,
                  4px 4px 0px #6b21a8,
                  5px 5px 0px #581c87,
                  6px 6px 10px rgba(0,0,0,0.5)
                `,
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              }}
            >
              Yousef Shahidi
            </h1>

            <TextGenerateEffect
              words="Full Stack Developer / UI/UX Designer"
              className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl text-purple font-semibold mb-10"
            />

            <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80 mb-10">
              Dynamic Web Magic with Next.js
            </p>

            <a href="#about">
              <MagicButton
                title="Show my work"
                icon={<FaLocationArrow />}
                position="right"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
