import { ApolloServer } from "@apollo/server";
import { keystoneContext } from "../../keystone-context";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

const apolloServer = new ApolloServer({
  schema: keystoneContext.graphql.schema
});

export default startServerAndCreateNextHandler(apolloServer)
