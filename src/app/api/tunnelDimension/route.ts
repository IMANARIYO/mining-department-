import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import Response from "@/lib/Response";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const tunnelDimension = await prisma.tunnelDimension.create({
      data: { ...data }
    });
 if (!data.tunnelId) {
   return Response.error(400, "Missing tunnelId", "Tunnel ID is required");
 }
 const tunnelExists = await prisma.tunnel.findUnique({
   where: { id: data.tunnelId }
 });
   if (!tunnelExists) {
     return Response.error(404, "Tunnel not found", "Invalid tunnel ID");
   }
    return Response.success(
      201,
      tunnelDimension,
      "Tunnel Dimension created successfully"
    );
  } catch (error) {
    return Response.error(
      500,
      (error as Error).message,
      "Failed to create Tunnel Dimension"
    );
  }
}

export async function GET() {
  try {
    const tunnelDimensions = await prisma.tunnelDimension.findMany();
    return Response.success(
      200,
      tunnelDimensions,
      "Tunnel Dimensions retrieved successfully"
    );
  } catch (error) {
    return Response.error(
      500,
      (error as Error).message,
      "Failed to fetch Tunnel Dimensions"
    );
  }
}
