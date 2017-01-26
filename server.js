const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const apolloExpress = require('apollo-server').apolloExpress;
const graphiqlExpress = require('apollo-server').graphiqlExpress;
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

const postsData = [
  { name: 'John', title: 'My first GraphQL', content: 'apple orange' },
  { name: 'Mike', title: 'My first Apollo', content: 'apple grape' },
];

const typeDefs = [`
  type Post {
    name: String
    title: String
    content: String
  }
  type Query {
    posts(keyword: String): [Post]
  }
  type Mutation {
    addPost(name: String, title: String, content: String): Post
  }
  schema {
    query: Query
    mutation: Mutation
  }
  `];

const resolvers = {
  Query: {
    posts(root, args) {
      return postsData.filter(post =>
        !args.keyword || post.content.indexOf(args.keyword) >= 0);
    },
  },
  Mutation: {
    addPost(root, doc) {
      postsData.push(doc);
      return doc;
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });
const app = express();

app.use('/graphql', bodyParser.json(), apolloExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 3000);
