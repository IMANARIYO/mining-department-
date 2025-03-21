import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/Response";

export async function GET(
  req: NextRequest,
  context: { params: { blastId: string } }
) {
  try {
    const { blastId } = await Promise.resolve(context.params);
    const blastLog = await prisma.blastLog.findUnique({
      where: { id: blastId },
    });

    if (!blastLog) {
      return Response.error(404, "Blast log not found", "Invalid blast ID");
    }

    return Response.success(200, blastLog, "Blast log retrieved successfully");
  } catch (error) {
    return Response.error(
      500,
      (error as Error).message,
      "Failed to fetch blast log"
    );
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: { blastId: string } }
) {
  try {
    const { blastId } = await Promise.resolve(context.params);
    const body = await req.json();

    const updatedBlastLog = await prisma.blastLog.update({
      where: { id: blastId },
      data: body,
    });

    return Response.success(
      200,
      updatedBlastLog,
      "Blast log updated successfully"
    );
  } catch (error) {
    return Response.error(
      500,
      (error as Error).message,
      "Failed to update blast log"
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { blastId: string } }
) {
  try {
    const { blastId } = await Promise.resolve(context.params);

    await prisma.blastLog.delete({
      where: { id: blastId },
    });

    return Response.success(200, null, "Blast log deleted successfully");
  } catch (error) {
    return Response.error(
      500,
      (error as Error).message,
      "Failed to delete blast log"
    );
  }
}
