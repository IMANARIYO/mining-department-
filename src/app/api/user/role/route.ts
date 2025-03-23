import { prisma } from "@/lib/prisma";
import Response from "@/lib/Response";
import { NextResponse } from "next/server";

// POST - Add multiple roles to a user
export async function POST(req: Request) {
  try {
    const { userId, roleIds } = await req.json();

    // Create UserRole entries to associate the user with the roles
    const userRoles = await prisma.userRole.createMany({
      data: roleIds.map((roleId: string) => ({
        userId,
        roleId
      }))
    });

    return Response.success(201, userRoles, "Roles added successfully");
  } catch (error) {
    console.error("Error adding roles:", error);
    return Response.error(500, "Error adding roles", (error as Error).message);
  }
}

// DELETE - Remove multiple roles from a user
export async function DELETE(req: Request) {
  try {
    const { userId, roleIds } = await req.json();

    // Delete UserRole entries to remove the roles
    const removedRoles = await prisma.userRole.deleteMany({
      where: {
        userId,
        roleId: {
          in: roleIds
        }
      }
    });

    return Response.success(200, removedRoles, "Roles removed successfully");
  } catch (error) {
    console.error("Error removing roles:", error);
    return Response.error(
      500,
      "Error removing roles",
      (error as Error).message
    );
  }
}

// PATCH - Update multiple roles for a user (Partially update roles)
export async function PATCH(req: Request) {
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

    return Response.success(200, userRoles, "Roles updated successfully");
  } catch (error) {
    console.error("Error updating roles:", error);
    return Response.error(
      500,
      "Error updating roles",
      (error as Error).message
    );
  }
}
