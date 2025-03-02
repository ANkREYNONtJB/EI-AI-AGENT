import React, { useEffect, useRef } from "react";
import { CreativeFoundation } from "@/lib/CreativeFoundation";

interface HolographicOverlayProps {
  width: number;
  height: number;
  animationSpeed?: number;
  patternDensity?: number;
  intensity?: number;
}

export const HolographicOverlay = ({
  width,
  height,
  animationSpeed = 1,
  patternDensity = 4,
  intensity = 0.1,
}: HolographicOverlayProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;
    let time = 0;

    const creativeFoundation = new CreativeFoundation();

    // Add symbolic influences
    creativeFoundation.addInfluence({
      type: "literary",
      pattern: "Σ → ∞",
      resonance: 0.8,
    });
    creativeFoundation.addInfluence({
      type: "musical",
      pattern: "Ψ ∇ Φ",
      resonance: 0.6,
    });

    const drawHolographicPattern = () => {
      ctx.clearRect(0, 0, width, height);

      // Synthesize creative influences
      const creativePatterns = creativeFoundation.synthesize(time * 0.01);

      const drawInterference = (
        x: number,
        y: number,
        radius: number,
        phase: number,
      ) => {
        // Combine quantum interference with creative patterns
        const quantumPhase = phase + Math.sqrt(x * x + y * y) * 0.1;
        const creativeModulation =
          creativePatterns.reduce((acc, pattern) => acc + pattern, 0) /
          creativePatterns.length;
        const intensity =
          Math.sin(quantumPhase) * (1 + creativeModulation * 0.3);
        return Math.abs(intensity);
      };

      // Draw multiple interference patterns
      const centerX = width / 2;
      const centerY = height / 2;

      for (let x = 0; x < width; x += patternDensity) {
        for (let y = 0; y < height; y += patternDensity) {
          // Create multiple interference sources
          const pattern1 = drawInterference(
            x - centerX,
            y - centerY,
            100,
            time * 0.02,
          );
          const pattern2 = drawInterference(
            x - centerX,
            y - centerY,
            150,
            time * 0.03 + phi,
          );
          const pattern3 = drawInterference(
            x - centerX,
            y - centerY,
            200,
            time * 0.01,
          );

          // Combine patterns with golden ratio harmonics
          const combinedIntensity =
            (pattern1 + pattern2 * phi + pattern3) / (1 + phi + 1);

          // Create holographic color effect
          const hue = (time * 0.1 + combinedIntensity * 360) % 360;
          const saturation = 70;
          const lightness = combinedIntensity * 60;

          ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${intensity})`;
          ctx.fillRect(x, y, patternDensity - 1, patternDensity - 1);
        }
      }

      // Draw sacred geometry with creative resonance
      const resonanceAmplitude =
        creativePatterns.reduce((acc, pattern) => acc + Math.abs(pattern), 0) /
        creativePatterns.length;

      ctx.strokeStyle = `hsla(${time % 360}, 70%, 60%, ${intensity})`;
      ctx.beginPath();
      const spiralPoints = 200;
      for (let i = 0; i < spiralPoints; i++) {
        const angle = i * phi;
        const radius =
          i * 0.1 * (1 + Math.sin(time * 0.001) * resonanceAmplitude);
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      time += animationSpeed;
      animationFrame = requestAnimationFrame(drawHolographicPattern);
    };

    drawHolographicPattern();

    return () => cancelAnimationFrame(animationFrame);
  }, [width, height, animationSpeed, patternDensity, intensity]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        opacity: 0.5,
      }}
    />
  );
};
