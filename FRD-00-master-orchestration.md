# Functional Requirements Document (FRD-00)
**Project:** Boilerplate NestJS CRUD Products  
**Document:** Master Orchestration FRD  
**Version:** v2.0  
**Author:** Jorge Gomez  
**Status:** Draft

---

## 1. Purpose

1.1 Define how an agent (FRD Assistant / CLI) must **orchestrate** the execution of several project-specific FRDs in the following **order**:

- `FRD-01-boilerplate-core-products.md`
- `FRD-02-products-database.md`
- `FRD-03-auth-jwt.md`
- `FRD-04-unit-testing.md`

1.2 Ensure that:

- The **core boilerplate** is generated first (Phase 1) using **exactly** the rules of `FRD-01-boilerplate-core-products.md`.
- The **persistence layer with TypeORM + Database** (Phase 2) is applied **only after** the core is correct and stable, following `FRD-02-products-database.md`.
- The **JWT authentication layer** (Phase 3) is implemented **after** having a functional DB, following `FRD-03-auth-jwt.md`.
- The **minimum unit tests** (Phase 4) are generated at the end, when business logic and security are complete, following `FRD-04-unit-testing.md`.

---

## 2. Scope

### 2.1 In-Scope

- Orchestrate the agent workflow sequence:
  - Phase 1 → run `FRD-01-boilerplate-core-products.md`.
  - Phase 2 → run `FRD-02-products-database.md`.
  - Phase 3 → run `FRD-03-auth-jwt.md`.
  - Phase 4 → run `FRD-04-unit-testing.md`.
- Define rules for **order, dependency, and non-interactivity** between phases.
- Establish minimum global success criteria:
  - Project running.
  - Persisting to a real database.
  - Endpoints protected by JWT.
  - Unit tests running green.

### 2.2 Out-of-Scope

- Modify internal content of operational FRDs (`FRD-01`, `FRD-02`, `FRD-03`, `FRD-04`).
- Redefine requirements already established in specific FRDs.
- Add features outside Products and Auth scope (e.g., other complex modules).

---

## 3. Related Documents

3.1 **FRD-01 — Boilerplate Core Products**  
File: `FRD-01-boilerplate-core-products.md`  
Role: Defines the **NestJS base project**, in-memory `Product` CRUD, validations, Swagger, JSDoc, and `curl` tests.

3.2 **FRD-02 — Products Database (TypeORM + Migrations)**  
File: `FRD-02-products-database.md`  
Role: Extends the base project so `ProductsService` uses **TypeORM + real DB**, centralized config, repository, migrations, and optional seeds.

3.3 **FRD-03 — JWT Authentication**  
File: `FRD-03-auth-jwt.md`  
Role: Adds authentication with JWT + Passport, register/login endpoints, env-based secrets, guards, and middleware to protect `products`.

3.4 **FRD-04 — Minimum Unit Testing**  
File: `FRD-04-unit-testing.md`  
Role: Defines basic unit tests for `products` and `auth` modules using `@nestjs/testing` without advanced coverage.

---

## 4. Execution Phases

### 4.1 Phase 1 — Boilerplate Core (FRD-01)

The agent must:

- Read and follow **only** what is defined in `FRD-01-boilerplate-core-products.md`.
- Create the NestJS project, `products` module, DTOs, logical entity, Swagger, `ValidationPipe`, global error filter, and JSDoc.
- Configure the server to expose an in-memory `Product` CRUD.
- Execute the `curl` tests from FRD-01 and verify HTTP codes match requirements.

**Strict rule:**  
`FRD-01-boilerplate-core-products.md` is **untouchable**.  
The agent **cannot modify it**, only **obey it**.

### 4.2 Phase 2 — TypeORM + Database (FRD-02)

Runs only when:

- All FRD-01 acceptance criteria are met.
- The server runs stably with in-memory CRUD.

The agent must:

- Follow `FRD-02-products-database.md`.
- Integrate TypeORM with a real DB (default SQLite) using centralized config in `src/config/database.ts`.
- Convert `Product` to a TypeORM entity and create `Product.repository.ts`.
- Update `ProductsService` to use the repo + DB without changing:
  - Endpoints.
  - Response contract.
- Run migrations (and seeds if applicable).
- Re-run main `curl` tests to validate DB persistence.

### 4.3 Phase 3 — JWT Authentication (FRD-03)

Runs only when:

- Phase 1 is OK.
- Phase 2 is OK.

The agent must:

- Follow `FRD-03-auth-jwt.md`.
- Create `auth` module and `User` entity with `email` and hashed `password`.
- Implement repo, service, controller with:
  - `POST /auth/register`
  - `POST /auth/login`
- Configure JWT + Passport in a centralized module using env vars.
- Add guards/middleware to protect:
  - `Authorization: Bearer <token>`
  - All private routes (`/products/*`).

### 4.4 Phase 4 — Unit Testing (FRD-04)

Runs only when:

- Phase 1 is OK.
- Phase 2 is OK.
- Phase 3 is OK.

The agent must:

- Follow `FRD-04-unit-testing.md`.
- Create basic unit tests for:
  - `products.service.ts`
  - `products.controller.ts`
  - `auth.service.ts`
  - `auth.controller.ts`
- Use only `@nestjs/testing` with mocks.
- Ensure tests run with:

```
npm test
```

---

## 5. Orchestration Rules

### 5.1 Mandatory Order

- Phase 1 → FRD-01  
- Phase 2 → FRD-02  
- Phase 3 → FRD-03  
- Phase 4 → FRD-04  

No phase can run if the previous one failed.

### 5.2 No Interactivity Between Phases

- While executing any FRD, the agent must **not**:
  - Ask what to do next.
  - Offer options or request choices.
  - Ask for confirmation for internal commands.
  - Create visible planning phases.

- The agent may:
  - Report progress within the phase.
  - Report and fix errors.

### 5.3 Explicit File Reading

The agent must assume all FRDs are in the same root folder and treat them as **source of truth**.

### 5.4 FRD Integrity

If something differs from the FRD, the agent must fix the **code**, not the documents.

### 5.5 Automatic Activation

If the user provides:

- Reference to this file (`FRD-00-master-orchestration.md`)
- References to the operational FRDs
- Project folder name (e.g., `api-products`)

The agent must start orchestration immediately, without confirmations.

### 5.6 Final Task — Update README

Once all phases are OK:

- Generate `/api-products/README.md` automatically.
- Overwrite existing README completely.
- Include:
  - Project description.
  - Tech stack.
  - Structure.
  - Requirements.
  - Installation.
  - Migrations.
  - Dev mode.
  - Tests.
  - Swagger.

---

## 6. Global Acceptance Criteria

- FRD-01: In-memory CRUD OK.
- FRD-02: DB CRUD with migrations OK.
- FRD-03: JWT auth and route protection OK.
- FRD-04: Unit tests OK.
- Orchestration followed strictly.
