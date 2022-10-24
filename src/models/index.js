// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Restaurant, User } = initSchema(schema);

export {
  Restaurant,
  User
};