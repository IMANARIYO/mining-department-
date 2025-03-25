"use client";

import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export function DonutChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Production", "Safety Score", "Equipment", "Cost"],
        datasets: [
          {
            data: [35, 25, 20, 20],
            backgroundColor: ["#ffffff", "#d1d5db", "#9ca3af", "#6b7280"],
            borderWidth: 0,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "75%",
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#ffffff",
              boxWidth: 10,
              padding: 10,
              font: {
                size: 10
              }
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="h-[200px] w-[200px]">
      <canvas ref={chartRef} />
    </div>
  );
}
