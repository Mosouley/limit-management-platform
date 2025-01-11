import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";

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
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        {/* Animated beams */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[50vh] w-[2px] bg-gradient-to-b from-purple-500/20 to-cyan-500/20"
              style={{
                left: `${(i + 1) * 20}%`,
                filter: "blur(8px)",
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
        </div>

        {/* Interactive beam following mouse */}
        <motion.div
          className="pointer-events-none absolute h-[60vh] w-[3px] bg-gradient-to-b from-purple-500/40 to-cyan-500/40"
          style={{
            left: mousePosition.x,
            filter: "blur(8px)",
          }}
          animate={{
            x: mousePosition.x,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
          }}
        />

        {/* Collision effect at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-500/30 to-transparent" />
        
        {/* Content */}
        <div className="relative z-10 flex min-h-screen items-center justify-center">
          <h1 className="text-center text-4xl font-bold text-white md:text-6xl">
            Interactive Beam Animation
          </h1>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BeamDemo;