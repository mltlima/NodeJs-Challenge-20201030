import joi from 'joi';

import { ProducStatus } from '@prisma/client';

const productSchema = joi.object({
    code: joi.string().required(),
    url: joi.string().regex(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/).required(),
    creator: joi.string().required(),
    created_t: joi.number().required(),
    last_modified_t: joi.number().required(),
    product_name: joi.string().required(),
    quantity: joi.string().required(),
    brands: joi.string().required(),
    categories: joi.string().required(),
    labels: joi.string().required(),
    cities: joi.string().required(),
    stores: joi.string().required(),
    purchase_places: joi.string().required(),
    ingredients_text: joi.string().required(),
    traces: joi.string().required(),
    serving_size: joi.string().required(),
    serving_quantity: joi.string().required(),
    nutriscore_score: joi.string().required(),
    nutriscore_grade: joi.string().required(),
    main_category: joi.string().required(),
    image_url: joi.string().required(),
    status: joi.string().valid(ProducStatus.DRAFT, ProducStatus.PUBLISHED, ProducStatus.TRASH).optional(),
});

const schemas = {
    productSchema,
};

export default schemas;