import MyPrismaClient from "./prisma"; // Import your custom Prisma client

export const getAllTunnels = async () => {
  return await MyPrismaClient.tunnel.findMany(); // Use custom client
};

export const getTunnelById = async (id: string) => {
  return await MyPrismaClient.tunnel.findUnique({ where: { id } }); // Use custom client
};

export const createTunnel = async (data: {
  name: string;
  location: string;
  status: string;
  safetyConditions: string;
  measurements: string;
  supervisorId: string;
}) => {
  return await MyPrismaClient.tunnel.create({ data }); // Use custom client
};

export const updateTunnel = async (
  id: string,
  data: {
    name?: string;
    location?: string;
    status?: string;
    safetyConditions?: string;
    measurements?: string;
  }
) => {
  return await MyPrismaClient.tunnel.update({ where: { id }, data }); // Use custom client
};

export const deleteTunnel = async (id: string) => {
  return await MyPrismaClient.tunnel.delete({ where: { id } }); // Use custom client
};
