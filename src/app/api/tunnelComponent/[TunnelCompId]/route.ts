import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/Response";

// Fetch tunnel component by ID
export async function GET(req: NextRequest, context: any) {
  const { TunnelCompId } = context.params;

  if (!TunnelCompId) {
    return Response.error(
      400,
      "Validation Error",
      "Tunnel Component ID is required"
    );
  }

  try {
    const tunnelComponent = await prisma.tunnelComponent.findUnique({
      where: { id: TunnelCompId }
    });

    if (!tunnelComponent) {
      return Response.error(404, "Not Found", "Tunnel component not found");
    }

    return Response.success(
      200,
      tunnelComponent,
      "Tunnel component fetched successfully"
    );
  } catch (error) {
    console.error("Error fetching tunnel component:", error);
    return Response.error(
      500,
      "Database Error",
      "Failed to fetch tunnel component"
    );
  }
}

// Update tunnel component by ID
export async function PATCH(req: NextRequest, context: any) {
  const { TunnelCompId } = context.params;
  const data = await req.json();

  if (!TunnelCompId) {
    return Response.error(
      400,
      "Validation Error",
      "Tunnel Component ID is required"
    );
  }

  try {
    const updatedTunnelComponent = await prisma.tunnelComponent.update({
      where: { id: TunnelCompId },
      data
    });

    return Response.success(
      200,
      updatedTunnelComponent,
      "Tunnel component updated successfully"
    );
  } catch (error) {
    console.error("Error updating tunnel component:", error);
    return Response.error(
      500,
      "Database Error",
      "Failed to update tunnel component"
    );
  }
}

// Delete tunnel component by ID
export async function DELETE(req: NextRequest, context: any) {
  const { TunnelCompId } = context.params;

  if (!TunnelCompId) {
    return Response.error(
      400,
      "Validation Error",
      "Tunnel Component ID is required"
    );
  }

  try {
    await prisma.tunnelComponent.delete({
      where: { id: TunnelCompId }
    });

    return Response.success(200, null, "Tunnel component deleted successfully");
  } catch (error) {
    console.error("Error deleting tunnel component:", error);
    return Response.error(
      500,
      "Database Error",
      "Failed to delete tunnel component"
    );
  }
}
