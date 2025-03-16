import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import Response from "@/lib/Response";

const FIXED_USER_ID = "cb4f936d-27d0-4cdd-bda2-807506f80b58"; // Explicit user ID

// Create a comment
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const comment = await prisma.comment.create({
      data: {
        ...data,
        userId: FIXED_USER_ID // Explicitly set user ID
      }
    });

    return Response.success(201, comment, "Comment created successfully.");
  } catch (error) {
    return Response.error(
      500,
      (error as Error).message,
      "Failed to create comment."
    );
  }
}

// Get all comments
export async function GET() {
  try {
    const comments = await prisma.comment.findMany();

    return Response.success(200, comments, "Comments retrieved successfully.");
  } catch (error) {
    return Response.error(
      500,
      (error as Error).message,
      "Failed to fetch comments."
    );
  }
}
