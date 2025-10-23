# 🚀 API-Automation-Cypress (TypeScript)

This project is an **API Test Automation** framework built with [Cypress](https://www.cypress.io/) + **TypeScript**, integrated with:

- **Allure Report** for detailed test reporting
- **PostgreSQL** for direct database validation
- **Path Aliases** for cleaner imports

---

## 📁 Folder Structure

```
API-AUTOMATION/
│
├── cypress/
│ ├── e2e/                     # Main test cases (API / DB)
│ │ └── branch/                # Example feature folder
│ │     ├── get-branch.cy.ts
│ │     └── get-db-connection.cy.ts
│ │
│ ├── fixtures/                # Static mock data / JSON
│ ├── support/                 # Helper & utility files
│ │ ├── data/                  # Dummy data (users.ts, etc.)
│ │ ├── requests/              # API request handlers (auth.ts, branch.ts, etc.)
│ │ ├── schemas/               # JSON schema validation
│ │ ├── commands.ts            # Cypress custom commands
│ │ └── e2e.ts                 # Global setup
│ │
│ └── downloads/               # Downloaded files (optional)
│
├── allure-results/            # Raw Allure output (auto-generated)
├── allure-report/             # Generated Allure report
│
├── cypress.config.ts          # Cypress configuration + DB + Allure setup
├── tsconfig.json              # TypeScript config (with path aliases)
├── env.config.ts              # Environment configuration
├── .env.*                     # Environment variables for dev/staging/prod
├── package.json               # Project dependencies & scripts
└── README.md                  # Documentation
```

---

## ⚙️ Installation & Setup

1. **Clone the repo and install dependencies**

   ```bash
   git clone <repo-url>
   cd API-AUTOMATION
   npm install
   ```

2. **Setup environment**
   - Copy `.example.env` → rename to `.env.(development|staging|production)`
   - Fill in environment variables (DB credentials, BASE_URL, etc.)

3. **Run tests**

   ```bash
   npx cypress open       # Run in UI mode
   npx cypress run        # Run headless

   npm run test:report    # Run all tests + generate + open Allure report
   npm run test:allure
   npm run allure:generate
   npm run allure:open
   ```

---

## 🧩 Path Aliases

This project uses **path aliases** for cleaner imports (configured in `tsconfig.json`):

- `@requests/*` → `cypress/support/requests/*`
- `@schemas/*` → `cypress/support/schemas/*`
- `@data/*` → `cypress/support/data/*`

**Example:**

```ts
import { admin } from '@data/users';
import { loginRequest } from '@requests/auth';
import { branchSchema } from '@schemas/branch.schema';
```

---

## 🗄️ Database Integration

This project supports direct **PostgreSQL** queries using `cy.task`.

👉 Example implementation:  
[`cypress/e2e/get-db-connection.cy.ts`](./cypress/e2e/get-db-connection.cy.ts)

---

## 📊 Allure Reporting

1. (Optional) Clean existing report:

   ```bash
   Remove-Item -Recurse -Force .\allure-report
   ```

2. Run your tests:

   ```bash
   npx cypress run
   ```

3. Generate the report:

   ```bash
   npx allure generate ./allure-results --clean
   ```

4. Open the report:
   ```bash
   npx allure open ./allure-report
   ```

---

## 💅 Code Formatting

The project uses **Prettier + Husky** to ensure consistent formatting.

- Automatically runs on every commit.
- You can also format manually:

  ```bash
  npm run format
  ```

---

## 🎯 Summary

| Action          | Command                                |
| --------------- | -------------------------------------- |
| Run tests       | `npx cypress run`                      |
| Run & open UI   | `npx cypress open`                     |
| Generate report | `npx allure generate ./allure-results` |
| Open report     | `npx allure open ./allure-report`      |
| Format code     | `npm run format`                       |

---

## 👨‍💻 Author

Maintained by **QA Automation Team** 🧪

> For questions or improvements, feel free to create a Pull Request or open an issue.
