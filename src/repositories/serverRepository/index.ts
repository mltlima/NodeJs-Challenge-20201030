import { prisma } from '@/config';
import { ServerStatus } from '@prisma/client';

async function getLastUpdate() {
  const lastUpdate = await prisma.server.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return lastUpdate;
}

async function update(status: ServerStatus, failedFiles: Array<string>) {
  await prisma.server.create({
    data: {
      status,
      failedFiles,
    },
  });
}

const serverRepository = {
  getLastUpdate,
  update,
};

export default serverRepository;