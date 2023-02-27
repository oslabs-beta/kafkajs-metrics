const heartbeat = {};

heartbeat.heartbeatMetrics = {
  lastHeartbeat: 0,
  lastHeartbeatDuration: 0,
  longestHeartbeatDuration: 0,
};

heartbeat.heartbeatMetricsOptions = {
  logOn: false,
  breakpoint: null,
};

// this is the event emitter that is running constantly
heartbeat.heartbeatOn = function (consumer) {


  consumer.on("consumer.heartbeat", (e) => {
    // this console logs the heartbeat timestamp if logOn is turned on
    if (heartbeat.heartbeatMetricsOptions.logOn) {
      // consider accessing saved consumer name
      console.log(`${e.payload.memberId} emits heartbeat at ${e.timestamp}`);
    }

    //calculate and update metrics:
    // if heartbeat = 0, set lastHearbeat to equal e.timestamp. skip other updates
    if (heartbeat.heartbeatMetrics.lastHeartbeat === 0) {
      heartbeat.heartbeatMetrics.lastHeartbeat = e.timestamp;
    } else {
      // calculate lastHeartbeatDuration and update corresponding metric
      const lastDuration =
        e.timestamp - heartbeat.heartbeatMetrics.lastHeartbeat;
      heartbeat.heartbeatMetrics.lastHeartbeatDuration = lastDuration;
      if (lastDuration > heartbeat.heartbeatMetrics.longestHeartbeatDuration) {
        heartbeat.heartbeatMetrics.longestHeartbeatDuration = lastDuration;
      }
      // updates lastHeartbeat with most recent timestamp
      heartbeat.heartbeatMetrics.lastHeartbeat = e.timestamp;

      // conditional for sending breakpoint alert

      if (
        heartbeat.heartbeatMetricsOptions.breakpoint &&
        heartbeat.heartbeatMetrics.lastHeartbeatDuration &&
        heartbeat.heartbeatMetrics.lastHeartbeatDuration >
          heartbeat.heartbeatMetricsOptions.breakpoint
      ) {
        const msExceeded =
          lastDuration - heartbeat.heartbeatMetricsOptions.breakpoint;
        console.log(`ALERT: HEARTBEAT BREAKPOINT EXCEEDED BY ${msExceeded} MS`);
      }

      // ADD FUNCTIONALITY TO DISCONNECT EVENT EMITTER IF A DISCONNECT EVENT OCCURS
      // RESET LAST HEARTBEAT, LASTHEARTBEAT DURATION, LONGEST HEARTBEAT DURATION
    }
  });
};

// this method turns on logging every heartbeat
heartbeat.heartbeatLogOn = function () {
  heartbeat.heartbeatMetricsOptions.logOn = true;
  return;
};

// this method turns off logging every heartbeat
heartbeat.heartbeatLogOff = function () {
  heartbeat.heartbeatMetricsOptions.logOn = false;
  return;
};

// this method creates a breakpoint at the input interval
heartbeat.heartbeatBreakpoint = function (interval) {
  heartbeat.heartbeatMetricsOptions.breakpoint = interval;
  return;
};

// this method ends a previously-input breakpoint at the inputted interval
heartbeat.heartbeatBreakpointOff = function (interval) {
  heartbeat.heartbeatMetricsOptions.breakpoint = null;
  return;
};

module.exports = heartbeatOn;