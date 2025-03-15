// Handle GET request for fetching Tunnel Components
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import Response from "@/lib/Response";
export async function GET(req: NextRequest) {
 const { tunnelId } = await req.json();

  if (!tunnelId) {
    return Response.error(400, "Validation Error", "Tunnel ID is required");
  }

  try {
    const tunnelComponents = await prisma.tunnelComponent.findMany({
      where: { tunnelId },
      include: { tunnel: true }
    });

    return Response.success(
      200,
      tunnelComponents,
      "Tunnel components fetched successfully"
    );
  } catch (error) {
    console.error("Error fetching tunnel components:", error);
    return Response.error(
      500,
      "Database Error",
      "Failed to fetch tunnel components"
    );
  }
}

// Handle POST request for creating a new Tunnel Component
export async function POST(req: NextRequest) {
  const data = await req.json();

  if (!data.tunnelId) {
    return Response.error(400, "Validation Error", "Tunnel ID is required");
  }

  try {
    // Check if the tunnel exists
    const tunnelExists = await prisma.tunnel.findUnique({
      where: { id: data.tunnelId }
    });

    if (!tunnelExists) {
      return Response.error(
        400,
        "Tunnel Not Found",
        "The provided tunnel ID does not exist."
      );
    }

    const newTunnelComponent = await prisma.tunnelComponent.create({
      data
    });

    return Response.success(
      201,
      newTunnelComponent,
      "Tunnel component created successfully"
    );
  } catch (error) {
    console.error("Error creating tunnel component:", error);
    return Response.error(
      500,
      "Database Error",
      "Failed to create tunnel component"
    );
  }
}
