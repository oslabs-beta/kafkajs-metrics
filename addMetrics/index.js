const connect = require('./eventMetrics/connect');
const disconnect = require('./eventMetrics/disconnect');
const endBatchProcess = require('./eventMetrics/endBatchProcess');
const groupJoin = require('./eventMetrics/groupJoin');
const heartbeat = require('./eventMetrics/heartbeat');
const request = require('./eventMetrics/request');
const requestQueueSize = require('./eventMetrics/requestQueueSize');
const requestTimeout = require('./eventMetrics/requestTimeout');
const calculateRates = require('./periodicMetrics/calculateRates');

function addMetrics(obj, client, type) {
  /**
   * Instance Metrics Object:
   * Includes most recently calculated metrics
   * @type {object}
   * @example
   * const consumerMetrics = consumer.metrics;
   * const producerMetrics = producer.metrics;
   * const adminMetrics = admin.metrics;
   */
  // create empty metrics property on obj
  obj.metrics = {
    // VARIABLES
    /**
     * Optional name for Consumer/Producer/Admin, set by user
     * @type {string}
     * @example
     * consumer.metrics.name = 'consumer_1'
     */
    name: '', // set by user, used in various console logs
    /**
     * Boolean value to indicate if Consumer/Producer/Admin is connected
     * @type {boolean}
     * @example
     * consumer.metrics.isConnected = false;
     */
    isConnected: false, // set in connect.js, reset in disconnect.js
    /**
     * Timestamp value (ms) to indicate when Consumer/Producer/Admin initally connected
     * @type {number}
     * @example
     * consumer.metrics.isConnected = 3957103428176;
     */
    initialConnectionTimestamp: null, // updated in connect.js
    /**
     * Timestamp value (ms) to indicate when Consumer/Producer/Admin most recently connected
     * @type {number}
     * @example
     * consumer.metrics.isConnected = 3957103428982;
     */
    currentConnectionTimestamp: null, // updated in connect.js, reset in disconnect.js
    /**
     * Total number of requests
     * @type {number}
     * @example
     * consumer.metrics.totalRequests = 78;
     */
    totalRequests: 0, // updated in request.js
    /**
     * Total number of request timeouts
     * @type {number}
     * @example
     * consumer.metrics.totalRequestTimeouts = 6;
     */
    totalRequestTimeouts: 0, // updated in requestTimeout.js
    /**
     * Request rate per specified metrics.options.rate.period value (default is 5000 ms)
     * @type {number}
     * @example
     * consumer.metrics.requestRate = 78;
     */
    requestRate: null, // updated in calculateRates.js
    /**
     * Request rate over consumer/producer/admin lifetime (calculated since initial connection)
     * @type {number}
     * @example
     * consumer.metrics.requestRateLifetime = 78;
     */
    requestRateLifetime: null, // updated in calculateRates.js
    /**
     * Timeout rate per specified metrics.options.rate.period value (default is 5000 ms)
     * @type {number}
     * @example
     * consumer.metrics.timeoutRate = 2;
     */
    timeoutRate: null, // updated in calculateRates.js
    /**
     * Timeout rate over consumer/producer/admin lifetime (calculated since initial connection)
     * @type {number}
     * @example
     * consumer.metrics.timeoutRateLifetime = 78;
     */
    timeoutRateLifetime: null, // updated in calculateRates.js

    // CONNECTION METHODS
    /**
     * Returns time in ms since initial connection;
     *  returns null if consumer/producer/admin never connected
     * @returns {(number|null)}
     * @example
     * consumer.ageSinceInitialConnection() // => 87203
     */
    // returns time since initial connection; returns null if obj never connected
    ageSinceInitialConnection() {
      return obj.metrics.initialConnectionTimestamp
        ? new Date().getTime() - obj.metrics.initialConnectionTimestamp
        : null;
    },
    /**
     * Returns time in ms since current connection;
     *  returns null if consumer/producer/admin is not currently connected
     * @returns {(number|null)}
     * @example
     * consumer.ageSinceLastConnection() // => 843
     */
    // returns time since current connection; returns null if obj not currently connected
    ageSinceLastConnection() {
      return obj.metrics.currentConnectionTimestamp
        ? new Date().getTime() - obj.metrics.currentConnectionTimestamp
        : null;
    },

    // REQUEST PENDING DURATION METHODS
    /**
     * turns on logging pendingDuration for every request (off by default)
     * @example
     * consumer.requestPendingDurationLogOn()
     * // => prints log to the console; includes event payload apiName, pendingDuration
     */
    // turns on logging pendingDuration for every request (off by default)
    requestPendingDurationLogOn() {
      obj.metrics.options.requestPendingDuration.logOn = true;
    },
    /**
     * turns off logging pendingDuration for every request
     * @example
     * consumer.requestPendingDurationLogOff()
     */
    // turns off logging pendingDuration for every request
    requestPendingDurationLogOff() {
      obj.metrics.options.requestPendingDuration.logOn = false;
    },
    /**
     * creates request pendingDuration breakpoint at specified interval (ms)
     * @param {number} bp - breakpoint in milliseconds
     * @example
     * producer.requestPendingDurationSetBreakpoint(20)
     * // => prints log to the console when breakpoint is exceeded;
     * //includes event payload apiName, pendingDuration, ms breakpoint exceeded, current breakpoint
     */
    // creates request pendingDuration breakpoint at specified interval (ms)
    requestPendingDurationSetBreakpoint(bp) {
      obj.metrics.options.requestPendingDuration.breakpoint = bp;
    },
    /**
     * cancels existing request pendingDuration breakpoint
     * @example
     * producer.requestPendingDurationCancelBreakpoint()
     */
    // cancels existing request pendingDuration breakpoint
    requestPendingDurationCancelBreakpoint() {
      obj.metrics.options.requestPendingDuration.breakpoint = null;
    },

    // REQUEST QUEUE SIZE METHODS
    /**
     * turns on logging requestQueueSize for every request (off by default)
     * @example
     * consumer.requestQueueSizeLogOn()
     * // => prints log to the console; includes event payload queueSize
     */
    // turns on logging requestQueueSize for every request (off by default)
    requestQueueSizeLogOn() {
      obj.metrics.options.requestQueueSize.logOn = true;
    },
    /**
     * turns off logging requestQueueSize for every request
     * @example
     * consumer.requestQueueSizeLogOff()
     */
    // turns off logging requestQueueSize for every request
    requestQueueSizeLogOff() {
      obj.metrics.options.requestQueueSize.logOn = false;
    },
    /**
     * creates request queueSize breakpoint at specified size
     * @param {number} bp - breakpoint (queueSize number)
     * @example
     * producer.requestPendingDurationSetBreakpoint(3)
     * // => prints log to the console when breakpoint is exceeded;
     * // includes event payload queueSize, amount breakpoint exceeded, current breakpoint
     */
    // creates request queueSize breakpoint at specified size
    requestQueueSizeSetBreakpoint(bp) {
      obj.metrics.options.requestQueueSize.breakpoint = bp;
    },
    /**
     * cancels existing request queueSize breakpoint
     * @example
     * producer.requestQueueSizeCancelBreakpoint()
     */
    // cancels existing requestQueueSize breakpoint
    requestQueueSizeCancelBreakpoint() {
      obj.metrics.options.requestQueueSize.breakpoint = null;
    },

    // RATE INTERVAL METHODS
    /**
     * updates frequency (ms) at which rate metrics should be calculated (default is 1000ms)
     * @param {number} t - frequency in ms
     * @example
     * producer.setRateFrequency(300);
     */
    // updates frequency (ms) at which rate metrics should be calculated
    setRateFrequency(t) {
      obj.metrics.options.rate.frequency = t;
    },
    /**
     * updates period (ms) that rate metrics should use to calculate averages (default is 5000ms)
     * @param {number} t - period in ms
     * @example
     * producer.setRatePeriod(3000);
     */
    // updates period (ms) that rate metrics should use to calculate averages
    setRatePeriod(t) {
      obj.metrics.options.rate.period = t;
    },

    // OPTIONS
    // contains settings for console logs and breakpoint alerts
    options: {
      requestPendingDuration: {
        logOn: false, // read in requestPendingDuration.js
        breakpoint: null, // read in requestPendingDuration.js
      },
      requestQueueSize: {
        logOn: false, // read in requestQueueSize.js
        breakpoint: null, // read in requestQueueSize.js
      },
      rate: {
        period: 5000, // how long rate metrics analysis runs; read in calculateRates.js
        frequency: 1000, // how often rate metrics update; read in calculateRates.js
      },
    },
  };

  // run functions to create metrics for instrumentation events
  connect(obj, client, type);
  disconnect(obj, client, type);
  request(obj, type);
  requestQueueSize(obj, type);
  requestTimeout(obj, type);

  if (type === 'consumer') {
    // define consumer-specific variables & methods
    /**
     * Additional metrics for consumer instances
     * @type {object}
     * @example
     * const consumerMetrics = consumer.metrics;
     */
    const consumerMetrics = {
      /**
       * memberId unique to each consumer; reassigned on every connection
       * @type {string}
       * @example
       * consumer.metrics.memberId = your-app-5628039-8524-940e-b739-037aefda3e90
       */
      memberId: null, // set in groupJoin.js, reset in disconnect.js
      /**
       * number of total partitions subscribed to by consumer
       * @type {number}
       * @example
       * consumer.metrics.totalPartitions = 4
       */
      totalPartitions: 0, // updated in groupJoin.js
      /**
       * last consumer heartbeat timestamp (ms)
       * @type {number} ms
       * @example
       * consumer.metrics.lastHeartbeat = 3957103428176
       */
      lastHeartbeat: 0, // updated in heartbeat.js, reset in disconnect.js
      /**
       * last heartbeat duration in ms (time between last heartbeat and most recent heartbeat)
       * @type {number} ms
       * @example
       * consumer.metrics.lastHeartbeatDuration = 4987
       */
      lastHeartbeatDuration: 0, // updated in heartbeat.js, reset in disconnect.js
      /**
       * longest heartbeat duration in ms since last consumer connection
       * @type {number} ms
       * @example
       * consumer.metrics.lastHeartbeatDuration = 5987
       */
      longestHeartbeatDuration: 0, // updated in heartbeat.js, reset in disconnect.js
      /**
       * total number of messages consumed since last consumer connection
       * @type {number}
       * @example
       * consumer.metrics.messagesConsumed = 487
       */
      messagesConsumed: 0, // updated in endBatchProcess.js
      /**
       * most recent end batch process event payload offsetLag
       * @type {number}
       * @example
       * consumer.metrics.offsetLag = 3
       */
      offsetLag: null, // updated in endBatchProcess.js
      /**
       * message consumption rate per specified metrics.options.rate.period value (default: 5000 ms)
       * @type {number}
       * @example
       * consumer.metrics.messageConsumptionRate = 78;
       */
      messageConsumptionRate: null, // updated in calculateRates.js
      /**
       * message consumption rate over consumer lifetime (calculated since initial connection)
       * @type {number}
       * @example
       * consumer.metrics.messageConsumptionRateLifetime = 45
       */
      messageConsumptionRateLifetime: null, // updated in calculateRates.js

      // HEARTBEAT METHODS
      /**
       * turns on logging every heartbeat (off by default)
       * @example
       * consumer.heartbeatLogOn()
       * // => prints log to the console; includes heartbeat event timestamp
       */
      // turns on logging every heartbeat (off by default)
      heartbeatLogOn() {
        obj.metrics.options.heartbeat.logOn = true;
      },
      /**
       * turns off logging every heartbeat
       * @example
       * consumer.heartbeatLogOff()
       */
      // turns off logging every heartbeat
      heartbeatLogOff() {
        obj.metrics.options.heartbeat.logOn = false;
      },
      /**
       * creates heartbeat breakpoint at specified interval (ms)
       * @param {number} bp - breakpoint in milliseconds
       * @example
       * consumer.heartbeatSetBreakpoint(1000)
       * // => prints log to the console when breakpoint is exceeded;
       * // includes ms breakpoint exceeded, heartbeat event payload timestamp, current breakpoint
       */
      // creates heartbeat breakpoint at specified interval (ms)
      heartbeatSetBreakpoint(bp) {
        obj.metrics.options.heartbeat.breakpoint = bp;
      },
      /**
       * cancels existing heartbeat breakpoint
       * @example
       * consumer.heartbeatCancelBreakpoint()
       */
      // cancels existing heartbeat breakpoint
      heartbeatCancelBreakpoint() {
        obj.metrics.options.heartbeat.breakpoint = null;
      },

      // OFFSET LAG METHODS
      /**
       * creates offsetLag breakpoint at specified integer
       * @param {number} bp - breakpoint number
       * @example
       * consumer.offsetLagSetBreakpoint(4)
       * // => prints log to the console when breakpoint is exceeded;
       * // includes event payload offsetLag, amount breakpoint exceeded, current breakpoint
       */
      // creates offsetLag breakpoint at specified integer
      offsetLagSetBreakpoint(bp) {
        obj.metrics.options.offsetLag.breakpoint = bp;
      },
      /**
       * cancels existing offsetLag breakpoint
       * @example
       * consumer.offsetLagCancelBreakpoint()
       */
      // cancels existing offsetLag breakpoint
      offsetLagCancelBreakpoint() {
        obj.metrics.options.offsetLag.breakpoint = null;
      },
    };

    // define consumer-specific options
    const consumerOptions = {
      heartbeat: {
        logOn: false, // read in heartbeat.js
        breakpoint: null, // read in heartbeat.js
      },
      offsetLag: {
        logOn: false, // read in endBatchProcess.js
        breakpoint: null, // read in endBatchProcess.js
      },
    };

    // update consumer object with new metrics and options
    obj.metrics = Object.assign(obj.metrics, consumerMetrics);
    obj.metrics.options = Object.assign(obj.metrics.options, consumerOptions);

    // run consumer-specific instrumentation event generators
    endBatchProcess(obj);
    groupJoin(obj);
    heartbeat(obj);
  }

  // begin calculating rate variables
  calculateRates(obj, type);

  // return updated object
  return obj;
}

module.exports = addMetrics;
