# Technology Stack & Build System

## Core Technologies
- **Next.js 14.1.0** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **React 18** - UI library with modern hooks
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Component library built on Radix UI

## State Management & Data
- **Redux Toolkit** - Global state management
- **Apollo Client** - GraphQL client for API communication
- **GraphQL Code Generator** - Auto-generated types and hooks
- **React Redux** - React bindings for Redux

## Key Libraries
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Class Variance Authority** - Component variant management
- **Embla Carousel** - Carousel component

## Build & Development Commands

```bash
# Development
yarn dev          # Start development server on localhost:3000
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Run ESLint

# GraphQL
yarn codegen      # Generate GraphQL types and hooks from schema
```

## Environment Setup
- Requires Node.js v14+
- Uses yarn as package manager
- Environment variables in `.env` file
- GraphQL endpoint configured via `NEXT_PUBLIC_API_URL`

## Code Generation
- GraphQL types auto-generated in `src/graphql/generated/`
- Run `yarn codegen` after schema changes
- Generated hooks follow `use[Query/Mutation]` naming convention