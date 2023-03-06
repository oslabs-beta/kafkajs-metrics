function requestTimeout(producer) {
  producer.on('producer.network.request_timeout', () => {
    incrementTotalRequestTimeouts(producer);
    calculateTimeoutRate(producer);
  });
}

function incrementTotalRequestTimeouts(producer) {
  producer.metrics.totalRequestTimeouts += 1;
}

// after 30 seconds, calculates the number of request timeouts per seconds over the previous 30s
function calculateTimeoutRate(producer) {
  // save current number of total requests to pass into setTimeout
  const startNum = producer.metrics.totalRequestTimeouts;
  // after 30 seconds, calculate difference in totalRequests and divide by 30 to update requestRate
  setTimeout(
    (start) => {
      const end = producer.metrics.totalRequestTimeouts;
      producer.metrics.timeoutRate = (end - start) / 30;
    },
    30000,
    startNum
  );
}

module.exports = requestTimeout;
