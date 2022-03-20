import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: `${process.env.SERVER_ORIGIN}/graphql`,
  cache: new InMemoryCache({ addTypename: false }),
});
