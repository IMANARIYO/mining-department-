import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ GET USER BY ID
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = await Promise.resolve(params); // Resolve params with await

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        roles: { include: { role: true } },
        tunnels: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user", message: (error as Error).message },
      { status: 500 }
    );
  }
}

// ✅ UPDATE USER BY ID
export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = await Promise.resolve(params); // Resolve params with await
  const { name, email, password } = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(password && { password }),
      },
    });

    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user", message: (error as Error).message },
      { status: 500 }
    );
  }
}

// ✅ DELETE USER BY ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = await Promise.resolve(params); // Resolve params with await

  try {
    await prisma.user.delete({ where: { id: userId } });

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user", message: (error as Error).message },
      { status: 500 }
    );
  }
}
