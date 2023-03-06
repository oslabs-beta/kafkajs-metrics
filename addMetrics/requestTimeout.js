function requestTimeout(obj, type) {
  obj.on(`${type}.network.request_timeout`, () => {
    incrementTotalRequestTimeouts(obj);
    calculateTimeoutRate(obj);
  });
}

function incrementTotalRequestTimeouts(obj) {
  obj.metrics.totalRequestTimeouts += 1;
}

// after X ms, calculates the number of request timeouts/second over the previous (X/1000) seconds
// X is the obj.metrics.options.timeoutRatePeriod property
function calculateTimeoutRate(obj) {
  // save current number of total requests to pass into setTimeout
  const startNum = obj.metrics.totalRequestTimeouts;
  // after X ms, calculate difference in totalRequests and divide by (X/1000) to update requestRate
  setTimeout(
    (start) => {
      const end = obj.metrics.totalRequestTimeouts;
      obj.metrics.timeoutRate =
        (end - start) / (obj.metrics.options.timeoutRatePeriod / 1000);
    },
    obj.metrics.options.timeoutRatePeriod,
    startNum
  );
}

module.exports = requestTimeout;
