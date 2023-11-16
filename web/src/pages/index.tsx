import yayJpg from '../assets/yay.jpg';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
// import { PropsWithChildren } from 'react';
const client = new ApolloClient({
  uri: 'http://localhost:3000/query', //之前搭建的GraphQL server地址
  cache: new InMemoryCache(),
});

function HomePage() {
  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>
      <p>
        <img src={yayJpg} width="388" />
      </p>
      <p>
        To get started, edit <code>pages/index.tsx</code> and save to reload.
      </p>
    </div>
  );
}
const CustomApolloProvider = () => {
  return <ApolloProvider client={client}><HomePage /></ApolloProvider>;
};

export default CustomApolloProvider;
