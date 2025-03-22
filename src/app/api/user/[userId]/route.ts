import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ GET USER BY ID
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.userId },
      include: { roles: { include: { role: true } }, tunnels: true }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// ✅ UPDATE USER BY ID
export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { name, email, password } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: params.userId },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(password && { password }),
      },
    });

    return NextResponse.json(
      { success: true, data: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// ✅ DELETE USER BY ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await prisma.user.delete({ where: { id: params.userId } });

    return NextResponse.json(
      { success: true, message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
