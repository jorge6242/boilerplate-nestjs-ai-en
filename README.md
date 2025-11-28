# 📘 FRD Orchestration — Technical Guide

This repository implements a development workflow based on **FRDs (Functional Requirements Documents)** orchestrated by an AI agent (Windsurf / Antigravity / Claude Sonnet).  
The goal: **generate a complete, reproducible, and fully automated NestJS backend**, with zero improvisation and strict execution rules.

---

## 🧩 Repository Structure

```
.                       # Repository root
├── api-products/       # Automatically generated NestJS backend
│   ├── src/
│   ├── migrations/
│   ├── README.md
│   └── package.json
├── FRD-00-master-orchestration.md
├── FRD-01-boilerplate-core-products.md
├── FRD-02-products-database.md
├── FRD-03-auth-security.md
├── FRD-04-unit-testing.md
└── README.md           # This file
```

---

## 🧠 Role of Each FRD

### **FRD-00 — Master Orchestration**
Defines:
- Execution order
- Dependencies
- Agent behavior rules
- Mandatory validations
- Success conditions

It is the **brain of the system**. It does not generate code — it orchestrates it.

---

### **FRD-01 — Boilerplate Core + Products CRUD**
Generates:
- Base NestJS project
- Swagger + global ValidationPipe
- In-memory Products CRUD
- DTOs + class-validator
- Initial module structure

---

### **FRD-02 — Database + TypeORM**
Adds real persistence:
- TypeORM integration
- Entities
- Migrations
- Custom repository
- Centralized config

---

### **FRD-03 — JWT Authentication**
Includes:
- User entity
- Password hashing with bcrypt
- Login + Register endpoints
- LocalStrategy + JwtStrategy
- Guards and /products/* protection

---

### **FRD-04 — Unit Testing**
Defines:
- Jest unit tests
- TestingModule
- Mocks without real DB
- Final validation

---

## ⚙️ How to Run the Orchestration

### 1️⃣ Clone the repository

```bash
git clone https://github.com/tuusuario/boilerplate-nestjs-ai.git
cd boilerplate-nestjs-ai
```

---

### 2️⃣ Open the project in an AI‑powered editor

Compatible with:

- Windsurf  
- Antigravity (Google AI)  
- Cursor  
- Claude Code  
- VSCode with agents

---

### 3️⃣ Send the orchestration command

### 📌 **Start Trigger — Instruction that activates the entire process**

💥 Copy and paste EXACTLY this to the agent:

```
@FRD-00-master-orchestration.md
@FRD-01-boilerplate-core-products.md
@FRD-02-products-database.md
@FRD-03-auth-security.md
@FRD-04-unit-testing.md

nombre de carpeta: api-products

Inicia la orquestación.
```

---

### 4️⃣ The agent will automatically generate:

- Full NestJS project  
- Products CRUD  
- TypeORM persistence  
- JWT authentication  
- Migrations  
- Unit tests  
- Internal README  
- Documented code  

No human intervention required.

---

### 5️⃣ Run the backend manually (optional)

```bash
cd api-products
npm install
npm run migration:run
npm run start:dev
```

Swagger available at:

👉 http://localhost:3000/api

---

## 🎯 Benefits of the FRD‑Oriented Development Method

- ✔️ Reproducible  
- ✔️ Scalable  
- ✔️ Zero improvisation  
- ✔️ Reduced LLM context load  
- ✔️ Easy feature addition via FRDs  
- ✔️ “Industrial-grade” AI workflow  

---

## 📌 License

MIT License.
