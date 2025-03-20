import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ GET ALL USERS
export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      include: {
        roles: {
          include: { role: true },
        },
      },
    });

    const formattedUsers = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles.map((userRole) => userRole.role),
    }));

    return NextResponse.json({ users: formattedUsers }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users", message: (error as Error).message },
      { status: 500 }
    );
  }
}
