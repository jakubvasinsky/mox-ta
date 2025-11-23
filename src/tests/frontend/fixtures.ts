import { test as base, type WorkerInfo } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { pactumBaseApiSetup } from '../setup/test-setup.js';
import { testLog } from '../../support/helpers/common/tools.js';

export type TestFixtures = {
  allureReporting: void;
};

export const test = base.extend<TestFixtures, { backendSetup: void }>({
  allureReporting: [
    async ({}, use) => {
      await use();
      if (test.info().status === 'skipped') {
        await allure.description(`Reason: ${test.info().annotations.find(ann => ann.type === 'skip')?.description}`);
      }
    },
    { auto: true },
  ],
  backendSetup: [
    async ({}, use, workerInfo: WorkerInfo) => {
      testLog('Initializing Test Data for the test in Worker Fixture.');
      console.log(`Worker index: ${test.info().workerIndex}`);
      console.log(`Worker Parallel index: ${workerInfo.parallelIndex}`);
      pactumBaseApiSetup();

      await use();
    },
    { scope: 'worker', auto: true },
  ],
});

export default test;
