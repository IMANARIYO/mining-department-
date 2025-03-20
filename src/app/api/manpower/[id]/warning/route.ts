import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/Response";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status, message } = body;

    const manpower = await prisma.manpower.findUnique({
      where: { id },
      include: { warning: true },
    });

    if (!manpower) {
      return Response.error(404, "Not Found", "Manpower not found");
    }

    let warning;

    if (manpower.warning) {
      warning = await prisma.warning.update({
        where: { manpowerId: id },
        data: {
          status,
          message,
        },
      });
    } else {
      warning = await prisma.warning.create({
        data: {
          status,
          message,
          manpower: {
            connect: {
              id,
            },
          },
        },
      });
    }

    return Response.success(200, warning, "Warning updated successfully");
  } catch (error) {
    console.error("Error updating warning:", error);
    return Response.error(
      500,
      "Internal Server Error",
      "Error updating warning"
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const manpower = await prisma.manpower.findUnique({
      where: { id },
      include: { warning: true },
    });

    if (!manpower) {
      return Response.error(404, "Not Found", "Manpower not found");
    }

    if (!manpower.warning) {
      return Response.error(
        404,
        "Not Found",
        "Warning not found for this manpower"
      );
    }

    // Delete warning
    await prisma.warning.delete({
      where: { manpowerId: id },
    });

    return Response.success(200, null, "Warning deleted successfully");
  } catch (error) {
    console.error("Error deleting warning:", error);
    return Response.error(
      500,
      "Internal Server Error",
      "Error deleting warning"
    );
  }
}
