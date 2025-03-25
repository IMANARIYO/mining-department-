"use client";

import { useEffect, useRef } from "react";

export function SurveyCompletionChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Data for the chart
    const data = [
      { label: "Section A", value: 30 },
      { label: "Section B", value: 60 },
      { label: "Section C", value: 90 }
    ];

    // Chart configuration
    const barHeight = 30;
    const barSpacing = 40;
    const leftPadding = 80;
    const topPadding = 20;
    const maxBarWidth = canvas.width - leftPadding - 50;

    // Draw the chart
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw x-axis labels
    ctx.textAlign = "center";
    ctx.fillStyle = "#6b7280";
    ctx.font = "12px sans-serif";

    const xLabels = ["0%", "20%", "40%", "60%", "80%", "100%"];
    const xLabelSpacing = maxBarWidth / (xLabels.length - 1);

    xLabels.forEach((label, index) => {
      const x = leftPadding + index * xLabelSpacing;
      const y = canvas.height - 10;
      ctx.fillText(label, x, y);

      // Draw vertical grid lines
      ctx.beginPath();
      ctx.strokeStyle = "#e5e7eb";
      ctx.moveTo(x, topPadding);
      ctx.lineTo(x, canvas.height - 30);
      ctx.stroke();
    });

    // Draw bars and labels
    data.forEach((item, index) => {
      const y = topPadding + index * barSpacing;

      // Draw label
      ctx.textAlign = "right";
      ctx.fillStyle = "#374151";
      ctx.font = "14px sans-serif";
      ctx.fillText(item.label, leftPadding - 10, y + barHeight / 2 + 5);

      // Draw bar
      const barWidth = (item.value / 100) * maxBarWidth;
      ctx.fillStyle = "#8B6D4B";
      ctx.fillRect(leftPadding, y, barWidth, barHeight);
    });
  }, []);

  return (
    <div className="h-[300px] w-full">
      <canvas ref={canvasRef} className="h-full w-full"></canvas>
    </div>
  );
}
