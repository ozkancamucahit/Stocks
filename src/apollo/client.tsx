import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';


const client = new ApolloClient({
    uri: 'https://rockyhill.stepzen.net/api/coy-frog/__graphql',
    cache: new InMemoryCache(),
    headers: {
        Authorization: 'Apikey INSERT_API_KEY'
    }
  });

  export default client;
