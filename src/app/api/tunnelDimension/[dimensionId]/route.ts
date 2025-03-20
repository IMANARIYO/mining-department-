import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


// ✅ PATCH Tunnel Dimension (update the dimension by dimensionId)
export async function PATCH(
  req: NextRequest,
  context: { params: { dimensionId: string } }
) {
  const { dimensionId } = await Promise.resolve(context.params);
  const updateData = await req.json(); // Get all request body fields dynamically

  if (!dimensionId) {
    return NextResponse.json(
      { error: "Dimension ID is required" },
      { status: 400 }
    );
  }

  try {
    // ✅ Check if the dimension exists before updating
    const existingDimension = await prisma.tunnelDimension.findUnique({
      where: { id: dimensionId }
    });

    if (!existingDimension) {
      return NextResponse.json(
        { error: "Dimension not found" },
        { status: 404 }
      );
    }

    // ✅ Filter out undefined fields before updating
    const filteredData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    if (Object.keys(filteredData).length === 0) {
      return NextResponse.json(
        { error: "No valid fields provided for update" },
        { status: 400 }
      );
    }

    // ✅ Update the tunnel dimension with only provided fields
    const updatedDimension = await prisma.tunnelDimension.update({
      where: { id: dimensionId },
      data: filteredData
    });

    return NextResponse.json(
      {
        message: "Dimension updated successfully",
        dimension: updatedDimension
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating tunnel dimension:", error);
    return NextResponse.json(
      {
        error: "Failed to update tunnel dimension",
        message: (error as Error).message
      },
      { status: 500 }
    );
  }
}

// ✅ DELETE Tunnel Dimension by ID// ✅ DELETE Tunnel Dimension by ID
export async function DELETE(
  req: NextRequest,
  context: { params: { dimensionId: string } }
) {
  const { dimensionId } = await Promise.resolve(context.params);

  if (!dimensionId) {
    return NextResponse.json(
      { error: "Dimension ID is required" },
      { status: 400 }
    );
  }

  try {
    // ✅ Check if the dimension exists before deleting
    const existingDimension = await prisma.tunnelDimension.findUnique({
      where: { id: dimensionId }
    });

    if (!existingDimension) {
      return NextResponse.json(
        { error: "Dimension not found" },
        { status: 404 }
      );
    }

    // ✅ Delete the tunnel dimension
    const deletedDimension = await prisma.tunnelDimension.delete({
      where: { id: dimensionId }
    });

    return NextResponse.json(
      {
        message: "Dimension deleted successfully",
        dimension: deletedDimension
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting tunnel dimension:", error);
    return NextResponse.json(
      {
        error: "Failed to delete tunnel dimension",
        message: (error as Error).message
      },
      { status: 500 }
    );
  }
}

// ✅ GET Tunnel Dimension by ID
export async function GET(
  req: NextRequest,
  context: { params: { dimensionId: string } }
) {
  const { dimensionId } = await Promise.resolve(context.params);

  if (!dimensionId) {
    return NextResponse.json(
      { error: "Dimension ID is required" },
      { status: 400 }
    );
  }

  try {
    // ✅ Fetch the tunnel dimension using its ID
    const tunnelDimension = await prisma.tunnelDimension.findUnique({
      where: { id: dimensionId },
      include: { tunnel: true }
    });

    if (!tunnelDimension) {
      return NextResponse.json(
        { error: "Dimension not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(tunnelDimension, { status: 200 });
  } catch (error) {
    console.error("Error fetching tunnel dimension:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch tunnel dimension",
        message: (error as Error).message
      },
      { status: 500 }
    );
  }
}
