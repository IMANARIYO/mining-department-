import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/Response";

// Resolve Production Report ID function
async function resolveProductionReportId(reportId: string) {
  const report = await prisma.productionReport.findUnique({
    where: { id: reportId }
  });

  if (!report) {
    throw new Error("NOT_FOUND");
  }

  return report;
}

// Get a single production report by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const report = await resolveProductionReportId(params.id);
    return Response.success(
      200,
      report,
      "Production report retrieved successfully."
    );
  } catch (error) {
    return Response.error(404, "NOT_FOUND", "Production report not found.");
  }
}

// Update a production report
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    await resolveProductionReportId(params.id); // Ensure report exists

    const updatedReport = await prisma.productionReport.update({
      where: { id: params.id },
      data: body
    });

    return Response.success(
      200,
      updatedReport,
      "Production report updated successfully."
    );
  } catch (error) {
    return Response.error(
      500,
      "DATABASE_ERROR",
      "Failed to update production report."
    );
  }
}

// Delete a production report
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await resolveProductionReportId(params.id); // Ensure report exists

    await prisma.productionReport.delete({
      where: { id: params.id }
    });

    return Response.success(
      200,
      null,
      "Production report deleted successfully."
    );
  } catch (error) {
    return Response.error(
      500,
      "DATABASE_ERROR",
      "Failed to delete production report."
    );
  }
}
