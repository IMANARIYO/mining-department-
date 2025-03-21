import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/Response";

function getDateOnly(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const manpowerId = searchParams.get("manpowerId");

    if (!manpowerId) {
      return Response.error(
        400,
        "Missing required parameter",
        "ManpowerId is required"
      );
    }

    const today = getDateOnly();

    const attendance = await prisma.attendance.findFirst({
      where: {
        manpowerId,
        date: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), 
        },
      },
      include: {
        manpower: {
          select: {
            name: true,
            role: true,
          },
        },
      },
    });

    if (!attendance) {
      return Response.success(
        200,
        { exists: false, canCheckIn: true },
        "No attendance record found for today"
      );
    }

    return Response.success(
      200,
      {
        exists: true,
        canCheckIn: false,
        canCheckOut: !attendance.checkOutTime,
        attendance,
      },
      "Today's attendance record retrieved successfully"
    );
  } catch (error) {
    console.error("Error fetching today's attendance:", error);
    return Response.error(
      500,
      "Internal Server Error",
      "Error fetching today's attendance"
    );
  }
}
