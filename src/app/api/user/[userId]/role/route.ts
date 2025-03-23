import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/Response";

// ✅ GET ROLES FOR USER BY USER ID
export async function GET(req: NextRequest, context: { params: { userId: string } }) {
  console.log("yes  i confirm it me  being  executed  for just  retrieving  user  dta")
  const { userId } = await Promise.resolve(context.params);
  try {
    // Fetch user with their roles
    const userWithRoles = await prisma.user.findUnique({
      where: { id: userId },
      include: { roles: { include: { role: true } } } // Include the role details
    });

    if (!userWithRoles) {
      return Response.error(
        404,
        "User not found",
        "The user with the provided ID does not exist."
      );
    }

    return Response.success(
      200,
      userWithRoles.roles,
      "User roles fetched successfully"
    );
  } catch (error) {
    return Response.error(
      500,
      "Failed to fetch user roles",
      (error as Error).message
    );
  }
}
