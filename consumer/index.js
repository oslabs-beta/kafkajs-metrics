const endBatchProcess = require('./endBatchProcess');
const heartbeat = require('./heartbeat');
const { initialConnectionAge, successfulConnectionAge } = require('./connect');
const { requestEvents } = require('./request');
const requestTimeoutRate = require('./request_timeout');
const totalPartitions = require('./group_join');
const consumerDisconnect = require('./disconnect');

function metricize(consumer, client) {
  // create empty metrics property on consumer
  consumer.metrics = {
    memberId: null, // set within group_join.js, reset on disconnect in disconnect.js
    isConnected: false,
    lastHeartbeat: 0, // updated within heartbeat.js, reset on disconnect in disconnect.js
    lastHeartbeatDuration: 0, // updated within heartbeat.js, reset on disconnect in disconnect.js
    longestHeartbeatDuration: 0, // updated within heartbeat.js, reset on disconnect in disconnect.js
    // the options object inside consumer.metrics contains properties for event emitters that aren't useful for the developer to view (i.e. flag on-and-off properties for conditionals)
    messagesConsumed: 0, // updated within endBatchProcess.js
    offsetLag: null, // updated within endBatchProcess.js
    totalRequests: 0, // updated within request.js
    requestRate: 0, // updated within request.js
    timeoutRate: 0, // updated within request_timeout.js
    totalPartitions: 0, // updated within group_join.js
    // turns on logging every heartbeat
    heartbeatLogOn: function () {
    consumer.metrics.options.heartbeat.logOn = true;
    },
    // turns off logging every heartbeat
    heartbeatLogOff: function () {
      consumer.metrics.options.heartbeat.logOn = false;
    },
    // creates a breakpoint at the input interval
    heartbeatBreakpoint: function (interval) {
      consumer.metrics.options.heartbeat.breakpoint = interval;
    },
    // ends a previously-input breakpoint at the inputted interval
    heartbeatBreakpointOff: function () {
      consumer.metrics.options.heartbeat.breakpoint = null;
    },
    setOffsetLagBreakpoint: function (interval) {
      consumer.metrics.options.offsetLagBreakpoint = interval;
    },
    offsetLagBreakpointOff: function () {
      consumer.metrics.options.offsetLagBreakpoint = null;
    },
    options: {
      heartbeat: {
        logOn: null, // set within heartbeat.js
        breakpoint: null, // set within heartbeat.js
        offsetLagBreakpoint: null, // set within endBatchProcess.js
      },
    },
  };
  // run functions to create metrics for consumer instrumentation events
  endBatchProcess(consumer);
  initialConnectionAge(consumer);
  successfulConnectionAge(consumer, client);
  consumerDisconnect(consumer, client);
  requestEvents(consumer);
  requestTimeoutRate(consumer);
  totalPartitions(consumer);
  heartbeat(consumer);
  return consumer;
}

module.exports = metricize;
