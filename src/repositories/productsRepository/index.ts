import { prisma } from '@/config';
import { Product } from '@prisma/client';

async function insertProduct(product: ProductParams) {
  await prisma.product.create({
    data: {
        code: product.code,
        url: product.url,
        creator: product.creator,
        created_t: product.created_t,
        last_modified_t: product.last_modified_t,
        product_name: product.product_name,
        quantity: product.quantity,
        brands: product.brands,
        categories: product.categories,
        labels: product.labels,
        cities: product.cities,
        stores: product.stores,
        purchase_places: product.purchase_places,
        ingredients_text: product.ingredients_text,
        traces: product.traces,
        serving_size: product.serving_size,
        serving_quantity: product.serving_quantity ? product.serving_quantity : '0',
        nutriscore_score: product.nutriscore_score ? product.nutriscore_score : '0',
        nutriscore_grade: product.nutriscore_grade,
        main_category: product.main_category,
        image_url: product.image_url,
    },

  });
}

async function updateProduct(product: ProductParams) {
  await prisma.product.update({
    where: {
      code: product.code,
    },
    data: {
        code: product.code,
        url: product.url,
        creator: product.creator,
        created_t: product.created_t,
        last_modified_t: product.last_modified_t,
        product_name: product.product_name,
        quantity: product.quantity,
        brands: product.brands,
        categories: product.categories,
        labels: product.labels,
        cities: product.cities,
        stores: product.stores,
        purchase_places: product.purchase_places,
        ingredients_text: product.ingredients_text,
        traces: product.traces,
        serving_size: product.serving_size,
        serving_quantity: product.serving_quantity ? product.serving_quantity : '0',
        nutriscore_score: product.nutriscore_score ? product.nutriscore_score : '0',
        nutriscore_grade: product.nutriscore_grade,
        main_category: product.main_category,
        image_url: product.image_url,
    },
  });
}

async function getProduct(code: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({
    where: {
      code,
    },
  });
  return product;
}

async function getProducts(page: number): Promise<Product[]> {
  const products = await prisma.product.findMany({
    skip: (page - 1) * 20,
    take: 20,
  });
  return products;
}

async function deleteProduct(code: string) {
  const product = await prisma.product.update({
    where: {
      code,
    },
    data: {
      status: 'TRASH',
    },
  });
}

export type ProductParams = Omit<Product, 'id' | 'imported_t'>;

const productsRepository = {
    insertProduct,
    updateProduct,
    getProduct,
    getProducts,
    deleteProduct,
};

export default productsRepository;