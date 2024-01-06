import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://beta.pokeapi.co/graphql/v1beta",
  documents: [
    "./src/graphql/queries/**/*.ts",
    "./src/graphql/mutations/**/*.ts",
  ],
  ignoreNoDocuments: true,
  generates: {
    "./src/graphql/gql/": {
      preset: "client",
      config: {
        useTypeImports: true,
      },
    },
  },
};
// eslint-disable-next-line import/no-default-export
export default config;
