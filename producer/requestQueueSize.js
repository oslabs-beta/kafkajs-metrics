// helps monitor the progress of queue size and helps alert the user if its above a certain size
function requestQueueSize(producer) {
  producer.on('producer.network.request_queue_size', (e) => {
    sendRqsLog(producer, e);
    sendRqsBreakpointAlert(producer, e);
  });
}

// console logs request queue size on each request
function sendRqsLog(producer, e) {
  // check if logOn is true
  if (producer.metrics.options.requestQueueSize.logOn) {
    console.log(
      `Current requestQueueSize is ${e.payload.queueSize} for producer ${producer.metrics.name} (member id: ${producer.metrics.memberId})`
    );
  }
}

// sends breakpoint alert if RQS exceeds set breakpoint
function sendRqsBreakpointAlert(producer, e) {
  // check if breakpoint is set and queueSize exceeds it
  if (
    producer.metrics.options.requestQueueSize.breakpoint &&
    e.payload.queueSize > producer.metrics.options.requestQueueSize.breakpoint
  ) {
    console.warn(
      `BREAKPOINT ALERT: Request queueSize breakpoint (${producer.metrics.options.requestQueueSize.breakpoint}) exceeded for producer ${producer.metrics.name} (member id: ${producer.metrics.memberId}).\nCurrent requestQueueSize is ${e.payload.queueSize}`
    );
  }
}

module.exports = requestQueueSize;
