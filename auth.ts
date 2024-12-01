import { createAuth } from '@keystone-6/auth';

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  sessionData: 'name',
  secretField: 'password',
});

export { withAuth };
