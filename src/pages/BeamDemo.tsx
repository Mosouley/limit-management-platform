import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/DashboardLayout";

const BeamDemo = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <DashboardLayout>
      <div className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        {/* Static beams */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[50vh] w-[2px]"
            style={{
              left: `${(i + 1) * 20}%`,
              background: `linear-gradient(to bottom, 
                ${i % 2 === 0 ? 'rgb(168, 85, 247)' : 'rgb(34, 211, 238)'}, 
                transparent)`,
              filter: "blur(4px)",
              opacity: 0.4,
            }}
            animate={{
              height: ["50vh", "70vh", "50vh"],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Interactive beam following mouse */}
        <motion.div
          className="pointer-events-none absolute h-[60vh] w-[3px]"
          style={{
            background: "linear-gradient(to bottom, rgb(168, 85, 247), rgb(34, 211, 238))",
            filter: "blur(4px)",
            opacity: 0.6,
          }}
          animate={{
            x: mousePosition.x,
            y: mousePosition.y - 300,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
          }}
        />

        {/* Collision effect at bottom */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: "linear-gradient(to top, rgba(234, 88, 12, 0.3), transparent)",
            boxShadow: "0 0 40px 20px rgba(234, 88, 12, 0.1)",
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <h1 className="text-center text-4xl font-bold text-white md:text-6xl">
            Interactive Beam Animation
          </h1>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BeamDemo;