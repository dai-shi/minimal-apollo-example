/* global apolloClient, graphqlTag */
/* eslint-env browser */

const ApolloClient = apolloClient.default;
const gql = graphqlTag.default;

const client = new ApolloClient();

const query = gql`query {
  posts {
    name
    title
    content
  }
}`;

const observableQuery = client.watchQuery({ query, pollInterval: 1000 });

observableQuery.subscribe({ next: ({ data }) => {
  document.getElementById('result').innerHTML = JSON.stringify(data.posts, null, 2);
} });


const mutation = gql`mutation {
  addPost(name: "Mary", title: "Learn JS", content: "it is fun!") {
    name
    title
    content
  }
}`;

client.mutate({ mutation });
