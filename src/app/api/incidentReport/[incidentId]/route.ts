// /app/api/incidentReports/[incidentId]/route.ts

import { NextRequest } from "next/server";
import {prisma} from "@/lib/prisma";
import Response from "@/lib/Response";

// Helper function to resolve `incidentId`
async function resolveIncidentId(context: { params: { incidentId: string } }) {
  const { incidentId } = await Promise.resolve(context.params); // Resolve incidentId asynchronously
  return incidentId;
}

// GET: Get Incident Report by ID
export async function GET(
  req: NextRequest,
  context: { params: { incidentId: string } }
) {
  try {
    const incidentId = await resolveIncidentId(context); // Resolve incidentId asynchronously

    const incidentReport = await prisma.incidentReport.findUnique({
      where: { id: incidentId },
   
    });

    return Response.success(
      200,
      incidentReport,
      "Incident Report retrieved successfully"
    );
  } catch (error) {
    return Response.error(
      500,
      (error as Error).message,
      "Failed to fetch Incident Report"
    );
  }
}

// PATCH: Update Incident Report by ID
export async function PATCH(
  req: NextRequest,
  context: { params: { incidentId: string } }
) {
  try {
    const incidentId = await resolveIncidentId(context); // Resolve incidentId asynchronously

    const data = await req.json(); // Get data from the request body

    const updatedIncidentReport = await prisma.incidentReport.update({
      where: { id: incidentId },
      data // Pass the updated data
    });

    return Response.success(
      200,
      updatedIncidentReport,
      "Incident Report updated successfully"
    );
  } catch (error) {
    return Response.error(
      500,
      (error as Error).message,
      "Failed to update Incident Report"
    );
  }
}

// DELETE: Delete Incident Report by ID
export async function DELETE(
  req: NextRequest,
  context: { params: { incidentId: string } }
) {
  try {
    const incidentId = await resolveIncidentId(context); // Resolve incidentId asynchronously

    await prisma.incidentReport.delete({
      where: { id: incidentId }
    });

    return Response.success(200, null, "Incident Report deleted successfully");
  } catch (error) {
    return Response.error(
      500,
      (error as Error).message,
      "Failed to delete Incident Report"
    );
  }
}
