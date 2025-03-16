import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import Response from "@/lib/Response";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.tunnelId) {
      return Response.error(400, "Missing tunnelId", "Tunnel ID is required");
    }

    const tunnelExists = await prisma.tunnel.findUnique({
      where: { id: data.tunnelId }
    });

    if (!tunnelExists) {
      return Response.error(404, "Tunnel not found", "Invalid tunnel ID");
    }

    const incidentReport = await prisma.incidentReport.create({
      data: { ...data }
    });

    return Response.success(
      201,
      incidentReport,
      "Incident Report created successfully"
    );
  } catch (error) {
    return Response.error(
      500,
      (error as Error).message,
      "Failed to create Incident Report"
    );
  }
}

export async function GET() {
  try {
    const incidentReports = await prisma.incidentReport.findMany();
    return Response.success(
      200,
      incidentReports,
      "Incident Reports retrieved successfully"
    );
  } catch (error) {
    return Response.error(
      500,
      (error as Error).message,
      "Failed to fetch Incident Reports"
    );
  }
}
