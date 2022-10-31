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

export type ProductParams = Omit<Product, 'id' | 'imported_t'>;

const productsRepository = {
    insertProduct,
};

export default productsRepository;