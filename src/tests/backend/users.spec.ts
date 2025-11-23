import type { ApiCallContext } from '../../support/models/common/api-call-context.model.js';
import * as allure from 'allure-js-commons';
import { RestApiUrl } from '../../support/rest-client/rest-api-url.type.js';
import { HttpStatus } from '../../support/models/common/http-status.type.js';
import pactum from 'pactum';
import { readJson } from '../../support/helpers/common/tools.js';
import { faker } from '@faker-js/faker/locale/sk';
import type { UserResponse } from '../../support/models/common/user-model.js';
import { expect } from 'chai';

describe('Users creation & User list functionality ', () => {
  const testName: string = 'TA_NAME_' + faker.string.numeric(5);
  const testJob: string = 'leader';
  const firstLastName: string = 'Lawson';
  const secondLastName: string = 'Ferguson';

  context('User create Functionality', () => {
    it(`User is able to create a new user`, async () => {
      let spec = pactum.spec();
      let apiCallContext: ApiCallContext;

      await allure.step('Request to create a user is prepared', () => {
        spec
          .post(RestApiUrl.USERS)
          .withHeaders('x-api-key', process.env.API_KEY)
          .withBody({ name: testName, job: testJob })
          .returns('#ParseResponse');
      });

      await allure.step('Request to create a user is sent', async () => {
        apiCallContext = await spec.toss();
      });

      await allure.step('Verify that User is created & the response matches schema', () => {
        spec.response().to.have.status(HttpStatus.CREATED);

        const userResponseSchema = readJson('src/support/schemas/user-response.schema.json');
        spec.response().should.have.jsonSchema(userResponseSchema);

        spec.response().should.have.jsonLike({
          name: testName,
          job: testJob,
        });
      });
    });
  });

  context('User list Functionality', () => {
    it(`User is able to obtain list of users`, async () => {
      let spec = pactum.spec();
      let apiCallContext: ApiCallContext;

      await allure.step('Request to get list of users is prepared', () => {
        spec
          .get(RestApiUrl.USERS)
          .withQueryParams('page', 2)
          .withHeaders('x-api-key', process.env.API_KEY)
          .withBody({ name: testName, job: testJob })
          .returns('#ParseResponse');
      });

      await allure.step('Request to get list of users is sent', async () => {
        apiCallContext = await spec.toss();
      });

      await allure.step('Verify that User list is obtained and contains expected values', () => {
        spec.response().to.have.status(HttpStatus.OK);
        let userListResponseSchema = readJson('src/support/schemas/user-list-response.schema.json');
        spec.response().should.have.jsonSchema(userListResponseSchema);

        const userData: UserResponse = apiCallContext.response;
        expect(userData.total, 'Total records value did not match the expected one').to.eq(12);
        expect(userData.data, 'The user list is empty').to.not.be.empty;
        expect(
          userData.data[0].last_name,
          'The last name of the first user in the list did not match the expected one',
        ).to.eq(firstLastName);
        expect(
          userData.data[1].last_name,
          'The last name of the second user in the list did not match the expected one',
        ).to.eq(secondLastName);
      });
    });
  });
});
