import { conflictError, notFoundError } from '@/errors';
import productsRepository from '@/repositories/productsRepository';
import { ProductParams } from '@/repositories/productsRepository';


const createProduct = async (product: ProductParams) => {
    const productExists = await productsRepository.getProduct(product.code);
    if (productExists) throw conflictError("Product already exists");
    
    await productsRepository.insertProduct(product);    
}

const updateProduct = async (product: ProductParams) => {
    const productExists = await productsRepository.getProduct(product.code);
    if (!productExists) throw notFoundError();
    
    await productsRepository.updateProduct(product);    
}

const getProduct = async (code: string) => {
    const product = await productsRepository.getProduct(code);
    if (!product) throw notFoundError();

    return product;
}

const getProducts = async (page: number) => {
    const products = await productsRepository.getProducts(page);
    return products;
}

const deleteProduct = async (code: string) => {
    const product = await productsRepository.getProduct(code);
    if (!product) throw notFoundError();

    await productsRepository.deleteProduct(code);
}

export const productsService = {
    createProduct,
    updateProduct,
    getProduct,
    getProducts,
    deleteProduct,
}