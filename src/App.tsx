import React from "react";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";
import Weather from "./components/landing/weather";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen bg-gray-100 p-6">
        <Weather />
      </div>
    </ApolloProvider>
  );
};

export default App;
