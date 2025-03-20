import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/Response";

// Get comment by ID
export async function GET(
  req: NextRequest,
  context: { params: { commentId: string } }
) {
  try {
    const { commentId } = context.params;

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return Response.error(404, "Comment not found", "Invalid comment ID.");
    }

    return Response.success(200, comment, "Comment retrieved successfully.");
  } catch (error) {
    return Response.error(
      500,
      (error as Error).message,
      "Failed to retrieve comment."
    );
  }
}

// Update comment
export async function PATCH(
  req: NextRequest,
  context: { params: { commentId: string } }
) {
  try {
    const { commentId } = context.params;
    const data = await req.json();

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data,
    });

    return Response.success(
      200,
      updatedComment,
      "Comment updated successfully."
    );
  } catch (error) {
    return Response.error(
      500,
      (error as Error).message,
      "Failed to update comment."
    );
  }
}

// Delete comment
export async function DELETE(
  req: NextRequest,
  context: { params: { commentId: string } }
) {
  try {
    const { commentId } = context.params;

    await prisma.comment.delete({ where: { id: commentId } });

    return Response.success(200, null, "Comment deleted successfully.");
  } catch (error) {
    return Response.error(
      500,
      (error as Error).message,
      "Failed to delete comment."
    );
  }
}
