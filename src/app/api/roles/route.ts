import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// CREATE Role (POST)
export async function POST(req: NextRequest) {
  const { name } = await req.json();

  // Ensure role name is provided
  if (!name) {
    return NextResponse.json(
      { error: "Role name is required" },
      { status: 400 }
    );
  }

  try {
    // Check if the role name already exists
    const existingRole = await prisma.role.findFirst({
      where: { name }
    });

    if (existingRole) {
      return NextResponse.json(
        { error: "Role with this name already exists" },
        { status: 400 }
      );
    }

    // Create the new role
    const newRole = await prisma.role.create({
      data: { name }
    });

    return NextResponse.json(
      { message: "Role created successfully", role: newRole },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating role:", error);
    return NextResponse.json(
      { error: "Failed to create role", message: (error as Error).message },
      { status: 500 }
    );
  }
}

// GET ALL Roles (GET)
export async function GET(req: NextRequest) {
  try {
    // Fetch all roles along with associated users
    const roles = await prisma.role.findMany({
      include: {
        users: {
          include: { user: true } // Get user details for each role
        }
      }
    });

    // Map roles to include only relevant user details
    const formattedRoles = roles.map((role) => ({
      id: role.id,
      name: role.name,
      users: role.users.map((userRole) => userRole.user) // Extract users for each role
    }));

    return NextResponse.json({ roles: formattedRoles }, { status: 200 });
  } catch (error) {
    console.error("Error fetching roles:", error);
    return NextResponse.json(
      { error: "Failed to fetch roles", message: (error as Error).message },
      { status: 500 }
    );
  }
}
