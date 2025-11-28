# 🧩 Functional Requirements Document (FRD-02)
**Project:** Boilerplate NestJS CRUD Products  
**Document:** Products Persistence with TypeORM  
**Version:** v1.0  
**Author:** Jorge Gomez  
**Status:** Draft

---

## 1. Purpose

1.1 Extend the boilerplate defined in `FRD-01-boilerplate-core-products.md` so the `Product` CRUD stops using an in-memory array and transitions to **TypeORM with a real database**, while preserving:

- The same endpoints  
- The same response contract  
- The same logical `Product` entity

1.2 Apply **clean code principles** with clear separation between:

- Entity (domain model / persistence)  
- Repository (data access)  
- Service (business rules)  
- Controller (HTTP layer)

---

## 2. Scope

### 2.1 In-Scope

- Integrating **TypeORM** into the NestJS project created in FRD-01  
- Database connection configuration via environment variables  
- Mapping `Product` as a TypeORM entity  
- Creating `Product.repository.ts` to abstract data access logic  
- Modifying `ProductsService` to:
  - Use a TypeORM repository instead of an in-memory array  
- Minimal adjustments in the controller if required (routes/responses must remain unchanged)  
- Keeping **JSDoc** comments in key methods (repository/service)  
- Configuring and using **TypeORM migrations** for the `products` table, using classes and a dedicated `migrations/` directory  

### 2.2 Out-of-Scope

- Authentication / authorization  
- Multi-database or multi-tenant support  
- Complex relationships with other entities  
- Advanced migration/versioning mechanisms (using `synchronize: true` is allowed in dev if defined here)

---

## 3. Persistence Setup

### 3.1 Requirements

- A functional project as defined in `FRD-01-boilerplate-core-products.md`  
- An existing or new `.env` file with database connection variables  

---

### 3.2 Minimum Dependencies

The agent must install the following from the project root (`<folder name>` created in FRD-01):

```bash
npm install @nestjs/typeorm typeorm
```

---

### 3.3 Centralized TypeORM Configuration

3.3.1 The agent must create a folder: `src/config/`, and inside it a file: `src/config/database.ts`  
3.3.2 This file must contain **all** TypeORM configuration, exported as a **reusable factory** receiving `ConfigService` and returning connection options.  
3.3.3 In `app.module.ts`, the agent must import this factory and use it inside `TypeOrmModule.forRootAsync`, avoiding inline configurations.  

3.3.4 Acceptance Criteria:

- `AppModule` MUST NOT contain inline TypeORM configuration  
- All configuration lives inside `config/database.ts`  
- `AppModule` only imports and uses the factory  
- The application must start correctly using the DB defined by `DB_PATH` or `products.sqlite`

---

### 3.4 TypeORM Migrations

3.4.1 The agent must configure TypeORM to support **class-based migrations**, ensuring:

- A `migrations/` folder exists in the project root (e.g. `<folder name>/migrations/`)  
- TypeORM CLI configuration recognizes:
  - DB connection  
  - `Product` entity  
  - Path to the `migrations/` folder  

3.4.2 The agent must **generate an initial migration** to create the `products` table based on the `Product` entity:

- The migration file must live inside `migrations/`  
- It must be a **TypeORM class-based migration** implementing:
  - `up`: creates the `products` table  
  - `down`: drops the `products` table  

3.4.3 The agent must **execute** the initial migration as part of this persistence phase before marking FRD-02 as complete.

3.4.4 Migration Acceptance Criteria:

- After running the migration, the `products` table must exist with columns matching the `Product` entity (`id`, `name`, `description`, `isPremium`, `price`, `createdAt`, `updatedAt`)  
- Migration must be fully reversible via `down`  
- The `/products` CRUD must operate fully against the migrated table (not relying on `synchronize: true`)  
