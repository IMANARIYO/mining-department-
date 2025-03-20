import { prisma } from "@/lib/prisma";
import Response from "@/lib/Response";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const site = await prisma.site.create({
      data: { ...data },
    });
    return Response.success(201, site, "Site created successfully");
  } catch (error) {
    console.error("Error creating site:", error);
    return Response.error(500, "Error creating site", (error as Error).message);
  }
}
// Get All Sites
export async function GET() {
  try {
    const sites = await prisma.site.findMany();
    return Response.success(200, sites, "Sites fetched successfully");
  } catch (error) {
    console.error("Error fetching sites:", error);
    return Response.error(
      500,
      "Error fetching sites",
      (error as Error).message
    );
  }
}
