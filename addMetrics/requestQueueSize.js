// helps monitor the progress of queue size and helps alert the user if its above a certain size
function requestQueueSize(obj, type) {
  obj.on(`${type}.network.request_queue_size`, (e) => {
    sendRqsLog(obj, e, type);
    sendRqsBreakpointAlert(obj, e, type);
  });
}

// console logs request queue size on each request
function sendRqsLog(obj, e, type) {
  // check if logOn is true
  if (obj.metrics.options.requestQueueSize.logOn) {
    console.log(
      `Current requestQueueSize is ${e.payload.queueSize} for ${type} ${
        obj.metrics.name
      }${type === 'consumer' ? ` (member ID: ${obj.metrics.memberId})` : ''}`
    );
  }
}

// sends breakpoint alert if RQS exceeds set breakpoint
function sendRqsBreakpointAlert(obj, e, type) {
  // check if breakpoint is set and queueSize exceeds it
  if (
    obj.metrics.options.requestQueueSize.breakpoint &&
    e.payload.queueSize > obj.metrics.options.requestQueueSize.breakpoint
  ) {
    console.warn(
      `BREAKPOINT ALERT: Request queueSize breakpoint (${
        obj.metrics.options.requestQueueSize.breakpoint
      }) exceeded for ${type} ${obj.metrics.name}${
        type === 'consumer' ? ` (member ID: ${obj.metrics.memberId})` : ''
      }\nCurrent requestQueueSize is ${e.payload.queueSize}`
    );
  }
}

module.exports = requestQueueSize;
