"use client";

import { useEffect, useRef } from "react";

export function PerformanceChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = 300;
    canvas.height = 300;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;

    // Draw the circular chart
    const drawArc = (startAngle: number, endAngle: number, color: string) => {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.lineWidth = 20;
      ctx.strokeStyle = color;
      ctx.stroke();
    };

    // Draw arcs for different metrics
    drawArc(Math.PI * 0.7, Math.PI * 1.3, "#8B6D4B"); // System
    drawArc(Math.PI * 1.3, Math.PI * 1.7, "#2D3748"); // Surveyst
    drawArc(Math.PI * 1.7, Math.PI * 2.0, "#4A5568"); // Score
    drawArc(Math.PI * 0.0, Math.PI * 0.3, "#A0AEC0"); // Incidence
    drawArc(Math.PI * 0.3, Math.PI * 0.7, "#9AE6B4"); // Teams

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 40, 0, Math.PI * 2);
    ctx.fillStyle = "#f8f9fa";
    ctx.fill();

    // Draw text in center
    ctx.fillStyle = "#1A202C";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("Performance", centerX, centerY - 10);
    ctx.font = "14px sans-serif";
    ctx.fillText("Metrics", centerX, centerY + 10);

    // Draw legend
    const legendItems = [
      { label: "System", color: "#8B6D4B" },
      { label: "Surveyst", color: "#2D3748" },
      { label: "Score", color: "#4A5568" },
      { label: "Teams", color: "#9AE6B4" },
      { label: "Incidence", color: "#A0AEC0" }
    ];

    const legendY = centerY + radius + 30;
    const itemWidth = canvas.width / legendItems.length;

    legendItems.forEach((item, index) => {
      const x = index * itemWidth + itemWidth / 2;

      // Draw color indicator
      ctx.fillStyle = item.color;
      ctx.fillRect(x - 30, legendY, 10, 10);

      // Draw label
      ctx.fillStyle = "#4A5568";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(item.label, x - 15, legendY + 8);
    });
  }, []);

  return (
    <div className="h-[300px] w-[300px]">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{ maxWidth: "100%", height: "auto" }}></canvas>
    </div>
  );
}
