import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ CHECK IF USER HAS A SPECIFIC ROLE BY ROLE ID
export async function GET(
  req: NextRequest,
  { params }: { params: { roleId: string } }
) {
  const { roleId } = params;

  try {
    // Check if any user has the given role
    const usersWithRole = await prisma.userRole.findMany({
      where: { roleId },
      include: { user: true } // Include user details
    });

    if (usersWithRole.length === 0) {
      return NextResponse.json(
        { error: "No users have this role" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { users: usersWithRole.map((userRole) => userRole.user) },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to check role for users",
        message: (error as Error).message
      },
      { status: 500 }
    );
  }
}
