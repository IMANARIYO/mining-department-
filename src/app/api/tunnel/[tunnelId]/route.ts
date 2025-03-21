import { NextRequest } from "next/server";
import {prisma} from "@/lib/prisma";
import Response from "@/lib/Response";

// ✅ GET Tunnel by ID
export async function GET(
  req: NextRequest,
  { params: { tunnelId } }: { params: { tunnelId: string } }
) {
  try {
    const tunnel = await prisma.tunnel.findUnique({
      where: { id: tunnelId },
      include: {
        supervisor: true,
 
        dimensions: true,
        components: true,
        advancements: true,
        blasts: true,
        incidents: true
      }
    });

    if (!tunnel) {
      return Response.error(
        404,
        "Tunnel not found",
        "The tunnel with the given ID does not exist."
      );
    }

    return Response.success(200, tunnel, "Tunnel fetched successfully");
  } catch (error) {
    console.error("Error fetching tunnel:", error);
    return Response.error(
      500,
      "Failed to fetch tunnel",
      "An error occurred while fetching the tunnel."
    );
  }
}

// ✅ UPDATE Tunnel by ID
export async function PATCH(
  req: NextRequest,
  { params: { tunnelId } }: { params: { tunnelId: string } }
) {
  const { name, supervisorId } = await req.json();

  try {
    const existingTunnel = await prisma.tunnel.findUnique({
      where: { id: tunnelId }
    });
    if (!existingTunnel) {
      return Response.error(
        404,
        "Tunnel not found",
        "The tunnel with the given ID does not exist."
      );
    }

    const updatedTunnel = await prisma.tunnel.update({
      where: { id: tunnelId },
      data: { name, supervisorId }
    });

    return Response.success(200, updatedTunnel, "Tunnel updated successfully");
  } catch (error) {
    console.error("Error updating tunnel:", error);
    return Response.error(
      500,
      "Failed to update tunnel",
      "An error occurred while updating the tunnel."
    );
  }
}

// ✅ DELETE Tunnel by ID
export async function DELETE(
  req: NextRequest,
  { params: { tunnelId } }: { params: { tunnelId: string } }
) {
  try {
    const existingTunnel = await prisma.tunnel.findUnique({
      where: { id: tunnelId }
    });
    if (!existingTunnel) {
      return Response.error(
        404,
        "Tunnel not found",
        "The tunnel with the given ID does not exist."
      );
    }

    await prisma.tunnel.delete({ where: { id: tunnelId } });

    return Response.success(200, null, "Tunnel deleted successfully");
  } catch (error) {
    console.error("Error deleting tunnel:", error);
    return Response.error(
      500,
      "Failed to delete tunnel",
      "An error occurred while deleting the tunnel."
    );
  }
}

// /lib/Response.ts
import { NextResponse } from "next/server";

// Interface for the response structure
interface ResponseData {
  data?: any;
  error?: string;
  message?: string;
}

