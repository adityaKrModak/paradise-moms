import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.NEXT_PUBLIC_API_URL + "/graphql",
  documents: [
    "src/graphql/queries/**/*.{ts,tsx}",
    "src/graphql/mutations/**/*.{ts,tsx}",
  ],
  generates: {
    "src/graphql/generated/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
      },
    },
  },
};
export default config;
