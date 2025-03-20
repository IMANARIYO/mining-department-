import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import Response from "@/lib/Response";

// PATCH: Update TunnelAdvancement by ID
export async function PATCH(
  req: NextRequest,
  context: { params: { advancementId: string } }
) {
  try {
    // ✅ Ensure advancementId is extracted correctly
    const { advancementId } = await Promise.resolve(context.params);

    if (!advancementId) {
      console.error("Error: advancementId is missing or undefined");
      return Response.error(400, "Bad Request", "Advancement ID is required");
    }

    console.log("Updating TunnelAdvancement ID:", advancementId);

    // ✅ Get data from request body
    const data = await req.json();

    // ✅ Check if tunnel advancement exists
    const existingTunnelAdvancement = await prisma.tunnelAdvancement.findUnique(
      {
        where: { id: advancementId }
      }
    );

    if (!existingTunnelAdvancement) {
      return Response.error(404, "Not Found", "Tunnel Advancement not found");
    }

    // ✅ Update the Tunnel Advancement
    const updatedTunnelAdvancement = await prisma.tunnelAdvancement.update({
      where: { id: advancementId },
      data
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
  context: { params: { advancementId?: string }; resolve: Function }
) {

    try {
      // ✅ Ensure advancementId is extracted correctly
      const { advancementId } = await Promise.resolve(context.params);

      if (!advancementId) {
        console.error("Error: advancementId is missing or undefined");
        return Response.error(400, "Bad Request", "Advancement ID is required");
      }

      console.log("Deleting TunnelAdvancement ID:", advancementId);

      // ✅ Check if tunnel advancement exists
      const tunnelAdvancement = await prisma.tunnelAdvancement.findUnique({
        where: { id: advancementId }
      });

      if (!tunnelAdvancement) {
        return Response.error(404, "Not Found", "Tunnel Advancement not found");
      }

      // ✅ Delete the tunnel advancement
      await prisma.tunnelAdvancement.delete({
        where: { id: advancementId }
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
