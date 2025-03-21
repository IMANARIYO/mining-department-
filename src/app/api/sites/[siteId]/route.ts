import { prisma } from "@/lib/prisma";
import Response from "@/lib/Response";
async function resolveContextParams(context: any) {
  const resolvedParams = await Promise.resolve(context.params);
  return resolvedParams;
}
export async function GET(
  req: Request,
  context: { params: { siteId: string } }
) {
  try {
    const { siteId } = await resolveContextParams(context);
    const site = await prisma.site.findUnique({
      where: { id: siteId },
    });

    if (!site) {
      return Response.error(
        404,
        "Site not found",
        "The site with the provided ID could not be found."
      );
    }
    return Response.success(200, site, "Site fetched successfully");
  } catch (error) {
    console.error("Error fetching site:", error);
    return Response.error(
      500,
      "Error fetching site",
      "An error occurred while fetching the site."
    );
  }
}
export async function PATCH(
  req: Request,
  context: { params: { siteId: string } }
) {
  try {
    const data = await req.json();
    const { siteId } = await resolveContextParams(context);

    const updatedSite = await prisma.site.update({
      where: { id: siteId },
      data: { ...data },
    });

    return Response.success(200, updatedSite, "Site updated successfully");
  } catch (error) {
    console.error("Error updating site:", error);
    return Response.error(
      500,
      "Error updating site",
      "An error occurred while updating the site."
    );
  }
}
export async function DELETE(
  req: Request,
  context: { params: { siteId: string } }
) {
  try {
    const { siteId } = await resolveContextParams(context);

    await prisma.site.delete({
      where: { id: siteId },
    });

    return Response.success(200, null, "Site deleted successfully");
  } catch (error) {
    console.error("Error deleting site:", error);
    return Response.error(
      500,
      "Error deleting site",
      "An error occurred while deleting the site."
    );
  }
}
