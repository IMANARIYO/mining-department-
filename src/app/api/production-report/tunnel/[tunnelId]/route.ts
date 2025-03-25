import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/Response";

// Resolve Tunnel ID function
async function resolveTunnelId(tunnelId: string) {
  const tunnel = await prisma.tunnel.findUnique({
    where: { id: tunnelId }
  });

  if (!tunnel) {
    throw new Error("NOT_FOUND");
  }

  return tunnel;
}

// Get all production reports for a specific tunnel
export async function GET(
  req: NextRequest,
  { params }: { params: { tunnelId: string } }
) {
  try {
    await resolveTunnelId(params.tunnelId); // Ensure tunnel exists

    const reports = await prisma.productionReport.findMany({
      where: { tunnelId: params.tunnelId },
      orderBy: { createdAt: "desc" } // Optional: Sort by latest reports
    });

    return Response.success(
      200,
      reports,
      "Production reports retrieved successfully."
    );
  } catch (error) {
    if ((error as Error).message === "NOT_FOUND") {
      return Response.error(404, "NOT_FOUND", "Tunnel not found.");
    }

    return Response.error(
      500,
      "DATABASE_ERROR",
      "Failed to fetch production reports."
    );
  }
}
