import { scenarios } from './part-4.utils';

/**
 * @classdesc PricingEngineRunner
 * Responsibile for running test scenarios for a given PricingEngine.
 * Note: No Action Required. Provided for testing purposes only.
 */
class PricingEngineRunner {
  constructor() {}

  async runTests(pricingEngine: any) {
    scenarios.forEach(async (scenario) => {
      const result = await pricingEngine.getLowestPrice(
        scenario.timeout,
        scenario.providers
      );

      if (!result && scenario.result != null) {
        console.log(`TEST FAILED [#${scenario.id}]: Got no result`);
      } else if (
        result &&
        (result.provider.id != scenario.result.provider.id ||
          result.price != scenario.result.price)
      ) {
        const expected = `${scenario.result.provider.name} at \$${scenario.result.price}`;
        const got = `${result.provider.name} at \$${result.price}`;
        console.log(
          `TEST FAILED [#${scenario.id}]: Expected ${expected}, got ${got}`
        );
      } else if (result === null && scenario.result === null) {
        console.log(`SUCCESS [#${scenario.id}]: Got no result as expected`);
      } else {
        const expected = `${scenario.result.provider.name} at \$${scenario.result.price}`;
        console.log(`SUCCESS [#${scenario.id}]: Got expected ${expected}`);
      }
    });
  }
}

/**
 * Implement the method 'getLowestPrice' in class 'PricingEngine' that is responsible for receiving prices
 * from multiple other provider classes.
 *
 * There will be multiple scenarios that will run, each one with an expected result.
 *
 * The timeout is the main determines for providers to compete and if unable to send price within the
 * given time, the result may change.
 *
 * It can be either an object containing a provider and a price, or null, if no result returned in time.
 *
 */
let temp: number = 0;
class PricingEngine {
  /**
   * TODO: Implement this method that has a maximum timeout, and a list of
   * provider instances as parameters, each of which you can call getPrice() on, to return a price. This method
   * is asynchronous and will return in a specific time with either an object, or a null value.
   *
   *  The Initial state of the test result will be:
   *
   *  TEST FAILED [#1]: Got no result
   *  TEST FAILED [#2]: Got no result
   *  TEST FAILED [#3]: Got no result
   *  TEST FAILED [#5]: Got no result
   *  TEST FAILED [#6]: Got no result
   *  (node:9) UnhandledPromiseRejectionWarning: TypeError: Cannot read properties of null (reading 'provider')
   *
   *  After completing the task, the expected output should be:
   *
   *  SUCCESS [#3]: Got expected Provider 3 at $200
   *  SUCCESS [#4]: Got no result as expected
   *  SUCCESS [#5]: Got expected Provider 1 at $250
   *  SUCCESS [#6]: Got expected Provider 3 at $325
   *  SUCCESS [#2]: Got expected Provider 1 at $300
   *  SUCCESS [#1]: Got expected Provider 2 at $250
   *
   */

  async getLowestPrice(timeout: number, providers: any) {
    /**
     * TODO: Your body goes here.
     */

    // I'm not sure I understand the requirements for this task.
    //do the timeouts in the providers come into play when calculating timeout?
    //no requirement to not include $-5 premium
    //can only certain providers be included when calculating lowest price?

    //calculate lowest price based off of providers given
    let lowestPrice: any = null;
    try {
      temp++;
      for (let x = 0; x < providers.length; x++) {
        let result = await providers[x].getPrice();
        if (result) {
          if (x == 0) {
            lowestPrice = result;
          } else if (lowestPrice && result.price < lowestPrice.price) {
            lowestPrice = result;
          }
        }
      }
      //return promise with set timeout
      return new Promise((resolve, reject) => {
        setTimeout(resolve, timeout, lowestPrice);
      });
    } catch (err) {
      console.error('err', err);
    }
  }
}

const pricingEngineRunner = new PricingEngineRunner();

/**
 * Note: No Action is Required, for testing purposes only.
 */
async function run() {
  const pricingEngine = new PricingEngine();
  await pricingEngineRunner.runTests(pricingEngine);
}

run();
