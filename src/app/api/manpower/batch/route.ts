// app/api/manpower/batch/route.ts
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/Response";

// POST update multiple manpower presence
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { manpowerIds, present, siteInspectionId = null } = body;

    if (!Array.isArray(manpowerIds) || manpowerIds.length === 0) {
      return Response.error(
        400,
        "Invalid request",
        "manpowerIds must be a non-empty array"
      );
    }

    // Update manpower records
    const updatePromises = manpowerIds.map((id) =>
      prisma.manpower.update({
        where: { id },
        data: {
          present,
          siteInspectionId,
        },
      })
    );

    await Promise.all(updatePromises);

    return Response.success(
      200,
      null,
      `Updated presence for ${manpowerIds.length} manpower records`
    );
  } catch (error) {
    console.error("Error updating manpower batch:", error);
    return Response.error(
      500,
      "Internal Server Error",
      "Error updating manpower batch"
    );
  }
}

// GET manpower for site inspection
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const siteInspectionId = searchParams.get("siteInspectionId");

    if (!siteInspectionId) {
      return Response.error(
        400,
        "Missing parameter",
        "siteInspectionId is required"
      );
    }

    const manpower = await prisma.manpower.findMany({
      where: { siteInspectionId },
      include: {
        tunnel: {
          select: { name: true },
        },
        warning: true,
      },
    });

    return Response.success(
      200,
      manpower,
      "Site inspection manpower retrieved successfully"
    );
  } catch (error) {
    console.error("Error fetching site inspection manpower:", error);
    return Response.error(
      500,
      "Internal Server Error",
      "Error fetching site inspection manpower"
    );
  }
}
