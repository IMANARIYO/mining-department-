import { NextRequest } from "next/server";
import {prisma} from "@/lib/prisma";
import Response from "@/lib/Response";


// ✅ CREATE Tunnel
export async function POST(req: NextRequest) {
  const data = await req.json(); // Keep future flexibility

  if (!data.name || !data.siteId) {
    return Response.error(
      400,
      "Validation Error",
      "Tunnel name and siteId are required"
    );
  }

  if (data.supervisorId) {
    const supervisor = await prisma.user.findUnique({
      where: { id: data.supervisorId }
    });

    if (!supervisor) {
      return Response.error(
        400,
        "Supervisor Not Found",
        "The provided supervisor does not exist."
      );
    }
  }

  try {
    // Check if a tunnel with the same name, supervisorId, and siteId already exists
    const existingTunnel = await prisma.tunnel.findFirst({
      where: {
        name: data.name,
        siteId: data.siteId,
        supervisorId: data.supervisorId ?? null
      }
    });

    if (existingTunnel) {
      return Response.error(
        400,
        "Duplicate Tunnel",
        "A tunnel with this name, site, and supervisor already exists."
      );
    }

    // Create the tunnel
    const newTunnel = await prisma.tunnel.create({ data });

    return Response.success(201, newTunnel, "Tunnel created successfully");
  } catch (error) {
    console.error("Error creating tunnel:", error);
    return Response.error(500, "Database Error", "Failed to create tunnel");
  }
}

// ✅ GET All Tunnels
export async function GET() {
  try {
    const tunnels = await prisma.tunnel.findMany({
      include: { supervisor: true, site: true } // Fetch supervisor and site details
    });

    return Response.success(200, tunnels, "Tunnels fetched successfully");
  } catch (error) {
    console.error("Error fetching tunnels:", error);
    return Response.error(500, "Database Error", "Failed to fetch tunnels");
  }
}
