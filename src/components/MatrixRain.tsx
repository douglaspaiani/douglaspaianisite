import React from "react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

interface MatrixRainProps {
  colorClass?: string;
  opacity?: string;
  columns?: number;
}

// Mantém a textura estável entre o HTML gerado e a hidratação no navegador.
function variacaoVisual(indice: number, deslocamento = 0) {
  const valor = Math.sin((indice + 1) * 12.9898 + deslocamento * 78.233) * 43758.5453;
  return valor - Math.floor(valor);
}

const MatrixRain: React.FC<MatrixRainProps> = ({ 
  colorClass = "text-cyan-400", 
  opacity = "opacity-[0.15]",
  columns = 15 
}) => {
  return (
    <div aria-hidden="true" className={cn("absolute inset-0 z-0 pointer-events-none select-none overflow-hidden flex justify-around", opacity)}>
      {Array.from({ length: Math.min(columns, 12) }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -1000 }}
          animate={{ y: 0 }}
          transition={{
            duration: 8 + variacaoVisual(i, 1) * 15,
            repeat: Infinity,
            ease: "linear",
            delay: -variacaoVisual(i, 2) * 20,
          }}
          className={cn("font-mono text-[10px] flex flex-col gap-1 leading-none", colorClass)}
          style={{
            textShadow: "0 0 8px currentColor",
          }}
        >
          {Array.from({ length: 24 }).map((_, j) => (
            <span key={j} className={cn(j === 0 ? "text-white brightness-150" : "")}>
              {variacaoVisual(i * 24 + j, 3) > 0.5
                ? Math.floor(variacaoVisual(i * 24 + j, 4) * 255).toString(16).padStart(2, '0')
                : String.fromCharCode(33 + Math.floor(variacaoVisual(i * 24 + j, 5) * 94))}
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export default MatrixRain;
