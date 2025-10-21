# Property ROI Calculator 🏠💰

A modern web platform for property financial analysis and cost recovery automation, designed for real estate investors and property analysts.

## 🚀 Features

### Core Functionality
- **Multi-step Property Analysis Wizard**
  - Property Information (address, specs, bed/bath)
  - Mortgage & Financing Details
  - Rent & Occupancy Projections
  - Monthly Operating Expenses
  - Capital Expenditures with MACRS Depreciation
  - Purchase Information & Costs
  - Contingency & Purchase Price
  - Appreciation & Growth Inputs

- **Advanced Calculations**
  - DSCR (Debt Service Coverage Ratio)
  - Cash-on-Cash Return
  - Cap Rate Analysis
  - IRR Projections
  - MACRS Depreciation Schedules

- **Export & Integration**
  - Export to Google Sheets
  - PDF Report Generation
  - Google Drive Integration
  - Shareable Property Links

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: TailwindCSS + shadcn/ui components
- **State Management**: Zustand
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation
- **Backend**: Supabase (authentication & database)
- **APIs**: Google Sheets API, Google Drive API

### Project Structure
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
