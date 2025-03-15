import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ ADD ROLE TO USER
export async function POST(
  req: NextRequest,
  context: { params: { userId: string; roleId: string } }
) {
  const { userId, roleId } = await Promise.resolve(context.params); // Resolve params before using

  try {
    // Check if the user already has the role
    const existingUserRole = await prisma.userRole.findUnique({
      where: { userId_roleId: { userId, roleId } }
    });

    if (existingUserRole) {
      return NextResponse.json(-
        { error: "User already has this role" },
        { status: 400 }
      );
    }

    // Add the new role for the user
    const newUserRole = await prisma.userRole.create({
      data: {
        userId,
        roleId
      }
    });

    return NextResponse.json(
      { message: "Role added successfully", userRole: newUserRole },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add role", message: (error as Error).message },
      { status: 500 }
    );
  }
}

// ✅ REMOVE ROLE FROM USER
export async function DELETE(
  req: NextRequest,
  context: { params: { userId: string; roleId: string } }
) {
  const { userId, roleId } = await Promise.resolve(context.params); // Resolve params before using

  try {
    // Remove the role from the user
    const deletedUserRole = await prisma.userRole.delete({
      where: { userId_roleId: { userId, roleId } }
    });

    return NextResponse.json(
      { message: "Role removed successfully", userRole: deletedUserRole },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to remove role", message: (error as Error).message },
      { status: 500 }
    );
  }
}

