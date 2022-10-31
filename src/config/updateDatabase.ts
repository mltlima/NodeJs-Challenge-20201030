import fs from 'fs';
import { ungzip } from 'node-gzip';
import zlib, { gzip } from 'zlib';
import axios from 'axios';
import { Transform } from 'stream';
const readline = require('readline');
const CronJob = require('cron').CronJob;

import productsRepository from '@/repositories/productsRepository';

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

async function getData(filename: FileNames) {
    let counter = 0;

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
}

function scraping() {
    fileNames.forEach(async (filename) => {
        await getData(filename);
    });
}


export async function main() {
    //getData("products_01.json.gz");
    const job = new CronJob('0 0 0 * * *', scraping, null, true, 'America/Sao_Paulo');
}