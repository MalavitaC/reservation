
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  // uri: 'http://localhost:3000/query', //之前搭建的GraphQL server地址
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  },
  link: authLink.concat(httpLink),
});

export default client