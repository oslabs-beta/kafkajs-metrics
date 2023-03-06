function request(obj, client, type) {
  obj.on(`${type}.network.request`, (e) => {
    incrementTotalRequests(obj);
    calculateRequestRate(obj);
    sendRpdLog(obj, e, type);
    sendRpdBreakpointAlert(obj, e, type);
  });
}

// increment totalRequests variable
function incrementTotalRequests(obj) {
  obj.metrics.totalRequests += 1;
}

// after X ms, calculates requests/second over the previous (X/1000) seconds
// X is the obj.metrics.options.requestRatePeriod property
function calculateRequestRate(obj) {
  // save current number of total requests to pass into setTimeout
  const startNum = obj.metrics.totalRequests;
  // after X ms, calculate difference in totalRequests and divide by X/1000 to update requestRate
  setTimeout(
    (start) => {
      const end = obj.metrics.totalRequests;
      obj.metrics.requestRate =
        (end - start) / (obj.metrics.options.requestRatePeriod / 1000);
    },
    obj.metrics.options.requestRatePeriod,
    startNum
  );
}

// if log is on, send log anytime pendingDuration exceeds 1 for apiName other than OffsetFetch
function sendRpdLog(obj, e, type) {
  if (
    obj.metrics.options.requestPendingDuration.logOn &&
    e.payload.apiName !== 'OffsetFetch' &&
    e.payload.pendingDuration > 1
  ) {
    console.log(
      `Latency occuring in ${e.payload.apiName} API for ${type} ${
        obj.metrics.name
      }${
        type === 'consumer' ? ` (member ID: ${obj.metrics.memberId})` : ''
      }\npendingDuration for last request was ${e.payload.pendingDuration}ms`
    );
  }
}

// if breakpoint is set, send breakpoint if pendingDuration exceeds breakpoint
function sendRpdBreakpointAlert(obj, e, type) {
  // check if breakpoint is set and pendingDuration is greater than breakpoint
  if (
    obj.metrics.options.requestPendingDuration.breakpoint &&
    e.payload.pendingDuration >
      obj.metrics.options.requestPendingDuration.breakpoint
  ) {
    console.warn(
      `BREAKPOINT ALERT: Request pendingDuration breakpoint (${
        obj.metrics.options.requestPendingDuration.breakpoint
      }ms) exceeded for ${type} ${obj.metrics.name}${
        type === 'consumer' ? ` (member ID: ${obj.metrics.memberId})` : ''
      }\nLast request pendingDuration was ${
        e.payload.pendingDuration
      } for API ${e.payload.apiName}`
    );
  }
}

module.exports = request;
