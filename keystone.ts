import { config, list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { password, relationship, select, text, timestamp } from '@keystone-6/core/fields';
import dotenv from 'dotenv';

dotenv.config()

const lists = {
  User: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      posts: relationship({ ref: 'Post.author', many: true }),
      password: password({ validation: { isRequired: true } })
    },
  }),
  Post: list({
    access: allowAll,
    fields: {
      title: text(),
      publishedAt: timestamp(),
      status: select({
        options: [
          { label: 'Published', value: 'published' },
          { label: 'Draft', value: 'draft' },
        ],
        defaultValue: 'draft',
        ui: { displayMode: 'segmented-control' },
      }),
      author: relationship({
        ref: 'User.posts',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'email'],
          inlineEdit: { fields: ['name', 'email'] },
          linkToItem: true,
          inlineCreate: { fields: ['name', 'email'] },
        },
      }),
    },
  }),
};

export default config({
  db: {
    provider: 'sqlite',
    url: 'file:./keystone.db',
  },
  lists,
  server: {
    port: 3000,          // Specify the port
    cors: {
      origin: '*', // Add allowed origins for CORS
      method: '*',
      credentials: true,                 // Enable credentials if required
    },
  },
  graphql: {
    path: process.env.APOLLO_CLIENT_GRAPHQL_URI || '/api/graphql',
    playground: true,
    apolloConfig: { introspection: false },
  },
});
