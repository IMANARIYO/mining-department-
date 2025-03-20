import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/Response";

function getDateOnly(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function calculateHoursWorked(checkInTime: Date, checkOutTime: Date): number {
  const diffInMilliseconds = checkOutTime.getTime() - checkInTime.getTime();
  return parseFloat((diffInMilliseconds / (1000 * 60 * 60)).toFixed(2));
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const manpowerId = searchParams.get("manpowerId");
    const date = searchParams.get("date");

    let whereClause: any = {};

    if (manpowerId) {
      whereClause.manpowerId = manpowerId;
    }

    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);

      whereClause.date = {
        gte: startDate,
        lt: endDate,
      };
    }

    const attendanceRecords = await prisma.attendance.findMany({
      where: whereClause,
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
      orderBy: {
        date: "desc",
      },
    });

    return Response.success(
      200,
      attendanceRecords,
      "Attendance records retrieved successfully"
    );
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    return Response.error(
      500,
      "Internal Server Error",
      "Error fetching attendance records"
    );
  }
}

// Check in 
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { manpowerId, notes } = body;

    if (!manpowerId) {
      return Response.error(
        400,
        "Missing required fields",
        "ManpowerId is required"
      );
    }

    const manpower = await prisma.manpower.findUnique({
      where: { id: manpowerId },
    });

    if (!manpower) {
      return Response.error(
        404,
        "Manpower not found",
        "The specified manpower does not exist"
      );
    }

    const today = getDateOnly();
    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        manpowerId,
        date: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), 
        },
      },
    });

    if (existingAttendance) {
      return Response.error(
        400,
        "Attendance already recorded",
        "Attendance for this manpower has already been recorded today"
      );
    }

    // check-in
    const now = new Date();
    const newAttendance = await prisma.attendance.create({
      data: {
        manpowerId,
        date: getDateOnly(now),
        checkInTime: now,
        status: "present",
        notes,
      },
    });

    return Response.success(
      201,
      newAttendance,
      "Check-in recorded successfully"
    );
  } catch (error) {
    console.error("Error recording check-in:", error);
    return Response.error(
      500,
      "Internal Server Error",
      "Error recording check-in"
    );
  }
}

// PUT - Check out (update existing attendance record)
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, notes } = body;

    // Validate required fields
    if (!id) {
      return Response.error(
        400,
        "Missing required fields",
        "Attendance ID is required"
      );
    }

    // Get the existing attendance record
    const existingAttendance = await prisma.attendance.findUnique({
      where: { id },
    });

    if (!existingAttendance) {
      return Response.error(
        404,
        "Attendance record not found",
        "The specified attendance record does not exist"
      );
    }

    if (existingAttendance.checkOutTime) {
      return Response.error(
        400,
        "Already checked out",
        "This worker has already been checked out"
      );
    }

    const now = new Date();
    const hoursWorked = calculateHoursWorked(
      existingAttendance.checkInTime,
      now
    );

    const updatedAttendance = await prisma.attendance.update({
      where: { id },
      data: {
        checkOutTime: now,
        hoursWorked,
        notes: notes || existingAttendance.notes,
      },
    });

    return Response.success(
      200,
      updatedAttendance,
      "Check-out recorded successfully"
    );
  } catch (error) {
    console.error("Error recording check-out:", error);
    return Response.error(
      500,
      "Internal Server Error",
      "Error recording check-out"
    );
  }
}
