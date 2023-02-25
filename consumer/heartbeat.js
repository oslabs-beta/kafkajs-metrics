// method: heartbeatOn - console logs each heartbeat with the consumer name
// method: heartbeatAlert(millisseconds) - console.logs an ALERT (eventually set this to LOG?) if the heartbeat extends inputted num of milliseconds (should be longer than heartbeat, less than setInterval)
// need to keep track of most recent heartbeat - should this be saved to consumer metrics obj?
// should we turn this off is the consumer disconnects? Or this alert should just be in addition to consumer disconnecting?

const heartbeatMetrics = {
  lastHeartbeat: 0,
  lastHeartbeatInterval: 0,
};

// this function console logs every heartbeat with an optional parameter of a consumer identifying name, otherwise memberId is used
function heartbeatOn(consumerIdentifyingName) {
  // does this need to be consumer.events.heartbeat? Different in endBatchProcess (no events)

  consumer.on("consumer.events.heartbeat", (e) => {
    if (heartbeatMetrics.lastHeartbeat) {
      heartbeatMetrics.lastHeartbeatInterval =
        e.timestamp - heartbeatMetrics.lastHeartbeat;
    }
    heartbeatMetrics.lastHeartbeat = e.timestamp;
    const consumerId = consumerIdentifyingName || e.memberId;
    console.log(`${consumerId} emits heartbeat at ${e.timestamp}`);
  });
}

// this function allows a dev to input max milliseconds limit for heartbeatInterval at which a breakpoin alert will be console logged

function heartbeatAlert(
  maxMilliseconds,
  howFrequentlyToCheck,
  consumerIdentifyingName
) {
  // how to piggy back this on the previous function? use a setInterval timer
  // is setInterval timer similar to heartbeatOn in that once it is set, it just keeps going?
  // how to easily turn off? save variable in heartbeat Metrics?
}
