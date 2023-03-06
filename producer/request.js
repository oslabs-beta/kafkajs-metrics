function request(producer) {
  producer.on('producer.network.request', (e) => {
    incrementTotalRequests(producer);
    calculateRequestRate(producer);
    sendRpdLog(producer, e);
    sendRpdBreakpointAlert(producer, e);
  });
}

// increment totalRequests variable
function incrementTotalRequests(producer) {
  producer.metrics.totalRequests += 1;
}

// after 30 seconds, calculates the number of requests per seconds over the previous 30 seconds
function calculateRequestRate(producer) {
  // save current number of total requests to pass into setTimeout
  const startNum = producer.metrics.totalRequests;
  // after 30 seconds, calculate difference in totalRequests and divide by 30 to update requestRate
  setTimeout(
    (start) => {
      const end = producer.metrics.totalRequests;
      producer.metrics.requestRate = (end - start) / 30;
    },
    30000,
    startNum
  );
}

// if log is on, send log anytime pendingDuration exceeds 1 for apiName other than OffsetFetch
function sendRpdLog(producer, e) {
  if (
    producer.metrics.options.requestPendingDuration.logOn &&
    e.payload.apiName !== 'OffsetFetch' &&
    e.payload.pendingDuration > 1
  ) {
    console.log(
      `Latency occuring in ${e.payload.apiName} API for producer ${producer.metrics.name} (member Id: ${producer.metrics.memberId}).\npendingDuration for last request was ${e.payload.pendingDuration}ms`
    );
  }
}

// if breakpoint is set, send breakpoint if pendingDuration exceeds breakpoint
function sendRpdBreakpointAlert(producer, e) {
  // check if breakpoint is set and pendingDuration is greater than breakpoint
  if (
    producer.metrics.options.requestPendingDuration.breakpoint &&
    e.payload.pendingDuration >
      producer.metrics.options.requestPendingDuration.breakpoint
  ) {
    console.warn(
      `BREAKPOINT ALERT: Request pendingDuration breakpoint (${producer.metrics.options.requestPendingDuration.breakpoint}ms) exceeded for producer ${producer.metrics.name} (member Id: ${producer.metrics.memberId}).\n
      Last request pendingDuration was ${e.payload.pendingDuration} for API ${e.payload.apiName}`
    );
  }
}

module.exports = request;
