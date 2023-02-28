const endBatchProcess = require('./endBatchProcess');
const heartbeat = require('./heartbeat');


function metricize(consumer) {
  // create empty metrics property on consumer
  consumer.metrics = {
    lastHeartbeat: 0,
    lastHeartbeatDuration: 0,
    longestHeartbeatDuration: 0,
    // the options object inside consumer.metrics contains properties for event emitters that aren't useful for the developer to view
    options: {
      heartbeat: {
        logOn: true,
        breakpoint: null
      }
    }
  };
  // run functions to create metrics for consumer instrumentation events
  endBatchProcess(consumer);
  heartbeat(consumer);
  return consumer;
}

module.exports = metricize;
