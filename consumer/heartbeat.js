const heartbeat = {};

// This contains the data that we want the developer to access
heartbeat.heartbeatMetrics = {
  lastHeartbeat: 0,
  lastHeartbeatDuration: 0,
  longestHeartbeatDuration: 0,
};

//
heartbeat.heartbeatMetricsOptions = {
  logOn: false,
  breakpoint: null,
};

// this is the event emitter that is running constantly
heartbeat.heartbeatMetrics = function () {
  consumer.on("consumer.heartbeat", (e) => {
    // this console logs the heartbeat timestamp if logOn is turned on
    if (heartbeat.heartbeatMetricsOptions.logOn) {
      // consider accessing saved consumer name
      console.log(`${e.payload.memberId} emits heartbeat at ${e.timestamp}`);
    }
    // this console logs the breakpoint alert if breakpoint alert has been turned on AND has been exceeded

    const lastDuration = e.timestamp - heartbeat.heartbeatMetrics.lastHeartbeat;
    if (
      heartbeat.heartbeatMetricsOptions.breakpoint &&
      heartbeat.heartbeatMetricsOptions.lastHeartbeatDuration
    ) {
      if (
        lastDuration >
        this.heartbeatBreakpoint.heartbeatMetricsOptions.breakpoint
      ) {
        const msExceeded =
          lastDuration - heartbeat.heartbeatMetricsOptions.breakpoint;
        console.log(
          `Heartbeat Breakpoint Alert: Breakpoint exceeded by ${msExceeded} ms`
        );
      }
    }
    // this updates heartbeatMetrics
    heartbeat.heartbeatMetrics.lastHearbeat = e.timestamp;
    heartbeat.lastHeartbeatDuration = lastDuration;
    if (lastDuration > heartbeat.heartbeatMetrics.longestHeartbeatDuration) {
      heartbeat.heartbeatMetrics.longestHeartbeatDuration = lastDuration;
    }

    // ADD FUNCTIONALITY TO DISCONNECT EVENT EMITTER IF A DISCONNECT EVENT OCCURS
    // RESET LAST HEARTBEAT, LASTHEARTBEAT DURATION, LONGEST HEARTBEAT DURATION
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

// this method creates a breakpoint at the inputted interval
heartbeat.heartbeatBreakpoint = function (interval) {
  heartbeat.heartbeatMetricsOptions.breakpoint = interval;
  return;
};

// this method ends a previously-inputted breakpoint at the inputted interval
heartbeat.heartbeatBreakpoint = function (interval) {
  heartbeat.heartbeatMetricsOptions.breakpoint = null;
  return;
};
