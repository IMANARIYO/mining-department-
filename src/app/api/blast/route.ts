import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma"; // Ensure you have Prisma set up
import Response from "@/lib/Response";

export async function GET() {
  try {
    const blastLogs = await prisma.blastLog.findMany();
    return Response.success(
      200,
      blastLogs,
      "Blast logs retrieved successfully"
    );
  } catch (error) {
    return Response.error(
      500,
      (error as Error).message,
      "Failed to fetch blast logs"
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newBlastLog = await prisma.blastLog.create({
      data: body,
    });
    return Response.success(201, newBlastLog, "Blast log created successfully");
  } catch (error) {
    console.log("erro creating the blast  ", error);
    return Response.error(
      500,
      (error as Error).message,
      "Failed to create blast log"
    );
  }
}
