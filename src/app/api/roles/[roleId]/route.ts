import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/Response"; // Import custom Response class

// ✅ GET Role by ID
export async function GET(
  request: NextRequest,
  context: { params: { roleId: string } }
) {
  const { roleId } = context.params; // Extract roleId

  if (!roleId) {
    return Response.error(400, "Role ID is required", "Invalid request");
  }

  try {
    const role = await prisma.role.findUnique({
      where: { id: roleId },
    });

    if (!role) {
      return Response.error(
        404,
        "Role not found",
        "No role exists with this ID"
      );
    }

    return Response.success(200, role, "Role retrieved successfully");
  } catch (error) {
    console.error("Error fetching role:", error);
    return Response.error(
      500,
      "Failed to fetch role",
      (error as Error).message
    );
  }
}

// ✅ UPDATE Role by ID
export async function PATCH(
  req: NextRequest,
  context: { params: { roleId: string } }
) {
  const { roleId } = context.params;
  const { name } = await req.json();

  if (!roleId) {
    return Response.error(400, "Role ID is required", "Invalid request");
  }

  if (!name) {
    return Response.error(
      400,
      "Role name is required",
      "Please provide a role name"
    );
  }

  try {
    const roleExists = await prisma.role.findUnique({
      where: { id: roleId },
    });

    if (!roleExists) {
      return Response.error(
        404,
        "Role not found",
        "No role exists with this ID"
      );
    }

    const updatedRole = await prisma.role.update({
      where: { id: roleId },
      data: { name },
    });

    return Response.success(200, updatedRole, "Role updated successfully");
  } catch (error) {
    console.error("Error updating role:", error);
    return Response.error(
      500,
      "Failed to update role",
      (error as Error).message
    );
  }
}

// ✅ DELETE Role by ID
export async function DELETE(
  req: NextRequest,
  context: { params: { roleId: string } }
) {
  const { roleId } = context.params;

  if (!roleId) {
    return Response.error(400, "Role ID is required", "Invalid request");
  }

  try {
    const roleExists = await prisma.role.findUnique({
      where: { id: roleId },
    });

    if (!roleExists) {
      return Response.error(
        404,
        "Role not found",
        "No role exists with this ID"
      );
    }

    const usersWithRole = await prisma.userRole.count({
      where: { roleId },
    });

    if (usersWithRole > 0) {
      return Response.error(
        400,
        "Cannot delete role",
        "Role is assigned to active users"
      );
    }

    await prisma.role.delete({
      where: { id: roleId },
    });

    return Response.success(200, null, "Role deleted successfully");
  } catch (error) {
    console.error("Error deleting role:", error);
    return Response.error(
      500,
      "Failed to delete role",
      (error as Error).message
    );
  }
}
