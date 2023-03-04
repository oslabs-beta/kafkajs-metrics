// helps monitor the progress of queue size and helps alert the user if its above a certain size
function requestQueueSize(consumer) {
  consumer.on('consumer.network.request_queue_size', (e) => {
    sendRqsLog(consumer, e);
    sendRqsBreakpointAlert(consumer, e);
  });
}

// console logs request queue size on each request
function sendRqsLog(consumer, e) {
  // check if logOn is true
  if (consumer.metrics.options.requestQueueSize.logOn) {
    console.log(
      `Current requestQueueSize is ${e.payload.queueSize} for consumer ${consumer.metrics.name} (member id: ${consumer.metrics.memberId})`
    );
  }
}

// sends breakpoint alert if RQS exceeds set breakpoint
function sendRqsBreakpointAlert(consumer, e) {
  // check if breakpoint is set and queueSize exceeds it
  if (
    consumer.metrics.options.requestQueueSize.breakpoint &&
    e.payload.queueSize > consumer.metrics.options.requestQueueSize.breakpoint
  ) {
    console.warn(
      `BREAKPOINT ALERT: Request queueSize breakpoint (${consumer.metrics.options.requestQueueSize.breakpoint}) exceeded for consumer ${consumer.metrics.name} (member id: ${consumer.metrics.memberId}).\nCurrent requestQueueSize is ${e.payload.queueSize}`
    );
  }
}

module.exports = requestQueueSize;
