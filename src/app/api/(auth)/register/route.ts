// Use the correct Prisma client import
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";

export async function POST(req: Request) {
  try {
    const { name, email, password, role, ...otherFields } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        name,
        ...otherFields
      }
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET as jwt.Secret,
      {
        expiresIn: process.env.JWT_EXPIRATION || "1h"
      } as jwt.SignOptions
    );
    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,

          name: user.name || "",
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString()
        },
        token
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error registering user",
        error: (error as Error).message || "Unknown error"
      },
      { status: 500 }
    );
  }
}
