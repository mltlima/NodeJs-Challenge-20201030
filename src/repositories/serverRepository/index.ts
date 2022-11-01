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

async function update(id: string, status: ServerStatus, failedFiles: Array<string>) {
  await prisma.server.update({
    where: {
      id,
    },
    data: {
      status: status,
      failedFiles: failedFiles,
    },
});
}

async function createServerStatus(status: ServerStatus, failedFiles: Array<string>) {
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
  createServerStatus,
};

export default serverRepository;