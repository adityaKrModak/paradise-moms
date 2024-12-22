import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.NEXT_GRAPHQL_URL,
  documents: ['src/graphql/queries/**/*.tsx'],  // Updated to catch all query files
  generates: {
    'src/graphql/generated/graphql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        
        withHooks: true,
       
      }
    },
  },
};
export default config;
