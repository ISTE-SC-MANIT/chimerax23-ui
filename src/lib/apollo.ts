import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import cookie from 'js-cookie';
//const token: any = cookie.get('token');

//console.log(token);
//const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWNiNDllMjA5MmU2OWI5YmNmMWJlZjMiLCJpYXQiOjE2NDA3MTI2NzQsImV4cCI6MTY0MTMxNzQ3NH0.AoPn1dNacdtSLUfQmWzBF3ho_g6uEmHHYRX8aKaJ7KY`;
const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_BACKEND}/graphql`,
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = cookie.get('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
