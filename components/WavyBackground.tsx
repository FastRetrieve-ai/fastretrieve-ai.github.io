"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, ReactNode } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: unknown;
}) => {
  const noise = useRef(createNoise3D());
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    let animationFrameId: number;
    const render = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      if (backgroundFill) {
        ctx.fillStyle = backgroundFill;
        ctx.fillRect(0, 0, width, height);
      }

      const waveColors = colors ?? ["#38bdf8", "#818cf8", "#c084fc"];

      timeRef.current += speed === "fast" ? 0.002 : 0.001;
      ctx.globalAlpha = waveOpacity;

      // Draw waves from back to front
      for (let i = 2; i >= 0; i--) {
        ctx.beginPath();
        ctx.moveTo(0, height * 0.4); // Move waves up to 40% height
        ctx.strokeStyle = waveColors[i % waveColors.length];
        ctx.lineWidth = waveWidth || 15;

        for (let x = 0; x < width; x += 5) {
          const y = noise.current(x * 0.002, i * 0.5, timeRef.current) * 40; // Reduced amplitude
          ctx.lineTo(x, height * 0.4 + y);
        }

        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [colors, backgroundFill, waveOpacity, waveWidth, speed, blur]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", containerClassName)}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ filter: `blur(${blur}px)` }}
      />
      <div className={cn("relative z-10 h-full", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
