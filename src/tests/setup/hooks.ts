import { pactumBaseApiSetup } from './test-setup.js';
import { testLog } from '../../support/helpers/common/tools.js';
import type { RootHookObject } from 'mocha';

export const mochaHooks: RootHookObject = {
  beforeAll: [
    async function () {
      testLog('Setting up PactumJS for API tests.');
      pactumBaseApiSetup();
    },
  ],

  afterAll: async function () {},
};
