function request(admin) {
  admin.on('admin.network.request', (e) => {
    incrementTotalRequests(admin);
    calculateRequestRate(admin);
    sendRpdLog(admin, e);
    sendRpdBreakpointAlert(admin, e);
  });
}

// increment totalRequests variable
function incrementTotalRequests(admin) {
  admin.metrics.totalRequests += 1;
}

// after 30 seconds, calculates the number of requests per seconds over the previous 30 seconds
function calculateRequestRate(admin) {
  // save current number of total requests to pass into setTimeout
  const startNum = admin.metrics.totalRequests;
  // after 30 seconds, calculate difference in totalRequests and divide by 30 to update requestRate
  setTimeout(
    (start) => {
      const end = admin.metrics.totalRequests;
      admin.metrics.requestRate = (end - start) / 30;
    },
    30000,
    startNum
  );
}

// if log is on, send log anytime pendingDuration exceeds 1 for apiName other than OffsetFetch
function sendRpdLog(admin, e) {
  if (
    admin.metrics.options.requestPendingDuration.logOn &&
    e.payload.apiName !== 'OffsetFetch' &&
    e.payload.pendingDuration > 1
  ) {
    console.log(
      `Latency occuring in ${e.payload.apiName} API for admin ${admin.metrics.name} (member Id: ${admin.metrics.memberId}).\npendingDuration for last request was ${e.payload.pendingDuration}ms`
    );
  }
}

// if breakpoint is set, send breakpoint if pendingDuration exceeds breakpoint
function sendRpdBreakpointAlert(admin, e) {
  // check if breakpoint is set and pendingDuration is greater than breakpoint
  if (
    admin.metrics.options.requestPendingDuration.breakpoint &&
    e.payload.pendingDuration >
      admin.metrics.options.requestPendingDuration.breakpoint
  ) {
    console.warn(
      `BREAKPOINT ALERT: Request pendingDuration breakpoint (${admin.metrics.options.requestPendingDuration.breakpoint}ms) exceeded for admin ${admin.metrics.name} (member Id: ${admin.metrics.memberId}).\n
        Last request pendingDuration was ${e.payload.pendingDuration} for API ${e.payload.apiName}`
    );
  }
}

module.exports = request;
