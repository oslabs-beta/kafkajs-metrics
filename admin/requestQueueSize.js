// helps monitor the progress of queue size and helps alert the user if its above a certain size
function requestQueueSize(admin) {
  admin.on('admin.network.request_queue_size', (e) => {
    sendRqsLog(admin, e);
    sendRqsBreakpointAlert(admin, e);
  });
}

// console logs request queue size on each request
function sendRqsLog(admin, e) {
  // check if logOn is true
  if (admin.metrics.options.requestQueueSize.logOn) {
    console.log(
      `Current requestQueueSize is ${e.payload.queueSize} for admin ${admin.metrics.name} (member id: ${admin.metrics.memberId})`
    );
  }
}

// sends breakpoint alert if RQS exceeds set breakpoint
function sendRqsBreakpointAlert(admin, e) {
  // check if breakpoint is set and queueSize exceeds it
  if (
    admin.metrics.options.requestQueueSize.breakpoint &&
    e.payload.queueSize > admin.metrics.options.requestQueueSize.breakpoint
  ) {
    console.warn(
      `BREAKPOINT ALERT: Request queueSize breakpoint (${admin.metrics.options.requestQueueSize.breakpoint}) exceeded for admin ${admin.metrics.name} (member id: ${admin.metrics.memberId}).\nCurrent requestQueueSize is ${e.payload.queueSize}`
    );
  }
}

module.exports = requestQueueSize;
