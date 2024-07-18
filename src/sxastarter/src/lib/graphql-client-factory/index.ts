import { createGraphQLClientFactory } from './create';

import config from 'temp/config';

// The GraphQLRequestClientFactory serves as the central hub for executing GraphQL requests within the application

// Create a new instance on each import call
export default createGraphQLClientFactory(config);
