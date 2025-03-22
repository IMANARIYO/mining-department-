import { prisma } from "@/lib/prisma";
import Response from "@/lib/Response"; // Import custom Response class
import { NextRequest } from "next/server";

// ✅ CREATE Role (POST)
export async function POST(req: NextRequest) {
  const { name } = await req.json();

  if (!name) {
    return Response.error(
      400,
      "Role name is required",
      "Please provide a role name"
    );
  }

  try {
    // Check if the role name already exists
    const existingRole = await prisma.role.findFirst({
      where: { name },
    });

    if (existingRole) {
      return Response.error(
        400,
        "Role with this name already exists",
        "Choose a different name"
      );
    }

    // Create the new role
    const newRole = await prisma.role.create({
      data: { name },
    });

    return Response.success(201, newRole, "Role created successfully");
  } catch (error) {
    console.error("Error creating role:", error);
    return Response.error(
      500,
      "Failed to create role",
      (error as Error).message
    );
  }
}

// ✅ GET ALL Roles (GET)
export async function GET(req: NextRequest) {
  try {
    // Fetch all roles along with associated users
    const roles = await prisma.role.findMany({
      include: {
        users: {
          include: { user: true }, // Get user details for each role
        },
      },
    });

    // Format roles to include only relevant user details
    const formattedRoles = roles.map((role) => ({
      id: role.id,
      name: role.name,
      users: role.users.map((userRole) => userRole.user), // Extract users for each role
    }));

    return Response.success(
      200,
      formattedRoles,
      "Roles retrieved successfully"
    );
  } catch (error) {
    console.error("Error fetching roles:", error);
    return Response.error(
      500,
      "Failed to fetch roles",
      (error as Error).message
    );
  }
}
