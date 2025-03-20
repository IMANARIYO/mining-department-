import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/Response";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const manpower = await prisma.manpower.findUnique({
      where: { id },
      include: {
        tunnel: {
          select: {
            name: true,
          },
        },
        warning: true,
      },
    });

    if (!manpower) {
      return Response.error(404, "Not Found", "Manpower not found");
    }

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

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, role, location, tunnelId } = body;

    const existingManpower = await prisma.manpower.findUnique({
      where: { id },
    });

    if (!existingManpower) {
      return Response.error(404, "Not Found", "Manpower not found");
    }

    const updatedManpower = await prisma.manpower.update({
      where: { id },
      data: {
        name,
        role,
        location,
        tunnelId,
      },
    });

    return Response.success(
      200,
      updatedManpower,
      "Manpower updated successfully"
    );
  } catch (error) {
    console.error("Error updating manpower:", error);
    return Response.error(
      500,
      "Internal Server Error",
      "Error updating manpower"
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const existingManpower = await prisma.manpower.findUnique({
      where: { id },
      include: { warning: true },
    });

    if (!existingManpower) {
      return Response.error(404, "Not Found", "Manpower not found");
    }

    if (existingManpower.warning) {
      await prisma.warning.delete({
        where: { manpowerId: id },
      });
    }

    await prisma.manpower.delete({
      where: { id },
    });

    return Response.success(200, null, "Manpower deleted successfully");
  } catch (error) {
    console.error("Error deleting manpower:", error);
    return Response.error(
      500,
      "Internal Server Error",
      "Error deleting manpower"
    );
  }
}
