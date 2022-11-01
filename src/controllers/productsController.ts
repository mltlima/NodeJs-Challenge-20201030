import { Request, Response } from 'express';

import { productsService } from '@/services/productsServices';

export const createProduct = async (req: Request, res: Response) => {
    const product = req.body;
    await productsService.createProduct(product);
    res.status(201).send();
}

export const updateProduct = async (req: Request, res: Response) => {
    const product = req.body;
    await productsService.updateProduct(product);
    res.status(200).send();
}

export const getProduct = async (req: Request, res: Response) => {
    const code = req.params.code;
    const product = await productsService.getProduct(code);
    res.status(200).send(product);
}

export const getProducts = async (req: Request, res: Response) => {
    const page = req.params.page;
    const products = await productsService.getProducts(Number(page));
    res.status(200).send(products);
}

export const deleteProduct = async (req: Request, res: Response) => {
    const code = req.params.code;
    await productsService.deleteProduct(code);
    res.status(200).send();
}