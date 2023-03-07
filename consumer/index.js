const endBatchProcess = require('./endBatchProcess');
const heartbeat = require('./heartbeat');
const { initialConnectionAge, successfulConnectionAge } = require('./connect');
const { requestEvents } = require('./request');
const requestTimeoutRate = require('./request_timeout');
const requestQueueSize = require('./requestQueueSize');
const totalPartitions = require('./group_join');
const consumerDisconnect = require('./disconnect');
const fs = require('fs');
const { response } = require('../server/server');

function getConsumerData (promise, consumer, client) {
  if (client.metrics.options.visualize && client.metrics.options.token) {
    client.metrics.options.consumerNum++
    const clientName = `-Consumer${client.metrics.options.consumerNum}`;
    const name = client.metrics.options.token;
    const combinedName = client.metrics.options.token+clientName;
    console.log('combinedName: ', combinedName);
    fetch('http://localhost:3000/track', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name: combinedName, token: name}),
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log('data', data);
    })
    .catch((err) =>{
      console.log('error in consumer track: ', err)
    })

  setInterval(() => {
    const dataObj = {
      messagesConsumed: consumer.metrics.messagesConsumed,
      offSetLag: consumer.metrics.offsetLag,
      lastHeartbeat: consumer.metrics.lastHeartbeat,
      totalRequests: consumer.metrics.totalRequests,
      requestRate: consumer.metrics.requestRate,
      timeoutRate: consumer.metrics.timeoutRate,
      clientName,
    }
    const bodyObj = {};
    bodyObj.name = name;
    bodyObj.data = dataObj;
    fetch('http://localhost:3000/data', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({data: bodyObj, name: combinedName}),
        })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log('data', data);
        })
        .catch((err) =>{
          console.log('error in consumer data/main chart page: ', err)
        })
  }, 5000);
  }
}


function metricize(consumer, client) {
  // create empty metrics property on consumer
  consumer.metrics = {
    name: null,
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
    totalRequestTimeouts: 0, //updated within request_timeout.js
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
    requestPendingDurationlogOn: function () {
      consumer.metrics.options.requestPendingDuration.logOn = true;
    },
    requestPendingDurationlogOff: function () {
      consumer.metrics.options.requestPendingDuration.logOn = false;
    },
    requestPendingDurationBreakpoint: function (interval) {
      consumer.metrics.options.requestPendingDuration.breakpoint = interval;
    },
    requestPendingDurationBreakpointOff: function () {
      consumer.metrics.options.requestPendingDuration.breakpoint = null;
    },
    // turns request queue size logging on
    requestQueueSizelogOn: function () {
      consumer.metrics.options.requestQueueSize.logOn = true;
    },
    // turns off logging request queue size
    requestQueueSizelogOff: function () {
      consumer.metrics.options.requestQueueSize.logOn = false;
    },
    //creates a breakpoint at the input interval
    requestQueueSizeBreakpoint: function (interval) {
      consumer.metrics.options.requestQueueSize.breakpoint = interval;
    },
    // ends a previously-input breakpoint at the inputted interval
    requestQueueSizeBreakpointOff: function () {
      consumer.metrics.options.requestQueueSize.breakpoint = null;
    },
    latencyOffsetFetch: [], // sends the developer the current history and pattern of offsetfetch latency in requestPendingDuration.js
    // currentQueueSizeHistory: [], // sends the developer the current history and pattern of queuesizehistroy in requestQueueSize.js
    options: {
      heartbeat: {
        logOn: false, // set within heartbeat.js
        breakpoint: null, // set within heartbeat.js
        offsetLagBreakpoint: null, // set within endBatchProcess.js
      },
      requestPendingDuration: {
        logOn: false, //set within requestPendingDuration.js
        breakpoint: null, //set within requestPendingDuration.js
      },
      requestQueueSize: {
        logOn: false, //set within requestQueueSize.js
        breakpoint: null, //set within requestQueueSize.js
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
  requestQueueSize(consumer);
  const vanillaConsumerConnect = consumer.connect;
  consumer.connect = function WrapConsumerConnect() {
    return getConsumerData(vanillaConsumerConnect.apply(this, arguments), this, client);
  }
  return consumer;
}
module.exports = metricize;
