import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import Response from "@/lib/Response";

// PATCH: Update TunnelAdvancement by ID
export async function PATCH(
  req: NextRequest,
  context: { params: { advancementId: string } }
) {
  const { advancementId } = context.params; // Get the advancementId from the route parameter

  try {
    const data = await req.json(); // Get data from the request body

    const existingTunnelAdvancement = await prisma.tunnelAdvancement.findUnique(
      {
        where: { id: advancementId } // Use the advancementId from params
      }
    );

    if (!existingTunnelAdvancement) {
      return Response.error(404, "Not Found", "Tunnel Advancement not found");
    }

    const updatedTunnelAdvancement = await prisma.tunnelAdvancement.update({
      where: { id: advancementId }, // Update using the advancementId
      data // Pass the updated data
    });

    return Response.success(
      200,
      updatedTunnelAdvancement,
      "Tunnel Advancement updated successfully"
    );
  } catch (error) {
    console.error("Error updating Tunnel Advancement:", error);
    return Response.error(
      500,
      (error as Error).message,
      "Failed to update Tunnel Advancement"
    );
  }
}

// DELETE: Delete TunnelAdvancement by ID
export async function DELETE(
  req: NextRequest,
  context: { params: { advancementId: string } }
) {
  const { advancementId } = context.params; // Get the advancementId from the route parameter

  try {
    const tunnelAdvancement = await prisma.tunnelAdvancement.findUnique({
      where: { id: advancementId } // Use the advancementId from params
    });

    if (!tunnelAdvancement) {
      return Response.error(404, "Not Found", "Tunnel Advancement not found");
    }

    await prisma.tunnelAdvancement.delete({
      where: { id: advancementId } // Delete using the advancementId
    });

    return Response.success(
      200,
      null,
      "Tunnel Advancement deleted successfully"
    );
  } catch (error) {
    console.error("Error deleting Tunnel Advancement:", error);
    return Response.error(
      500,
      (error as Error).message,
      "Failed to delete Tunnel Advancement"
    );
  }
}
