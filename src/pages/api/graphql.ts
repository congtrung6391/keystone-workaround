import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { keystoneContext } from "../../../keystone/context";

const apolloServer = new ApolloServer({
  schema: keystoneContext.graphql.schema
});

export default startServerAndCreateNextHandler(apolloServer)
