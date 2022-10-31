import fs from 'fs';
import { ungzip } from 'node-gzip';
import zlib, { gzip } from 'zlib';
import axios from 'axios';
import { Transform } from 'stream';
const readline = require('readline');
const CronJob = require('cron').CronJob;

import productsRepository from '@/repositories/productsRepository';
import serverRepository from '@/repositories/serverRepository';
import { ServerStatus } from '@prisma/client';

const fileNames = [
    "products_01.json.gz",
    "products_02.json.gz",
    "products_03.json.gz",
    "products_04.json.gz",
    "products_05.json.gz",
    "products_06.json.gz",
    "products_07.json.gz",
    "products_08.json.gz",
    "products_09.json.gz"] as const;

type FileNames = typeof fileNames[number];

async function getData(filename: FileNames): Promise<Boolean> {
    let counter = 0;

    try{
        const { data } = await axios.get(`${process.env.FILES_URL}${filename}`, {
            headers: {"accept-encoding": "gzip"},
            responseType: 'stream',
        });

        const transform = new Transform({
            transform(chunk, encoding, next) {
                next(null, chunk);
            },
        });

        
        (async () => {
            const readStream = data.pipe(zlib.createGunzip()).pipe(transform);
            const rl = readline.createInterface({
                input: readStream,
                crlfDelay: Infinity
            });
            for await (const line of rl) {
                const json = JSON.parse(line);
                await productsRepository.insertProduct(json);
                counter++;
                if (counter === 100) break;
            }
        })();
        return true;

    } catch (error) {
        console.log(error);
        return false;
    }

}

function scraping() {
    const failedFiles: FileNames[] = [];

    console.log("Scraping...");
    
    fileNames.forEach(async (filename) => {
        const fileStatus = await getData(filename);
        if (!fileStatus) failedFiles.push(filename);
    });

    //send status of scraping to database
    serverRepository.update(failedFiles.length > 1 ? ServerStatus.FAILED : ServerStatus.OK, failedFiles);
}


export async function main() {
    //getData("products_01.json.gz");
    const job = new CronJob('0 0 0 * * *', scraping, null, true, 'America/Sao_Paulo');
}