import type { ApiCallContext } from '../models/common/api-call-context.model.js';
import pactum from 'pactum';
import { RestApiUrl } from './rest-api-url.type.js';
import { HttpStatus } from '../models/common/http-status.type.js';
import type { User } from '../models/common/user-model.js';

export async function createUser(testName: string, testJob: string): Promise<User> {
  let apiCallContext: ApiCallContext = await pactum
    .spec()
    .post(RestApiUrl.USERS)
    .withHeaders('x-api-key', process.env.API_KEY)
    .withBody({ name: testName, job: testJob })
    .expectStatus(HttpStatus.CREATED)
    .returns('#ParseResponse');

  return apiCallContext.response;
}
