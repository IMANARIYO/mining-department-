import { NextRequest } from "next/server";
import {prisma} from "@/lib/prisma";
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

    // Create the incident report
    const incidentReport = await prisma.incidentReport.create({
      data: {
        tunnelId: data.tunnelId,
        incidentType: data.incidentType,
        peopleInvolved: data.peopleInvolved,
        rootCauseAnalysis: data.rootCauseAnalysis,
        measuresTaken: data.measuresTaken
      }
    });

    // If a comment is provided, create it and link it to the incident report
    let comment = null;
    if (data.comment) {
      if (!data.userId) {
        return Response.error(
          400,
          "Missing userId",
          "User ID is required for a comment"
        );
      }

      comment = await prisma.comment.create({
        data: {
          content: data.comment,
          userId: data.userId,
          incidentReportId: incidentReport.id
        }
      });
    }

    return Response.success(
      201,
      { incidentReport, comment },
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
