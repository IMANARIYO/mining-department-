// app/api/attendance/reports/route.ts
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/Response";

// GET attendance reports with various filters
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const tunnelId = searchParams.get("tunnelId");
    const reportType = searchParams.get("type") || "daily"; 

    let whereClause: any = {};

    // Date range filter
    if (startDate) {
      const start = new Date(startDate);
      whereClause.date = {
        ...(whereClause.date || {}),
        gte: start,
      };
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setDate(end.getDate() + 1); // Include the end date
      whereClause.date = {
        ...(whereClause.date || {}),
        lt: end,
      };
    }

    // Tunnel filter
    if (tunnelId) {
      whereClause.manpower = {
        tunnelId,
      };
    }

    // Get all attendance records with the filters
    const attendanceRecords = await prisma.attendance.findMany({
      where: whereClause,
      include: {
        manpower: {
          select: {
            id: true,
            name: true,
            role: true,
            location: true,
            tunnel: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    // Process the data based on report type
    let reportData;

    switch (reportType) {
      case "daily":
        // Group by date
        reportData = attendanceRecords.reduce((acc, record) => {
          const dateStr = record.date.toISOString().split("T")[0];

          if (!acc[dateStr]) {
            acc[dateStr] = [];
          }

          acc[dateStr].push(record);
          return acc;
        }, {} as Record<string, any[]>);
        break;

      case "weekly":
        // Group by week
        reportData = attendanceRecords.reduce((acc, record) => {
          const date = new Date(record.date);
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay()); // Start of week (Sunday)
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6); // End of week (Saturday)

          const weekKey = `${weekStart.toISOString().split("T")[0]} to ${
            weekEnd.toISOString().split("T")[0]
          }`;

          if (!acc[weekKey]) {
            acc[weekKey] = [];
          }

          acc[weekKey].push(record);
          return acc;
        }, {} as Record<string, any[]>);
        break;

      case "monthly":
        // Group by month
        reportData = attendanceRecords.reduce((acc, record) => {
          const date = new Date(record.date);
          const monthYear = `${date.getFullYear()}-${String(
            date.getMonth() + 1
          ).padStart(2, "0")}`;

          if (!acc[monthYear]) {
            acc[monthYear] = [];
          }

          acc[monthYear].push(record);
          return acc;
        }, {} as Record<string, any[]>);
        break;

      case "worker":
        // Group by worker
        reportData = attendanceRecords.reduce((acc, record) => {
          const workerId = record.manpower.id;
          const workerName = record.manpower.name;
          const workerKey = `${workerName} (${workerId})`;

          if (!acc[workerKey]) {
            acc[workerKey] = [];
          }

          acc[workerKey].push(record);
          return acc;
        }, {} as Record<string, any[]>);
        break;

      default:
        reportData = attendanceRecords;
    }

    // Calculate summary statistics
    const summary = {
      totalRecords: attendanceRecords.length,
      totalWorkers: new Set(attendanceRecords.map((r) => r.manpowerId)).size,
      averageHoursWorked:
        attendanceRecords
          .filter((r) => r.hoursWorked)
          .reduce((sum, r) => sum + (r.hoursWorked || 0), 0) /
          attendanceRecords.filter((r) => r.hoursWorked).length || 0,
      totalHoursWorked: attendanceRecords.reduce(
        (sum, r) => sum + (r.hoursWorked || 0),
        0
      ),
    };

    return Response.success(
      200,
      {
        reportType,
        dateRange: {
          start: startDate,
          end: endDate,
        },
        summary,
        data: reportData,
      },
      "Attendance report generated successfully"
    );
  } catch (error) {
    console.error("Error generating attendance report:", error);
    return Response.error(
      500,
      "Internal Server Error",
      "Error generating attendance report"
    );
  }
}
