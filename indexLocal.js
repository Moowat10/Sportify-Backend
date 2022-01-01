const { ApolloServer, PubSub } = require("apollo-server");
const typeDefs = require("./src/typedefs");
const resolvers = require("./src/resolvers");
const { createToken, getUserFromToken } = require("./src/auth");
const pubsub = new PubSub();
/*connect()
.then(conn => console.log('Connected to MongoDB'))
.catch(err => console.log('Error in connecting to MongoDB', err))*/
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { pubsub },
});

server.listen(8000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
