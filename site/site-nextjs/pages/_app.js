import "../styles/globals.scss";
import "tailwindcss/tailwind.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const client = new ApolloClient({
    uri: "http://italian.vincenzo.local:4000/graphql",
    cache: new InMemoryCache({ addTypename: false }),
  });

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
