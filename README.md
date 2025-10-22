# 🚀 API-Automation-Cypress (TypeScript)

Project **API Test Automation** menggunakan [Cypress](https://www.cypress.io/) + TypeScript, terintegrasi dengan:

-   **Allure Report** untuk reporting test
-   **PostgreSQL** untuk validasi langsung ke database
-   **Path Alias** supaya import lebih rapi

---

## 📁 Struktur Folder

```
API-AUTOMATION-V2/
│
├── cypress/
│ ├── e2e/ # Tempat test case API/DB
│ │ └── branch/ # Contoh grouping test per feature
│ │ ├── get-branch.cy.ts
│ │ └── get-db-cy.ts
│ │
│ ├── fixtures/ # Static mock data / JSON untuk testing
│ ├── support/ # Helper & utilitas
│ │ ├── data/ # Data dummy TypeScript (users.ts, dsb)
│ │ ├── requests/ # API request handler (auth.ts, branch.ts, dsb)
│ │ ├── schemas/ # JSON schema validation
│ │ ├── commands.ts # Custom command Cypress
│ │ └── e2e.ts # Setup global support
│ │
│ └── downloads/ # Folder hasil download test (opsional)
│
├── allure-results/ # Output raw Allure (otomatis)
├── allure-report/ # Report yang sudah di-generate
│
├── cypress.config.ts # Konfigurasi Cypress + setup DB + Allure
├── tsconfig.json # Konfigurasi TypeScript (dengan path alias)
├── env.config.ts # Config Env
├── .env.* # environment config development/staging/prod
├── package.json # Dependency project
└── README.md # Dokumentasi
```

---

## ⚙️ Instalasi & Persiapan

1. **Clone repo & install dependencies**

    ```bash
    git clone <repo-url>
    cd API-AUTOMATION-V2
    npm install
    ```

2. **Setup environment**

    - Copy `.example.env` → rename jadi `.env.(development/staging/production)`
    - Isi variabel sesuai environment (DB, API URL, dsb)

3. **Run test**
    ```bash
    npx cypress open # UI mode
    npx cypress run # Headless run
    ```

---

## 🧩 Path Alias

Project ini sudah pakai **path alias** di `tsconfig.json`:

-   `@requests/*` → `cypress/support/requests/*`
-   `@schemas/*` → `cypress/support/schemas/*`
-   `@data/*` → `cypress/support/data/*`

Contoh penggunaan:

```ts
import { loginRequest } from "@requests/auth";
import { branchSchema } from "@schemas/branch.schema";
import { admin } from "@data/users";
```

---

## 🗄️ Database Integration

Project ini support query ke **PostgreSQL** langsung via `cy.task`.

Mantap 🚀 lebih enak kalau langsung diarahkan ke file contoh (`cypress/e2e/get-db.cy.ts`) biar orang baru bisa lihat implementasi nyata. Jadi di bagian **Database Integration**, kamu bisa ubah jadi seperti ini:

---

## 🗄️ Database Integration

Project ini support query ke **PostgreSQL** langsung via `cy.task`.
Contoh implementasi bisa dilihat di: [`cypress/e2e/get-db.cy.ts`](./cypress/e2e/get-db.cy.ts)

---

## 📊 Allure Report

0.  Menghapus Report Lama (Optional)
    ```bash
    Remove-Item -Recurse -Force .\allure-report
    ```
1.  Jalankan test:

    ```bash
    npx cypress run
    ```

2.  Generate report:

    ```bash
    npx allure generate ./allure-results
    ```

3.  Buka report:

    ```bash
    npx allure open ./allure-report
    ```

---

# 🎯 Ringkas

-   Jalankan test → `npx cypress run`
-   Generate report → `npx allure generate ./allure-results`
-   Buka report → `npx allure open ./allure-report`

---
