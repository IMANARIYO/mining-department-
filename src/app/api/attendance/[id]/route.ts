// app/api/attendance/[id]/route.ts
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/Response";

// GET attendance by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const attendance = await prisma.attendance.findUnique({
      where: { id },
      include: {
        manpower: {
          select: {
            name: true,
            role: true,
            location: true,
            tunnel: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!attendance) {
      return Response.error(
        404,
        "Attendance record not found",
        "The specified attendance record does not exist"
      );
    }

    return Response.success(
      200,
      attendance,
      "Attendance record retrieved successfully"
    );
  } catch (error) {
    console.error("Error fetching attendance record:", error);
    return Response.error(
      500,
      "Internal Server Error",
      "Error fetching attendance record"
    );
  }
}

// DELETE attendance by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Check if attendance record exists
    const attendance = await prisma.attendance.findUnique({
      where: { id },
    });

    if (!attendance) {
      return Response.error(
        404,
        "Attendance record not found",
        "The specified attendance record does not exist"
      );
    }

    // Delete the attendance record
    await prisma.attendance.delete({
      where: { id },
    });

    return Response.success(
      200,
      null,
      "Attendance record deleted successfully"
    );
  } catch (error) {
    console.error("Error deleting attendance record:", error);
    return Response.error(
      500,
      "Internal Server Error",
      "Error deleting attendance record"
    );
  }
}
