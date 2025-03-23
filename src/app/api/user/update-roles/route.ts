import { prisma } from "@/lib/prisma"; // Import Prisma client
import Response from "@/lib/Response"; // Import your response helper
import { NextResponse } from "next/server";

// PUT - Update multiple roles for a user
export async function PUT(req: Request) {
  try {
    const { userId, newRoleIds } = await req.json();

    // First, remove all existing roles for the user
    await prisma.userRole.deleteMany({
      where: {
        userId
      }
    });

    // Then, add the new roles
    const userRoles = await prisma.userRole.createMany({
      data: newRoleIds.map((roleId: string) => ({
        userId,
        roleId
      }))
    });

    return Response.success(200, userRoles, "User roles updated successfully.");
  } catch (error) {
    return Response.error(
      500,
      (error as Error).message,
      "Failed to update user roles."
    );
  }
}
