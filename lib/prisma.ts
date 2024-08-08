import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var prisma: PrismaClient;
}

if (!global.prisma) {
  global.prisma = new PrismaClient();
}

export default global.prisma;
