/**
 * Refer to the following data when completing your answers: (The following JSON
 * file contains providers available for an industry)
 */

const PROVIDERS = require('../shared/data.json');
const { Query } = require('mingo');

// const { Aggregator } = require('mingo/aggregator');
// const { useOperators, OperatorType } = require('mingo/core');
// const { $match, $group, $sort } = require('mingo/operators/pipeline');
// const { $min } = require('mingo/operators/accumulator');

/**
 * Create a query that returns total premiums and fees available for retail industry
 */
function task1() {
  /**
   * TODO: Your body goes here
   */

  //I am unfamiliar with mongoDB I am used to an oracle backend

  //set criteria and retrieve data from collection
  let criteria = { industry: { $eq: 'retail' } };
  let query = new Query(criteria);
  let cursor = query.find(PROVIDERS);

  let totalPrems = 0;
  let totalFees = 0;
  //loop through cursor values and loop through prices
  //O(n^2) potential for quick sort or another algorithm
  for (let value of cursor) {
    for (let prices of value.prices) {
      if (typeof prices.premium === 'number') {
        totalPrems += prices.premium;
      }
      if (typeof prices.fee === 'number') {
        totalFees += prices.fee;
      }
    }
  }
  console.log([{ totalPremium: totalPrems, totalFees: totalFees }]);
  return [{ totalPremium: totalPrems, totalFees: totalFees }];
}

/**
 * Create a query that returns the minimum premium available among the providers for technology industry
 */
function task2() {
  /**
   * TODO: Your body goes here
   */
  //set criteria and retrieve data from collection
  // useOperators(OperatorType.PIPELINE, { $match, $group });
  // useOperators(OperatorType.ACCUMULATOR, { $min });

  // let agg = new Aggregator([
  //   { $match: { industry: 'technology' } },
  //   { $group: { '$prices.premium': { $min: '$premium' } } },
  // ]);

  // let stream = agg.stream(PROVIDERS);

  // return all results. same as `stream.all()`
  // let result = agg.run(PROVIDERS);
  // console.log(result);

  //tried to use $min aggregator but got Errror: unknown operator $min even though it was defined above.

  //tried to use $sort pipeline operator as an alternative to min aggregator but received errors

  let criteria = {
    industry: { $eq: 'technology' },
  };
  let query = new Query(criteria);
  let cursor = query.find(PROVIDERS);
  //cursor.sort({ '$prices.premium': 1 });

  let totalPrems = 9007199254740991n;
  //loop through cursor values and loop through prices
  //O(n^2) potential for quick sort or another algorithm
  for (let value of cursor) {
    for (let prices of value.prices) {
      if (typeof prices.premium === 'number') {
        if (prices.premium < totalPrems) totalPrems = prices.premium;
      }
    }
  }
  console.log([{ totalPremium: totalPrems }]);
  return [{ totalPremium: totalPrems }];
}

/**
 * Create a query that returns all the provider names available for the technology industry
 * that has a premium amount greater than or equal to 1000
 */
function task3() {
  /**
   * TODO: Your body goes here
   */

  //setup criteria and query providers into cursor
  let criteria = {
    industry: { $eq: 'technology' },
    'prices.premium': { $gte: 1000 },
  };
  let query = new Query(criteria);
  let cursor = query.find(PROVIDERS);

  //loop through cursor values
  let providerNames = [];
  for (let value of cursor) {
    providerNames.push(value.name);
  }
  console.log(providerNames);
  return providerNames;
}

/**
 * To see the expected results, please refer to ./expected-data.json file in part-1 directory!
 * NOTE: Please ensure that all the tests in part-1.spec.js are passing!
 */

module.exports = {
  task1,
  task2,
  task3,
};
