import { PrismaClient } from "@prisma/client";

declare global {
  var MyPrismaClient: PrismaClient | undefined;
}

const MyPrismaClient = global.MyPrismaClient || new PrismaClient();

if (process.env.NODE_ENV === "development")
  global.MyPrismaClient = MyPrismaClient;

export default MyPrismaClient;
