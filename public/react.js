/* global apolloClient, graphqlTag, reactApollo, React, ReactDOM */
/* eslint-env browser */

const ApolloClient = apolloClient.default;
const gql = graphqlTag.default;
const ApolloProvider = reactApollo.ApolloProvider;
const graphql = reactApollo.graphql;

const client = new ApolloClient();

const query = gql`query {
  posts {
    name
    title
    content
  }
}`;

const mutation = gql`mutation ($content: String){
  addPost(name: "Mary", title: "No title", content: $content) {
    name
    title
    content
  }
}`;

const Posts = ({ data }) => (
  <div>
    {data.loading ? <div>Loading...</div> :
      <ul>
        {data.posts.map(({ name, title, content }) => (
          <li>{name} - {title} - {content}</li>
        ))}
      </ul>
    }
  </div>
);

Posts.propTypes = {
  data: React.PropTypes.shape({
    loading: React.PropTypes.bool.isRequired,
    posts: React.PropTypes.array,
  }).isRequired,
};

const PostsWithData = graphql(query)(Posts);

const getInputText = e => e.target.parentElement.getElementsByTagName('input')[0].value;
const AddPost = ({ mutate }) => (
  <div>
    <input />
    <button onClick={e => mutate({ variables: { content: getInputText(e) } })}>Add</button>
  </div>
);

AddPost.propTypes = {
  mutate: React.PropTypes.func.isRequired,
};

const AddPostWithData = graphql(mutation)(AddPost);

const App = () => (
  <div>
    <h1>Posts</h1>
    <PostsWithData />
    <h1>AddPost</h1>
    <AddPostWithData />
  </div>
);

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('app')
);
