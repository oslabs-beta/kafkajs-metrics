function requestTimeout(obj, type) {
  obj.on(`${type}.network.request_timeout`, () => {
    incrementTotalRequestTimeouts(obj);
  });
}

function incrementTotalRequestTimeouts(obj) {
  obj.metrics.totalRequestTimeouts += 1;
}

module.exports = requestTimeout;
