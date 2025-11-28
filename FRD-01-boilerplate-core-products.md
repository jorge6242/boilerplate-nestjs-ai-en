# Functional Requirements Document (FRD)
**Project:** NestJS CRUD Products Boilerplate  
**Version:** v1.0 (minimum version)  
**Author:** Jorge Gomez  
**Status:** Draft

---

## 1. Purpose
Create a **NestJS base project** exposing a **REST CRUD** for the `Product` entity, with **validation**, **Swagger**, and a modular structure ready for extension.

---

## 2. Scope

### 2.1 In-Scope
- NestJS project created with `nest new`.
- `products` module with CRUD endpoints.
- Validations using `class-validator`.
- Automatic API documentation via Swagger at `/api`.
- JSDoc documentation.

### 2.2 Out-of-Scope
- Authentication / authorization.
- Real DB persistence (in-memory array allowed).
- Advanced CI/CD.

---

## 3. Minimum Setup

### 3.1 Requirements
- Node.js ≥ 18  
- npm ≥ 9  
- Nest CLI global: `npm i -g @nestjs/cli`

### 3.2 Mandatory sequence (automatic execution)
The agent **must execute in this order** and continue only if the previous command returns exit code `0`:

```bash
nest new <folder name> --package-manager npm
cd <folder name>
npm install class-validator class-transformer @nestjs/config @nestjs/swagger swagger-ui-express
```

> **Auto-advance rule:**  
> If `nest new <folder name> --package-manager npm` exits with code `0`, the agent **must not** ask “Continue waiting…?” nor wait for user interaction. It must immediately continue (`cd <folder name>` then install deps).

> If `<folder name>/` already exists, the agent must only perform pending steps (install deps).

> **Execution policy for endpoint tests (mandatory):**  
> After finishing §3.2, the agent **must**:  
> 1) Open **Terminal A** and run `npm run start:dev`.  
> 2) **Keep** Terminal A **open and running** (no `Ctrl+C`) during all tests.  
> 3) Open **Terminal B** to run the `curl` commands from §7, **without stopping** the server in Terminal A.

---

## 4. Minimum Expected Structure

```text
<folder name>/
  package.json
  src/
    main.ts
    app.module.ts
    products/
      products.module.ts
      products.controller.ts
      products.service.ts
      dto/
        create-product.dto.ts
        update-product.dto.ts
      product.entity.ts
```

> **Generation validation:**  
> After §3.2, the agent must verify that **all** paths above exist. Missing files (controller, service, DTOs) must be generated before continuing.

---

## 5. App Bootstrap

Edit `src/main.ts` to **always** include:

1. **Global ValidationPipe**:
   - `whitelist: true`
   - `forbidNonWhitelisted: true`
   - `transform: true`

2. **Swagger** at `/api`.

3. `ConfigModule` accessible from `main.ts`.

Example (non-literal):

```ts
const app = await NestFactory.create(AppModule);
app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
const config = new DocumentBuilder().setTitle('Products API').setVersion('1.0').build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('/api', app, document);
await app.listen(3000);
```

> **Pre-test validation:**  
> Before running `curl`, the agent must confirm the server is active (e.g., log: `Nest] Server running on http://localhost:3000`).  
> If inactive, restart `npm run start:dev` in Terminal A and retry tests.

---

## 6. Entity and DTOs

### 6.1 Canonical Entity (`product.entity.ts`)
```ts
export class Product {
  id: string;
  name: string;
  description?: string;
  isPremium: boolean;
  price?: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### 6.2 `create-product.dto.ts`
- `name`: string, required, non-empty  
- `description`: string, optional  
- `isPremium`: boolean, required  
- `price`: number, required **only if** `isPremium = true`

### 6.3 `update-product.dto.ts`
- Same fields as create, all optional.

---

## 7. Required Endpoints

Base URL: `http://localhost:3000/products`

| Method | Route             | Description                    | Responses |
|--------|-------------------|--------------------------------|-----------|
| GET    | `/products`       | List all products              | 200 OK    |
| GET    | `/products/:id`   | Get product by id              | 200 / 404 |
| POST   | `/products`       | Create product                 | 201       |
| PUT    | `/products/:id`   | Update full product            | 200 / 404 |
| DELETE | `/products/:id`   | Delete product                 | 204 / 404 |

### 7.1 Minimum rules
- `POST` and `PUT` must validate DTO → on failure → 400.  
- `GET /products/:id`, `PUT /products/:id`, `DELETE /products/:id` → if not found → 404.  
- ID must be a generated `uuid`.  
- JSDoc comments must be included in generated logic.

### 7.2 Test commands (Terminal B, server running in Terminal A)

```bash
# Create valid product
curl -X POST http://localhost:3000/products   -H 'Content-Type: application/json'   -d '{"name":"Premium Coffee","isPremium":true,"price":25.5}'

# List products
curl -X GET http://localhost:3000/products

# Validation error (missing "name")
curl -X POST http://localhost:3000/products   -H 'Content-Type: application/json'   -d '{"isPremium":true,"price":25.5}'
```

Rule: Must run in this exact order and log exit codes.

---

## 8. Error Format (uniform)

```json
{
  "statusCode": 400,
  "message": ["field X is required"],
  "error": "Bad Request",
  "timestamp": "2025-10-26T10:00:00.000Z",
  "path": "/products"
}
```

---

## 9. ProductsService (in-memory)

Expose methods:

- `findAll()`
- `findOne(id: string)`
- `create(dto)`
- `update(id: string, dto)`
- `remove(id: string)`

---

## 10. Swagger

- `products.controller.ts` must have `@ApiTags('products')`.
- All endpoints must appear in `/api`.

---

## 11. Minimum `package.json` scripts

```json
{
  "scripts": {
    "start": "nest start",
    "start:dev": "nest start --watch",
    "build": "nest build"
  }
}
```

---

## 12. Acceptance Criteria

1. Server starts with `npm run start:dev` without errors.  
2. `/api` shows the `products` controller.  
3. `POST /products` returns uuid.  
4. `GET /products` returns an array.  
5. Invalid requests follow error format (§8).  
6. No “problems found” warnings allowed in generated files.  
7. During §7 tests, server must remain active. If it stops, restart and retry.  
8. The agent must print compact test summary:  
   - `[TEST] POST /products → <HTTP_STATUS>`  
   - `[TEST] GET /products → <HTTP_STATUS>`  
   - `[TEST] POST /products (invalid) → <HTTP_STATUS>`  
   No extra prompts.

