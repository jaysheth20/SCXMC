// lib/apolloClient.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, // XM Cloud GraphQL endpoint
  headers: {
    Authorization: `Bearer aWxGYTYyTmcxQ0ZGUCt4ekNxNUEwU25RV3JPSUo3QWdOcytOUi9sZ3VRdz18c291cmNldmVkMTU0MzQtanNpdGVjb3JleG1jNDEzLWRldjA0OTQtYzllNQ==`, // if API key needed
  },
  cache: new InMemoryCache(),
});

export default client;
