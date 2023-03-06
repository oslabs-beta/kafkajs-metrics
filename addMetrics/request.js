function request(consumer) {
  consumer.on('consumer.network.request', (e) => {
    incrementTotalRequests(consumer);
    calculateRequestRate(consumer);
    sendRpdLog(consumer, e);
    sendRpdBreakpointAlert(consumer, e);
  });
}

// increment totalRequests variable
function incrementTotalRequests(consumer) {
  consumer.metrics.totalRequests += 1;
}

// after 30 seconds, calculates the number of requests per seconds over the previous 30 seconds
function calculateRequestRate(consumer) {
  // save current number of total requests to pass into setTimeout
  const startNum = consumer.metrics.totalRequests;
  // after 30 seconds, calculate difference in totalRequests and divide by 30 to update requestRate
  setTimeout(
    (start) => {
      const end = consumer.metrics.totalRequests;
      consumer.metrics.requestRate = (end - start) / 30;
    },
    30000,
    startNum
  );
}

// if log is on, send log anytime pendingDuration exceeds 1 for apiName other than OffsetFetch
function sendRpdLog(consumer, e) {
  if (
    consumer.metrics.options.requestPendingDuration.logOn &&
    e.payload.apiName !== 'OffsetFetch' &&
    e.payload.pendingDuration > 1
  ) {
    console.log(
      `Latency occuring in ${e.payload.apiName} API for consumer ${consumer.metrics.name} (member Id: ${consumer.metrics.memberId}).\npendingDuration for last request was ${e.payload.pendingDuration}ms`
    );
  }
}

// if breakpoint is set, send breakpoint if pendingDuration exceeds breakpoint
function sendRpdBreakpointAlert(consumer, e) {
  // check if breakpoint is set and pendingDuration is greater than breakpoint
  if (
    consumer.metrics.options.requestPendingDuration.breakpoint &&
    e.payload.pendingDuration >
      consumer.metrics.options.requestPendingDuration.breakpoint
  ) {
    console.warn(
      `BREAKPOINT ALERT: Request pendingDuration breakpoint (${consumer.metrics.options.requestPendingDuration.breakpoint}ms) exceeded for consumer ${consumer.metrics.name} (member Id: ${consumer.metrics.memberId}).\n
      Last request pendingDuration was ${e.payload.pendingDuration} for API ${e.payload.apiName}`
    );
  }
}

module.exports = request;
