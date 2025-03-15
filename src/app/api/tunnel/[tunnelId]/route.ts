import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
// ✅ GET Tunnel by ID
export async function GET(req: NextRequest, context: { params: { tunnelId: string } }) {
  const { tunnelId } = await Promise.resolve(context.params);

  try {
    const tunnel = await prisma.tunnel.findUnique({
      where: { id: tunnelId },
      include: { supervisor: true, comments: true, dimensions: true, components: true, advancements: true, blasts: true, incidents: true },
    });

    if (!tunnel) {
      return NextResponse.json({ error: "Tunnel not found" }, { status: 404 });
    }

    return NextResponse.json(tunnel, { status: 200 });
  } catch (error) {
    console.error("Error fetching tunnel:", error);
    return NextResponse.json({ error: "Failed to fetch tunnel" }, { status: 500 });
  }
}
// ✅ UPDATE Tunnel by ID
export async function PATCH(req: NextRequest, context: { params: { tunnelId: string } }) {
  const { tunnelId } = await Promise.resolve(context.params);
  const { name, supervisorId } = await req.json();

  try {
    const existingTunnel = await prisma.tunnel.findUnique({ where: { id: tunnelId } });
    if (!existingTunnel) {
      return NextResponse.json({ error: "Tunnel not found" }, { status: 404 });
    }

    const updatedTunnel = await prisma.tunnel.update({
      where: { id: tunnelId },
      data: { name, supervisorId },
    });

    return NextResponse.json(updatedTunnel, { status: 200 });
  } catch (error) {
    console.error("Error updating tunnel:", error);
    return NextResponse.json({ error: "Failed to update tunnel" }, { status: 500 });
  }
}

// ✅ DELETE Tunnel by ID
export async function DELETE(req: NextRequest, context: { params: { tunnelId: string } }) {
  const { tunnelId } = await Promise.resolve(context.params);

  try {
    const existingTunnel = await prisma.tunnel.findUnique({ where: { id: tunnelId } });
    if (!existingTunnel) {
      return NextResponse.json({ error: "Tunnel not found" }, { status: 404 });
    }

    await prisma.tunnel.delete({ where: { id: tunnelId } });

    return NextResponse.json({ message: "Tunnel deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting tunnel:", error);
    return NextResponse.json({ error: "Failed to delete tunnel" }, { status: 500 });
  }
}

