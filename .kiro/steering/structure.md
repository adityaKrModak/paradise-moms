# Project Structure & Organization

## Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (public)/          # Public routes (no auth required)
│   │   ├── auth/          # Authentication pages
│   │   ├── cart/          # Shopping cart page
│   │   ├── checkout/      # Checkout process
│   │   ├── products/      # Product listing
│   │   ├── profile/       # User profile & orders
│   │   └── shop/          # Shop with filters
│   ├── admin/             # Admin panel routes
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── Admin/             # Admin-specific components
│   ├── Auth/              # Authentication components
│   ├── Cart/              # Cart-related components
│   ├── Common/            # Shared components (Header, Footer, etc.)
│   ├── Home/              # Homepage components
│   ├── Profile/           # User profile components
│   ├── Shop/              # Shop filtering components
│   ├── ShoppingCart/      # Cart functionality components
│   └── ui/                # shadcn/ui components
├── graphql/               # GraphQL operations
│   ├── generated/         # Auto-generated types & hooks
│   ├── mutations/         # GraphQL mutations
│   └── queries/           # GraphQL queries
├── hooks/                 # Custom React hooks
├── lib/                   # Library configurations
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions

redux/                     # Redux store (root level)
├── slices/                # Redux slices
├── selectors/             # Redux selectors
└── store.ts               # Store configuration
```

## Naming Conventions

### Files & Folders
- **Components**: PascalCase (e.g., `ProductCard.tsx`)
- **Pages**: lowercase (e.g., `page.tsx`)
- **Hooks**: camelCase starting with `use` (e.g., `useAuth.ts`)
- **Types**: PascalCase (e.g., `Product.ts`)
- **Utilities**: camelCase (e.g., `getLocation.ts`)

### Code Conventions
- **React Components**: PascalCase with named exports
- **Redux Slices**: camelCase slice names (e.g., `cartSlice`)
- **GraphQL Operations**: PascalCase with descriptive names
- **CSS Classes**: Tailwind utility classes

## Architecture Patterns

### Route Organization
- **App Router**: File-based routing in `src/app/`
- **Route Groups**: `(public)` for unauthenticated routes
- **Nested Routes**: Folder structure mirrors URL structure
- **Layout Files**: `layout.tsx` for shared layouts

### Component Structure
- **Feature-based**: Components grouped by domain (Cart, Shop, etc.)
- **Common Components**: Shared across features in `Common/`
- **UI Components**: Design system components in `ui/`

### State Management
- **Redux Slices**: Feature-based state organization
- **Selectors**: Separate files for complex state selection
- **Local Storage**: Cart state persistence
- **Apollo Cache**: GraphQL data caching

### Data Flow
- **GraphQL**: API communication via Apollo Client
- **Generated Types**: Auto-generated from GraphQL schema
- **Redux**: Global state for cart, auth, user data
- **Local State**: Component-specific state with React hooks