import yayJpg from '../assets/yay.jpg';
import { ApolloProvider } from '@apollo/client';
import gqlClient from '@/lib/gqlClient'

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
  return <ApolloProvider client={gqlClient}><HomePage /></ApolloProvider>;
};

export default CustomApolloProvider;
