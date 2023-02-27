
// Overall functionality:
  // provides constantly updated static property values for lastHeartbeat timestamp, lastHeartbeatDuration, longestHeartbeatDuration
  // provides methods to turn on/off console log for each heartbeat event emitted
  // provides methods to set/turn off breakpoint alert message when lastHeartbeatDuration exceeds inputted time interval
  // TODO: Consider accessing saved consumer name for console logs

  function heartbeatOn(consumer) {
    // creates lastHeartbeat, lastHeartbeatDuration, longestHeartbeatDuration properties on consumer.metrics
    consumer.metrics.lastHeartbeat = 0;
    consumer.metrics.lastHeartbeatDuration = 0;
    consumer.metrics.longestHeartbeatDuration = 0;

   // creates logOn and breakpoint properties on consumer.metrics.options
    consumer.metrics.options.logOn = false;
    consumer.metrics.options.breakpoint = null;
  
    // Methods (manipulate flag properties on consumer.metrics.options for conditional statements in heartbeatOn)
  
    // turns on logging every heartbeat
    consumer.metrics.heartbeatLogOn = function () {
      consumer.metrics.options.logOn = true;
      return;
    };
    // turns off logging every heartbeat
    consumer.metrics.heartbeatLogOff = function () {
      consumer.metrics.options.logOn = false;
      return;
    };
    // creates a breakpoint at the input interval
    consumer.metrics.heartbeatBreakpoint = function (interval) {
      consumer.metrics.options.breakpoint = interval;
      return;
    };
    // ends a previously-input breakpoint at the inputted interval
    consumer.metrics.heartbeatBreakpointOff = function () {
      consumer.metrics.options.breakpoint = null;
      return;
    };

    // initializes event emitter for HEARTBEAT
    consumer.on("consumer.heartbeat", (e) => {
      // console logs the heartbeat timestamp if logOn is turned on thru logOn method
      if (consumer.metrics.options.logOn) {
        // TODO: consider accessing saved consumer name
        console.log(`${e.payload.memberId} emits heartbeat at ${e.timestamp}`);
      }
      //calculate and update metrics:
  
      // if this is the first heartbeat, set lastHeartbeat to equal e.timestamp. skip other updates
      if (consumer.metrics.lastHeartbeat === 0) {
        consumer.metrics.lastHeartbeat = e.timestamp;
      } else {
        // calculates and updates lastHeartbeatDuration
        const lastDuration = e.timestamp - consumer.metrics.lastHeartbeat;
        consumer.metrics.lastHeartbeatDuration = lastDuration;
        if (lastDuration > consumer.metrics.longestHeartbeatDuration) {
          consumer.metrics.longestHeartbeatDuration = lastDuration;
        }
        // updates lastHeartbeat with most recent timestamp
        consumer.metrics.lastHeartbeat = e.timestamp;
  
        // conditional for sending breakpoint alert (if turned on thru breakpointOn method)
  
        if (
          consumer.metrics.options.breakpoint &&
          consumer.metrics.lastHeartbeatDuration &&
          consumer.metrics.lastHeartbeatDuration >
            consumer.metrics.options.breakpoint
        ) {
          const msExceeded = lastDuration - consumer.metrics.options.breakpoint;
          // TODO: Consider accessing saved consumer name 
          console.log(`ALERT: HEARTBEAT BREAKPOINT EXCEEDED BY ${msExceeded} MS for ${e.payload.memberId}`);
        }
  
        // ADD FUNCTIONALITY TO DISCONNECT EVENT EMITTER IF A DISCONNECT EVENT OCCURS
        // RESET LAST HEARTBEAT, LASTHEARTBEAT DURATION, LONGEST HEARTBEAT DURATION
      }
    });
  }



module.exports = heartbeatOn;