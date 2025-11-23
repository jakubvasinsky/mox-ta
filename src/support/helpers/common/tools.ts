import { readFileSync } from 'fs';

/**
 * Read JSON file and passed it to be used in requests
 * @param {string} jsonPath Path to JSON file to be read
 * @returns Parsed JSON read from the defined file
 */
export function readJson(jsonPath: string): any {
  return JSON.parse(readFileSync(jsonPath, { encoding: 'utf-8' }));
}

/**
 * Pause the run of the test for the certain millis
 * @param millis value of millis to pause test for
 * @param customMessage custom message to log
 * @returns Promise to be awaited with supplied timeout
 */
export function pauseTest(millis = 5000, customMessage: string | null = null) {
  console.log(`Waiting for %s millis ${customMessage}`, millis);
  return new Promise(resolve => setTimeout(resolve, millis));
}

export function testLog(message: string) {
  console.log(`[TEST LOG] :: ${message}`);
}

export function logFullObject(object: any) {
  console.dir(object, { depth: null });
}
