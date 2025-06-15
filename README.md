# Paradise Moms

Welcome to Paradise Moms, your go-to destination for natural and organic products. This project is a Next.js application built with TypeScript, Redux for state management, and GraphQL with Apollo Client for data fetching.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/paradise-moms.git
   ```
2. Navigate to the project directory:
   ```bash
   cd paradise-moms
   ```
3. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Running the Application

To run the application in development mode, use the following command:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The project follows a standard Next.js `src` directory structure, with key folders organized as follows:

- `src/app`: Contains all the pages and routes for the application.
- `src/components`: Reusable components, organized by feature.
- `src/graphql`: GraphQL queries, mutations, and generated types.
- `src/hooks`: Custom React hooks, such as `useAuth`.
- `src/lib`: Library configurations, including the Apollo Client setup.
- `src/redux`: Redux store setup, including slices, selectors, and the root reducer.
- `src/types`: TypeScript type definitions for shared data structures.

## Key Features

- **Authentication**: Secure user authentication with Google Sign-In, managed through Redux.
- **Shopping Cart**: Fully functional shopping cart with Redux for state management.
- **Product Listings**: Dynamic product listings fetched from a GraphQL API.
- **Checkout Process**: Streamlined checkout process with an order summary.
- **Responsive Design**: A responsive user interface built with Tailwind CSS.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for server-side rendering and static site generation.
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript.
- [Redux](https://redux.js.org/) - State management library.
- [GraphQL](https://graphql.org/) - Query language for APIs.
- [Apollo Client](https://www.apollographql.com/docs/react/) - GraphQL client for React.
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework.
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built using Radix UI and Tailwind CSS.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
