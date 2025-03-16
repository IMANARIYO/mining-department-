import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import Response from "@/lib/Response";

export async function GET(
  req: NextRequest,
  context: { params: { siteId: string } }
) {
  try {
    const { siteId } = await Promise.resolve(context.params); // ✅ Correctly resolving params from context

    // Fetch all tunnels associated with the siteId
    const tunnels = await prisma.tunnel.findMany({
      where: { siteId }
    });

 
    return Response.success(200, tunnels, "Tunnels fetched successfully");
  } catch (error) {
    console.error("Error fetching tunnels:", error);
    return Response.error(
      500,
      "Error fetching tunnels",
      "An error occurred while fetching tunnels."
    );
  }
}
