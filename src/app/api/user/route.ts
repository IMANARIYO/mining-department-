import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import Response from "@/lib/Response";

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

    return Response.success(200, formattedUsers, "Users fetched successfully");
  } catch (error) {
    return Response.error(
      500,
      "Failed to fetch users",
      (error as Error).message
    );
  }
}
