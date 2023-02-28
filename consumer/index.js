const endBatchProcess = require('./endBatchProcess');
const heartbeat = require('./heartbeat');
const { initialConnectionAge, successfulConnectionAge } = require('./connect');
const { totalRequests } = require('./request');
const requestTimeoutRate = require('./request_timeout');
const totalPartitions = require('./group_join');
const consumerDisconnect = require('./disconnect');

function metricize(consumer, client) {
  // create empty metrics property on consumer
  consumer.metrics = {
    isConnected: false,
    lastHeartbeat: 0,
    lastHeartbeatDuration: 0,
    longestHeartbeatDuration: 0,
    // the options object inside consumer.metrics contains properties for event emitters that aren't useful for the developer to view (i.e. flag on-and-off properties for conditionals)
    options: {
      heartbeat: {
        logOn: true,
        breakpoint: null
      }
    }
  };
  
  // run functions to create metrics for consumer instrumentation events
  endBatchProcess(consumer);
  initialConnectionAge(consumer);
  successfulConnectionAge(consumer, client);
  consumerDisconnect(consumer, client);
  totalRequests(consumer);
  requestTimeoutRate(consumer);
  totalPartitions(consumer);
  heartbeat(consumer);
  return consumer;
};

module.exports = metricize;
