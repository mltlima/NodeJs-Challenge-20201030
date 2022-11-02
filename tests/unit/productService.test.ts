import { jest } from "@jest/globals";

import { productsService } from "@/services/productsServices";
import { productsRepository }  from "@/repositories/productsRepository";
import { ProducStatus } from '@prisma/client';

jest.mock("@/repositories/productsRepository");

describe("product service test suite", () => {

    it("should create a product", async () => {

        jest.spyOn(productsRepository, "getProduct").mockImplementationOnce((): any => { });
        jest.spyOn(productsRepository, "insertProduct").mockImplementationOnce((): any => { });        

        let productExists = await productsRepository.getProduct(product.code);
        expect(productExists).toBeUndefined();

        await productsService.createProduct(product);
        expect(productsRepository.insertProduct).toBeCalled();
    });

    it("should not create a duplicated product", async () => {
            
        jest.spyOn(productsRepository, "getProduct").mockImplementationOnce((): any => { return product });

        const promise = productsService.createProduct(product);
        expect(promise).rejects.toEqual({ message: "Product already exists", name: "ConflictError" });
    });

    it("should update a product", async () => {
            
        jest.spyOn(productsRepository, "getProduct").mockImplementationOnce((): any => { return product });        
        jest.spyOn(productsRepository, "updateProduct").mockImplementationOnce((): any => { });

        await productsService.updateProduct(product);
        expect(productsRepository.updateProduct).toBeCalled();
    });

    it("should get a product", async () => {

        jest.spyOn(productsRepository, "getProduct").mockImplementationOnce((): any => { return product });

        const response = await productsService.getProduct(product.code);
        expect(response).toEqual(product);
    });

    it("should delete a product", async () => {
            
        jest.spyOn(productsRepository, "getProduct").mockImplementationOnce((): any => { return product });
        jest.spyOn(productsRepository, "deleteProduct").mockImplementationOnce((): any => { });

        await productsService.deleteProduct(product.code);
        expect(productsRepository.deleteProduct).toBeCalled();
    });

    it("should get products", async () => {

        jest.spyOn(productsRepository, "getProducts").mockImplementationOnce((): any => { return [product] });

        const response = await productsService.getProducts(1);
        expect(response).toEqual([product]);
    });
});

const product = {
    code: "123",
    name: "test",
    url: "www.jest.io",
    creator: "jest",
    created_t: "2021-01-01",
    last_modified_t: "2021-01-01",
    product_name: "test",
    quantity: "1",
    brands: "test",
    categories: "test",
    labels: "test",
    cities: "test",
    stores: "test",
    ingredients_text: "test",
    traces: "test",
    serving_size: "2",
    serving_quantity: "2",
    nutriscore_score: "2",
    nutriscore_grade: "2",
    main_category: "test",
    image_url: "www.jest.io",
    status: ProducStatus.PUBLISHED,
    purchase_places: "test",
};