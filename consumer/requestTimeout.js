function requestTimeout(consumer) {
  consumer.on('consumer.network.request_timeout', () => {
    incrementTotalRequestTimeouts(consumer);
    calculateTimeoutRate(consumer);
  });
}

function incrementTotalRequestTimeouts(consumer) {
  consumer.metrics.totalRequestTimeouts += 1;
}

// after 30 seconds, calculates the number of request timeouts per seconds over the previous 30s
function calculateTimeoutRate(consumer) {
  // save current number of total requests to pass into setTimeout
  const startNum = consumer.metrics.totalRequestTimeouts;
  // after 30 seconds, calculate difference in totalRequests and divide by 30 to update requestRate
  setTimeout(
    (start) => {
      const end = consumer.metrics.totalRequestTimeouts;
      consumer.metrics.timeoutRate = (end - start) / 30;
    },
    30000,
    startNum
  );
}

module.exports = requestTimeout;
