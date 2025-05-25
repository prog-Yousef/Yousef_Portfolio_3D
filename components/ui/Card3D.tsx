"use client"; // Required for Framer Motion components

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  // Optional: if you want a specific glare color or intensity
  glareColor?: string; 
}

const Card3D: React.FC<Card3DProps> = ({
  children,
  className = "",
  glareColor = "rgba(255, 255, 255, 0.1)",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Values for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse position values
  const springConfig = { stiffness: 150, damping: 20, mass: 1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Transform mouse position into rotation values
  // Adjust the range (e.g., -15 to 15) for more/less tilt
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], ["12deg", "-12deg"]); // Inverted for natural feel
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], ["-12deg", "12deg"]);

  // Glare effect based on mouse position
  const glareX = useTransform(smoothMouseX, [-0.5, 0.5], ["20%", "80%"]);
  const glareY = useTransform(smoothMouseY, [-0.5, 0.5], ["20%", "80%"]);


  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { clientX, clientY, currentTarget } = event;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    // Normalize mouse position to range from -0.5 to 0.5
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d", // Important for children to be in 3D space
        perspective: "1000px", // Apply perspective to the card itself if it\'s standalone
                               // or to its parent if multiple cards are grouped
      }}
      whileHover={{ 
        scale: 1.03, // Slight lift/scale on hover
        boxShadow: "0px 15px 30px -5px rgba(0,0,0,0.3)" // Enhanced shadow on hover
      }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
      className={`relative p-6 md:p-8 rounded-xl shadow-lg overflow-hidden ${className}`} // Added overflow-hidden
    >
      {/* Glassmorphism Background - using Tailwind CSS for backdrop blur if available */}
      {/* You might need to configure Tailwind for backdrop-filter support explicitly if not already done */}
      <div
        className="absolute inset-0 bg-black/30 dark:bg-white/10 backdrop-blur-md rounded-xl"
        style={{
            // Example: for a dark theme glassmorphism
            // backgroundColor: "rgba(20, 20, 30, 0.6)", // Adjust color and opacity
            // WebkitBackdropFilter: "blur(10px)", // For Safari
            // backdropFilter: "blur(10px)",
        }}
      />
      
      {/* Glare Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-xl"
        style={{
          background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, ${glareColor}, transparent 80%)`,
          opacity: 0.6, // Adjust glare opacity
          mixBlendMode: 'soft-light', // Or 'overlay', 'screen' for different effects
          transform: "translateZ(20px)", // Bring glare slightly forward
        }}
      />

      {/* Content - ensure it\'s above the background and glare */}
      <div className="relative z-10" style={{ transform: "translateZ(40px)" /* Give content some depth */ }}>
        {children}
      </div>
    </motion.div>
  );
};

export default Card3D; 