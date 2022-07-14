/***** TASK 1 *****/

//const { forEachLeadingCommentRange } = require('typescript');

/**
 * The following class represents a simplified version of one we
 * use frequently in different parts of our codebase. We use it
 * to encapsulate price data so we don't have to pass the raw
 * data around whenever we need it. Instead of saving the total
 * price, we save the small parts of it so that we can refer to
 * that information if we have to (total price = premium + fee).
 */
class Price {
  constructor({ fee, premium }) {
    this.value = {
      premium: premium,
      fee: fee,
    };
  }

  get() {
    return this.value;
  }

  add(...prices) {
    let temp = this.value;
    this.value = prices.reduce((prev, curr) => {
      return {
        premium: prev.value.premium + curr.value.premium,
        fee: prev.value.fee + curr.value.fee,
      };
    });
    if (this.value.value) {
      this.value.premium = this.value.value.premium + temp.premium;
      this.value.fee = this.value.value.fee + temp.fee;
    } else {
      this.value.premium += temp.premium;
      this.value.fee += temp.fee;
    }
    //brute force deletion should be changed for fix to value.value
    delete this.value.value;
    temp = {
      premium: this.value.premium,
      fee: this.value.fee,
    };
    delete this.value;
    this.value = temp;
    return this.value;
  }
}

/**
 * Right now this function doesn't work because the Price class
 * is not implemented. Your task is to update the class so that
 * the following code produces the correct result as held by the
 * `result` constant.
 *
 * Note that the `.add()` function can take any number of
 * arguments, not just 2 as used here.
 */
function task1() {
  const priceA = new Price({
    premium: 100,
    fee: 10,
  });
  const priceB = new Price({
    premium: 120,
    fee: 15,
  });
  const priceC = new Price({
    premium: 80,
    fee: 20,
  });

  const result = priceA.add(priceB, priceC);

  // result should have a premium of 300 and a fee of 45
  return result;
}

console.log(task1());

/***** TASK 2 *****/

/**
 * Requirements have now changed and we now need to allow prices
 * to be composed of sub prices.
 */
class NestedPrice extends Price {
  /**
   * The argument `prices` should be an array of instances of
   * the class Price or NestedPrice.
   */
  constructor(prices) {
    //wanted to flatten any multidimensional array of prices then accumulate and store in super as no evidence that it needs to be kept as an array. flat() seems to be unavailable in this editor as well as lodash flattenDeep
    if (prices[0].value.value) {
      super(prices[0].value.value);
    } else {
      super(prices[0].value);
    }
    for (let x = 1; x < prices.length; x++) {
      if (prices[x].value.value) {
        super.add(prices[x].value.value);
      } else {
        super.add(prices[x].value);
      }
    }
  }
}

/**
 * Your task is to implement `NestedClass` so that the
 * following code also produces the correct results without
 * affecting `Price` (i.e.: both classes need to work on their
 * own).
 */
function task2() {
  const priceA = new NestedPrice([
    new Price({ fee: 5, premium: 50 }),
    new Price({ fee: 10, premium: 130 }),
  ]);
  const priceB = new NestedPrice([
    new Price({ fee: 10, premium: 70 }),
    new Price({ fee: 0, premium: 30 }),
    new NestedPrice([
      new Price({ fee: 0, premium: 10 }),
      new Price({ fee: 5, premium: 25 }),
    ]),
  ]);

  const result = priceA.add(priceB);
  // result should have a premium of 315 and a fee of 30
  return result;
}

console.log(task2());

module.exports = {
  task1,
  task2,
};
