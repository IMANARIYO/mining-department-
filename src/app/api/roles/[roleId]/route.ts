import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ GET Role by ID
export async function GET(
  request: NextRequest,
  context: { params: { roleId: string } }
) {
  const { roleId } = await Promise.resolve(context.params); // Extract roleId

  if (!roleId) {
    return NextResponse.json({ error: "Role ID is required" }, { status: 400 });
  }

  try {
    const role = await prisma.role.findUnique({
      where: { id: roleId }
    });

    if (!role) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }

    return NextResponse.json(role, { status: 200 });
  } catch (error) {
    console.error("Error fetching role:", error);
    return NextResponse.json(
      { error: "Failed to fetch role", message: (error as Error).message },
      { status: 500 }
    );
  }
}

// ✅ UPDATE Role by ID
export async function PATCH(
  req: NextRequest,
  context: { params: { roleId: string } }
) {
  const { roleId } = await Promise.resolve(context.params); // Extract roleId
  const { name } = await req.json();

  if (!roleId) {
    return NextResponse.json({ error: "Role ID is required" }, { status: 400 });
  }

  if (!name) {
    return NextResponse.json(
      { error: "Role name is required" },
      { status: 400 }
    );
  }

  try {
    const roleExists = await prisma.role.findUnique({
      where: { id: roleId }
    });

    if (!roleExists) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }

    const updatedRole = await prisma.role.update({
      where: { id: roleId },
      data: { name }
    });

    return NextResponse.json(
      { message: "Role updated successfully", role: updatedRole },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating role:", error);
    return NextResponse.json(
      { error: "Failed to update role", message: (error as Error).message },
      { status: 500 }
    );
  }
}

// ✅ DELETE Role by ID
export async function DELETE(
  req: NextRequest,
  context: { params: { roleId: string } }
) {
  const { roleId } = await Promise.resolve(context.params); // Extract roleId

  if (!roleId) {
    return NextResponse.json({ error: "Role ID is required" }, { status: 400 });
  }

  try {
    const roleExists = await prisma.role.findUnique({
      where: { id: roleId }
    });

    if (!roleExists) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }

    const usersWithRole = await prisma.userRole.count({
      where: { roleId }
    });

    if (usersWithRole > 0) {
      return NextResponse.json(
        { error: "Cannot delete role, it is assigned to active users" },
        { status: 400 }
      );
    }

    await prisma.role.delete({
      where: { id: roleId }
    });

    return NextResponse.json(
      { message: "Role deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting role:", error);
    return NextResponse.json(
      { error: "Failed to delete role", message: (error as Error).message },
      { status: 500 }
    );
  }
}
