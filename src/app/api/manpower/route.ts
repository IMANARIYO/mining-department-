// app/api/manpower/route.ts
import { NextRequest } from "next/server";
import {prisma} from "@/lib/prisma";
import Response from "@/lib/Response";

// GET all manpower
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const tunnelId = searchParams.get("tunnelId");

    // If tunnelId is provided, filter by tunnel
    const where = tunnelId ? { tunnelId } : {};

    const manpower = await prisma.manpower.findMany({
      where,
      include: {
        tunnel: {
          select: {
            name: true,
          },
        },
        warning: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.success(200, manpower, "Manpower retrieved successfully");
  } catch (error) {
    console.error("Error fetching manpower:", error);
    return Response.error(
      500,
      "Internal Server Error",
      "Error fetching manpower data"
    );
  }
}

// POST create new manpower
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, role, location, tunnelId } = body;

    // Validate required fields
    if (!name || !role || !location || !tunnelId) {
      return Response.error(
        400,
        "Missing required fields",
        "Name, role, location, and tunnelId are required"
      );
    }

    // Check if tunnel exists
    const tunnel = await prisma.tunnel.findUnique({
      where: { id: tunnelId },
    });

    if (!tunnel) {
      return Response.error(
        404,
        "Tunnel not found",
        "The specified tunnel does not exist"
      );
    }

    // Create new manpower
    const newManpower = await prisma.manpower.create({
      data: {
        name,
        role,
        location,
        tunnelId
      },
    });

    return Response.success(201, newManpower, "Manpower created successfully");
  } catch (error) {
    console.error("Error creating manpower:", error);
    return Response.error(
      500,
      "Internal Server Error",
      "Error creating manpower"
    );
  }
}
