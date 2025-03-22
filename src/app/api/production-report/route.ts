import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import Response from "@/lib/Response";

// Get all production reports
export async function GET() {
  try {
    const reports = await prisma.productionReport.findMany({
      include: { tunnel: true } // Include tunnel details
    });

    return Response.success(
      200,
      reports,
      "Production reports retrieved successfully."
    );
  } catch (error) {
    console.error("Error fetching production reports:", error);
    return Response.error(
      500,
      "DATABASE_ERROR",
      "Failed to fetch production reports."
    );
  }
}

// Create a new production report
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      tunnelId,
      dailyPlan,
      bookedMeter,
      actualMeter,
      variance,
      materialExcavated,
      wasteExcavated
    } = body;

    if (!tunnelId) {
      return Response.error(400, "INVALID_DATA", "Tunnel ID is required.");
    }

    const newReport = await prisma.productionReport.create({
      data: {
        tunnelId,
        dailyPlan,
        bookedMeter,
        actualMeter,
        variance,
        materialExcavated,
        wasteExcavated
      }
    });

    return Response.success(
      201,
      newReport,
      "Production report created successfully."
    );
  } catch (error) {
    console.error("Error creating production report:", error);
    return Response.error(
      500,
      "DATABASE_ERROR",
      "Failed to create production report."
    );
  }
}
