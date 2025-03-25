import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/Response";

// Helper function to resolve tunnelId
async function resolveTunnelId(context: { params: { tunnelId: string } }) {
  const { tunnelId } = context.params;
  return tunnelId; // Return the tunnelId from the URL
}

// GET: List all incidents for a given tunnelId
export async function GET(
  req: NextRequest,
  context: { params: { tunnelId: string } }
) {
  try {
    const tunnelId = await resolveTunnelId(context); // Resolve tunnelId asynchronously

    // Check if the tunnel exists
    const tunnelExists = await prisma.tunnel.findUnique({
      where: { id: tunnelId }
    });

    if (!tunnelExists) {
      return Response.error(404, "Tunnel not found", "Invalid tunnel ID");
    }

    // Fetch all incidents for the given tunnelId
    const incidents = await prisma.incidentReport.findMany({
      where: { tunnelId },
      orderBy: { createdAt: "desc" } // Ordering incidents by most recent
    });

    return Response.success(200, incidents, "Incidents retrieved successfully");
  } catch (error) {
    return Response.error(
      500,
      (error as Error).message,
      "Failed to fetch incidents"
    );
  }
}
