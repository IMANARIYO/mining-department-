import { prisma } from "@/lib/prisma";
import Response from "@/lib/Response";
import { NextRequest} from "next/server";

// ✅ CHECK IF USER HAS A SPECIFIC ROLE BY ROLE ID
export async function GET(
  req: NextRequest,
  { params }: { params: { roleId: string } }
) {
  const { roleId } = params;

  try {
    // Check if any user has the given role
    const usersWithRole = await prisma.userRole.findMany({
      where: { roleId },
      include: { user: true }, // Include user details
    });

    if (usersWithRole.length === 0) {
      return Response.error(
        404,
        "No users have this role",
        "No users found with the given role ID"
      );
    }

    return Response.success(
      200,
      usersWithRole.map((userRole) => userRole.user),
      "Users with the specified role fetched successfully"
    );
  } catch (error) {
    return Response.error(
      500,
      "Failed to check role for users",
      (error as Error).message
    );
  }
}
