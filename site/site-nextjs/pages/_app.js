import "../styles/globals.scss";
import "tailwindcss/tailwind.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "../services/graphql";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
