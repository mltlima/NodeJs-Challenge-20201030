import { PrismaClient } from '@prisma/client';

import { main } from '@/config';

export let prisma: PrismaClient;
export function connectDb(): void {
  prisma = new PrismaClient();
  main();
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
}