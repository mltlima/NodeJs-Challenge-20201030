import { Router } from 'express';

import { createProduct, updateProduct, getProduct, getProducts, deleteProduct } from '@/controllers/productsController';
import schemas from '@/schemas';
import { validateBody } from '@/middlewares';

export const productsRouter = Router(); 
productsRouter.post('/', validateBody(schemas.productSchema), createProduct);
productsRouter.put('/', updateProduct);
productsRouter.get('/:code', getProduct);
productsRouter.get('/page/:page', getProducts);
productsRouter.delete('/:code', deleteProduct);