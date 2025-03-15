// app/api/sites/[siteId]/route.ts

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(
  req: Request,
  { params }: { params: { siteId: string } }
) {
  try {
    const { siteId } = params;
    const site = await prisma.site.findUnique({
      where: { id: siteId }
    });
    if (!site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }
    return NextResponse.json(site);
  } catch (error) {
    console.error("Error fetching site:", error);
    return NextResponse.json({ error: "Error fetching site" }, { status: 500 });
  }
}
export async function PATCH(
  req: Request,
  { params }: { params: { siteId: string } }
) {
  try {
    const data = await req.json();
    const { siteId } = params;
    const updatedSite = await prisma.site.update({
      where: { id: siteId },
      data: { ...data }
    });
    return NextResponse.json(updatedSite);
  } catch (error) {
    console.error("Error updating site:", error);
    return NextResponse.json({ error: "Error updating site" }, { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { siteId: string } }
) {
  try {
    const { siteId } = params;
    await prisma.site.delete({
      where: { id: siteId }
    });
    return NextResponse.json({ message: "Site deleted successfully" });
  } catch (error) {
    console.error("Error deleting site:", error);
    return NextResponse.json({ error: "Error deleting site" }, { status: 500 });
  }
}
