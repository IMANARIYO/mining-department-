import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ GET ROLES FOR USER BY USER ID
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  try {
    // Fetch user with their roles
    const userWithRoles = await prisma.user.findUnique({
      where: { id: userId },
      include: { roles: { include: { role: true } } }, // Include the role details
    });

    if (!userWithRoles) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ roles: userWithRoles.roles }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch user roles",
        message: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
