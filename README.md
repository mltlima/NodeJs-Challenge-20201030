# <p align = "center"> NodeJs-Challenge-20201030 </p>

##  :clipboard: About

Rest API to use the data from Open Food Facts project, a open database with nutritional information of several foods. 

***

## :computer:	 Stack

- REST APIs
- Node.js
- TypeScript
- MongoDB with
- Prisma ORM
- Express

***

## :rocket: Routes
    
```yml 
GET /
    - Api details
    - If connection with database is OK, last time CRON run sucessufuly, uptime and memory usage
    - body: {}
```

```yml
PUT /products/:code
    - Update MongoDB with Open Food Facts data
    - body: {
        id               String      
        code             String   
        status           ProducStatus
        imported_t       DateTime    
        url              String
        creator          String
        created_t        String
        last_modified_t  String
        product_name     String
        quantity         String
        brands           String
        categories       String
        labels           String
        cities           String
        purchase_places  String
        stores           String
        ingredients_text String
        traces           String
        serving_size     String
        serving_quantity String
        nutriscore_score String
        nutriscore_grade String
        main_category    String
        image_url        String
    }
```
 
```yml
DELETE /products/:code
    - Change product status to TRASH
    - params: code
```

```yml 
GET /products/:code
    - Get only one product
```

```yml 
GET /products/page/:page
    - Get 20 products ordered by upload date
```
***

## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Create a MongoDB database with whatever name you want
4. Configure the `.env.development` with DATABASE_URL
5. Run all migrations

```bash
npx prisma generate
```

6. Run the back-end in a development environment:

```bash
npm run dev
```

## How to run tests

1. Follow the steps in the last section
2. Run test:

```bash
npm test:unit
```

## Building and starting for production

```bash
npm run build
npm start
```

## Running application locally or inside docker

`.env.development` and `.env` must be changed if you and to run the application locally or inside docker. Consider the following:

- Running application locally (mongodb and node):

Add your mongodb credentials and make sure to create given database before running the application.

- Running application inside docker (mongodb and node):

Set `DATABASE_URL` for `.env.development`. Docker Compose will start the postgres container for you, create the database and host alias for you.

