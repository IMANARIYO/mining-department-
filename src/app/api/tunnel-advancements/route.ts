import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import Response from "@/lib/Response";

// POST: Create TunnelAdvancement
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.tunnelId) {
      return Response.error(400, "Missing tunnelId", "Tunnel ID is required");
    }

    const tunnelExists = await prisma.tunnel.findUnique({
      where: { id: data.tunnelId }
    });

    if (!tunnelExists) {
      return Response.error(404, "Tunnel not found", "Invalid tunnel ID");
    }

    const tunnelAdvancement = await prisma.tunnelAdvancement.create({
      data: { ...data }
    });

    return Response.success(
      201,
      tunnelAdvancement,
      "Tunnel Advancement created successfully"
    );
  } catch (error) {
    return Response.error(
      500,
      (error as Error).message,
      "Failed to create Tunnel Advancement"
    );
  }
}

// GET: Get all TunnelAdvancements
export async function GET() {
  try {
    const tunnelAdvancements = await prisma.tunnelAdvancement.findMany();
    return Response.success(
      200,
      tunnelAdvancements,
      "Tunnel Advancements retrieved successfully"
    );
  } catch (error) {
    return Response.error(
      500,
      (error as Error).message,
      "Failed to fetch Tunnel Advancements"
    );
  }
}
