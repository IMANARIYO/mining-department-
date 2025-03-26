"use client";

import { useEffect, useRef } from "react";

export function SamplePieChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = 200;
    canvas.height = 200;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Sample data
    const data = [
      { value: 65, color: "#8B6D4B" }, // Brown
      { value: 20, color: "#2D0A31" }, // Purple
      { value: 15, color: "#A39171" } // Tan
    ];

    // Calculate total
    const total = data.reduce((sum, item) => sum + item.value, 0);

    // Draw pie chart
    let startAngle = 0;

    data.forEach((item) => {
      // Calculate slice angle
      const sliceAngle = (item.value / total) * 2 * Math.PI;

      // Draw slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();

      // Fill slice
      ctx.fillStyle = item.color;
      ctx.fill();

      // Update start angle for next slice
      startAngle += sliceAngle;
    });
  }, []);

  return (
    <div className="h-[200px] w-[200px]">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{ maxWidth: "100%", height: "auto" }}></canvas>
    </div>
  );
}
