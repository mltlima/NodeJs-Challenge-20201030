import serverRepository from '@/repositories/serverRepository';
import { getTime } from '@/utils/getTime';

const getStatus = async () => {
    const lastUpdate = await serverRepository.getLastUpdate();
    const uptime = getTime(process.uptime());
    const timeFromLastUpdate = `${lastUpdate.createdAt.getHours()}:${lastUpdate.createdAt.getMinutes()}:${lastUpdate.createdAt.getSeconds()}`;
    const memoryUsage = `${process.memoryUsage().heapTotal} bytes`;
    
    const serverStatus = {
        uptime,
        status: lastUpdate?.status,
        failedFiles: lastUpdate?.failedFiles,
        lastCronExecution: timeFromLastUpdate,
        memoryUsage,
    };

    return serverStatus;
}

export const serverService = {
    getStatus,
};