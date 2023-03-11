function heartbeatOn(consumer) {
  consumer.on('consumer.heartbeat', (e) => {
    sendHeartbeatLog(consumer, e);
    sendBreakpointAlert(consumer, e);
    setLastHeartbeat(consumer, e);
  });
}

// console logs the heartbeat timestamp if logOn is turned on thru logOn method
function sendHeartbeatLog(consumer, e) {
  // check if logOn is true
  if (consumer.metrics.options.heartbeat.logOn) {
    console.log(
      `heartbeat emitted at ${e.timestamp} for consumer ${consumer.metrics.name} (member id: ${consumer.metrics.memberId})`
    );
  }
}

// sends breakpoint alert if required
function sendBreakpointAlert(consumer, e) {
  // save last heartbeat duration
  const lastDuration = e.timestamp - consumer.metrics.lastHeartbeat;
  // check if breakpoint is set, lastHeartbeat is not 0, and lastDuration is greater than breakpoint
  if (
    consumer.metrics.options.heartbeat.breakpoint &&
    consumer.metrics.lastHeartbeat &&
    lastDuration > consumer.metrics.options.heartbeat.breakpoint
  ) {
    // save difference between last duration and breakpoint
    const msExceeded =
      lastDuration - consumer.metrics.options.heartbeat.breakpoint;
    console.warn(
      `BREAKPOINT ALERT: Heartbeat breakpoint exceeded by ${msExceeded}ms for consumer ${consumer.metrics.name} (member id: ${consumer.metrics.memberId})\nLast heartbeat duration was ${lastDuration}ms, breakpoint is ${consumer.metrics.options.heartbeat.breakpoint}`
    );
  }
}

// updates lastHeartbeat, lastHeartbeatDuration, longestHeartbeatDuration
function setLastHeartbeat(consumer, e) {
  // if this is the first heartbeat, set lastHeartbeat to equal e.timestamp and skip other updates
  if (consumer.metrics.lastHeartbeat === 0) {
    consumer.metrics.lastHeartbeat = e.timestamp;
  } else {
    // calculates and updates lastHeartbeatDuration (and longestHeartbeatDuration, if appropriate)
    const lastDuration = e.timestamp - consumer.metrics.lastHeartbeat;
    consumer.metrics.lastHeartbeatDuration = lastDuration;
    if (lastDuration > consumer.metrics.longestHeartbeatDuration) {
      consumer.metrics.longestHeartbeatDuration = lastDuration;
    }
    // updates lastHeartbeat with most recent timestamp
    consumer.metrics.lastHeartbeat = e.timestamp;
  }
}

module.exports = { heartbeatOn, setLastHeartbeat };
