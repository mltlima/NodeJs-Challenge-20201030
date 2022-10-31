import fs from 'fs';
import { ungzip } from 'node-gzip';
import zlib, { gzip } from 'zlib';
import axios from 'axios';
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
        responseType: 'arraybuffer',
    });

    const unzipped = await ungzip(data);
    fs.writeFileSync(`./${filename.slice(0,-3)}`, unzipped);

    (async () => {
        const fileStream = fs.createReadStream(`./${filename.slice(0,-3)}`);
        const rl = readline.createInterface({
            input: fileStream,
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
    console.log(process.uptime());
    const job = new CronJob('0 0 0 * * *', scraping, null, true, 'America/Sao_Paulo');
}