// method: heartbeatOn - console logs each heartbeat with the consumer name
// method: heartbeatAlert(millisseconds) - console.logs an ALERT (eventually set this to LOG?) if the heartbeat extends inputted num of milliseconds (should be longer than heartbeat, less than setInterval)
//Questions: this alert would be in addition to a disconnect alert, if one is fired. Should disconnect event override/cancel the heartbeat event?
// if disconnect or stop or crash event is emitted, should heartbeatMetrics be reset to 0? Should heartbeatAlert be cancelled?

const heartbeatMetrics = {
  lastHeartbeat: 0,
  lastHeartbeatInterval: 0,
};

// this function console logs every heartbeat with an optional parameter of a consumer identifying name, otherwise payload memberId is used
function heartbeatOn(consumerIdentifyingName) {
  // does this need to be consumer.events.heartbeat? Different in endBatchProcess (no events)

  consumer.on("consumer.heartbeat", (e) => {
    if (heartbeatMetrics.lastHeartbeat) {
      heartbeatMetrics.lastHeartbeatInterval =
        e.timestamp - heartbeatMetrics.lastHeartbeat;
    }
    heartbeatMetrics.lastHeartbeat = e.timestamp;
    // console.log(e.payload.memberId)
    const consumerId = consumerIdentifyingName || e.payload.memberId;
    console.log(`${consumerId} emits heartbeat at ${e.timestamp}`);
    console.log("heartbeatMetrics", heartbeatMetrics);
  });
}

consumer.heartbeatTurnOn = heartbeatOn;
consumer.heartbeatTurnOn();

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
