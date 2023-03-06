function requestTimeout(admin) {
  admin.on('admin.network.request_timeout', () => {
    incrementTotalRequestTimeouts(admin);
    calculateTimeoutRate(admin);
  });
}

function incrementTotalRequestTimeouts(admin) {
  admin.metrics.totalRequestTimeouts += 1;
}

// after 30 seconds, calculates the number of request timeouts per seconds over the previous 30s
function calculateTimeoutRate(admin) {
  // save current number of total requests to pass into setTimeout
  const startNum = admin.metrics.totalRequestTimeouts;
  // after 30 seconds, calculate difference in totalRequests and divide by 30 to update requestRate
  setTimeout(
    (start) => {
      const end = admin.metrics.totalRequestTimeouts;
      admin.metrics.timeoutRate = (end - start) / 30;
    },
    30000,
    startNum
  );
}

module.exports = requestTimeout;
