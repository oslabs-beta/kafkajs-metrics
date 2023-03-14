const { connect } = require('./eventMetrics/connect');
const { disconnect } = require('./eventMetrics/disconnect');
const endBatchProcess = require('./eventMetrics/endBatchProcess');
const { groupJoin } = require('./eventMetrics/groupJoin');
const { heartbeatOn } = require('./eventMetrics/heartbeat');
const request = require('./eventMetrics/request');
const requestQueueSize = require('./eventMetrics/requestQueueSize');
const requestTimeout = require('./eventMetrics/requestTimeout');
const calculateRates = require('./periodicMetrics/calculateRates');

function addMetrics(obj, client, type) {
  /**
   * Consumer/Producer/Admin Metrics Object:
   *
   * Includes most recently calculated metrics and methods for consumer/producer/admin instances
   * @type {object}
   * @example
   * const consumerMetricsObject = consumer.metrics;
   * const producerMetricsObject = producer.metrics;
   * const adminMetricsObject = admin.metrics;
   */
  obj.metrics = {
    // VARIABLES
    /**
     * Optional name for consumer/producer/admin, set by user
     * @type {string}
     * @example
     * consumer.metrics.name = 'consumer_1'
     */
    name: '', // set by user, used in various console logs
    /**
     * Boolean value to indicate if consumer/producer/admin is connected
     * @type {boolean}
     * @example
     * console.log(producer.metrics.isConnected);
     * // => prints to the console: false
     */
    isConnected: false, // set in connect.js, reset in disconnect.js
    /**
     * Timestamp value (ms) indicating initial consumer/producer/admin connection
     * @type {number}
     * @example
     * console.log(consumer.metrics.initialConnectionTimestamp);
     * // => prints to the console: 3957103428176
     */
    initialConnectionTimestamp: null, // updated in connect.js
    /**
     * Timestamp value (ms) to indicating most recent consumer/producer/admin connection
     * @type {number}
     * @example
     * console.log(admin.metrics.currentConnectionTimestamp);
     * // => prints to the console: 3957103429678
     */
    currentConnectionTimestamp: null, // updated in connect.js, reset in disconnect.js
    /**
     * Total number of requests
     * @type {number}
     * @example
     * console.log(producer.metrics.totalRequests);
     * // => prints to the console: 78
     */
    totalRequests: 0, // updated in request.js
    /**
     * Total number of request timeouts
     * @type {number}
     * @example
     * console.log(consumer.metrics.totalRequestTimeouts);
     * // => prints to the console: 6
     */
    totalRequestTimeouts: 0, // updated in requestTimeout.js
    /**
     * Request rate per specified metrics.options.rate.period value (default is 5000 ms)
     * @type {number}
     * @example
     * console.log(consumer.metrics.requestRate);
     * // => prints to the console: 78
     */
    requestRate: null, // updated in calculateRates.js
    /**
     * Request rate over consumer/producer/admin lifetime (calculated since initial connection)
     * @type {number}
     * @example
     * console.log(consumer.metrics.requestRateLifetime);
     * // => prints to the console: 43
     */
    requestRateLifetime: null, // updated in calculateRates.js
    /**
     * Timeout rate per specified metrics.options.rate.period value (default is 5000 ms)
     * @type {number}
     * @example
     * console.log(producer.metrics.timeoutRate);
     * // => prints to the console: 2
     */
    timeoutRate: null, // updated in calculateRates.js
    /**
     * Timeout rate over consumer/producer/admin lifetime (calculated since initial connection)
     * @type {number}
     * @example
     * console.log(admin.metrics.timeoutRateLifetime);
     * // => prints to the console: 4
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
     * producer.ageSinceLastConnection() // => 843
     */

    ageSinceLastConnection() {
      return obj.metrics.currentConnectionTimestamp
        ? new Date().getTime() - obj.metrics.currentConnectionTimestamp
        : null;
    },

    // REQUEST PENDING DURATION METHODS
    /**
     * Turns on logging pendingDuration for every request (off by default)
     * @example
     * consumer.requestPendingDurationLogOn()
     * // => prints log to the console; includes event payload apiName, pendingDuration
     */
    requestPendingDurationLogOn() {
      obj.metrics.options.requestPendingDuration.logOn = true;
    },
    /**
     * Turns off logging pendingDuration for every request
     * @example
     * producer.requestPendingDurationLogOff()
     */
    requestPendingDurationLogOff() {
      obj.metrics.options.requestPendingDuration.logOn = false;
    },
    /**
     * Creates request pendingDuration breakpoint at specified interval (ms)
     * @param {number} bp - breakpoint in milliseconds
     * @example
     * producer.requestPendingDurationSetBreakpoint(20)
     * // => prints log to the console when breakpoint is exceeded;
     * //includes event payload apiName, pendingDuration, ms breakpoint exceeded, current breakpoint
     */
    requestPendingDurationSetBreakpoint(bp) {
      obj.metrics.options.requestPendingDuration.breakpoint = bp;
    },
    /**
     * Cancels existing request pendingDuration breakpoint
     * @example
     * producer.requestPendingDurationCancelBreakpoint()
     */
    requestPendingDurationCancelBreakpoint() {
      obj.metrics.options.requestPendingDuration.breakpoint = null;
    },

    // REQUEST QUEUE SIZE METHODS
    /**
     * Turns on logging requestQueueSize for every request (off by default)
     * @example
     * consumer.requestQueueSizeLogOn()
     * // => prints log to the console; includes event payload queueSize
     */
    requestQueueSizeLogOn() {
      obj.metrics.options.requestQueueSize.logOn = true;
    },
    /**
     * Turns off logging requestQueueSize for every request
     * @example
     * consumer.requestQueueSizeLogOff()
     */
    requestQueueSizeLogOff() {
      obj.metrics.options.requestQueueSize.logOn = false;
    },
    /**
     * Creates request queueSize breakpoint at specified size
     * @param {number} bp - breakpoint (queueSize number)
     * @example
     * producer.requestQueueSizeSetBreakpoint(3)
     * // => prints log to the console when breakpoint is exceeded;
     * // includes event payload queueSize, amount breakpoint exceeded, current breakpoint
     */
    requestQueueSizeSetBreakpoint(bp) {
      obj.metrics.options.requestQueueSize.breakpoint = bp;
    },
    /**
     * Cancels existing request queueSize breakpoint
     * @example
     * producer.requestQueueSizeCancelBreakpoint()
     */
    requestQueueSizeCancelBreakpoint() {
      obj.metrics.options.requestQueueSize.breakpoint = null;
    },

    // RATE INTERVAL METHODS
    /**
     * Updates frequency (ms) at which rate metrics should be calculated (default is 1000ms)
     * @param {number} t - frequency in ms
     * @example
     * producer.setRateFrequency(300);
     */
    setRateFrequency(t) {
      obj.metrics.options.rate.frequency = t;
    },
    /**
     * Updates period (ms) that rate metrics should use to calculate averages (default is 5000ms)
     * @param {number} t - period in ms
     * @example
     * producer.setRatePeriod(3000);
     */
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
       * console.log(consumer.metrics.memberId);
       * // => prints to the console: your-app-5628039-8524-940e-b739-037aefda3e90
       */
      memberId: null, // set in groupJoin.js, reset in disconnect.js
      /**
       * Number of total partitions subscribed to by consumer
       * @type {number}
       * @example
       * console.log(consumer.metrics.totalPartitions);
       * // => prints to the console: 3
       */
      totalPartitions: 0, // updated in groupJoin.js
      /**
       * Last consumer heartbeat timestamp (ms)
       * @type {number} ms
       * @example
       * console.log(consumer.metrics.lastHeartbeat);
       * // => prints to the console: 3957103428176
       */
      lastHeartbeat: 0, // updated in heartbeat.js, reset in disconnect.js
      /**
       * Last heartbeat duration in ms (time between last heartbeat and current heartbeat)
       * @type {number} ms
       * @example
       * console.log(consumer.metrics.lastHeartbeatDuration);
       * // => prints to the console: 4987
       */
      lastHeartbeatDuration: 0, // updated in heartbeat.js, reset in disconnect.js
      /**
       * Longest heartbeat duration in ms since last consumer connection
       * @type {number} ms
       * @example
       * console.log(consumer.metrics.longestHeartbeatDuration);
       * // => prints to the console: 5987
       */
      longestHeartbeatDuration: 0, // updated in heartbeat.js, reset in disconnect.js
      /**
       * Total number of messages consumed since last consumer connection
       * @type {number}
       * @example
       * console.log(consumer.metrics.messagesConsumed);
       * // => prints to the console: 487
       */
      messagesConsumed: 0, // updated in endBatchProcess.js
      /**
       * Most recent end batch process offsetLag
       * @type {number}
       * @example
       * console.log(consumer.metrics.offsetLag);
       * // => prints to the console: 3
       */
      offsetLag: null, // updated in endBatchProcess.js
      /**
       * Message consumption rate per specified metrics.options.rate.period value (default: 5000 ms)
       * @type {number}
       * @example
       * console.log(consumer.metrics.messageConsumptionRate);
       * // => prints to the console: 78
       */
      messageConsumptionRate: null, // updated in calculateRates.js
      /**
       * Message consumption rate over consumer lifetime (calculated since initial connection)
       * @type {number}
       * @example
       * console.log(consumer.metrics.messageConsumptionRateLifetime);
       * // => prints to the console: 45
       */
      messageConsumptionRateLifetime: null, // updated in calculateRates.js

      // HEARTBEAT METHODS
      /**
       * Turns on logging every heartbeat (off by default)
       * @example
       * consumer.heartbeatLogOn()
       * // => prints log to the console; includes heartbeat event timestamp
       */
      heartbeatLogOn() {
        obj.metrics.options.heartbeat.logOn = true;
      },
      /**
       * Turns off logging every heartbeat
       * @example
       * consumer.heartbeatLogOff()
       */
      heartbeatLogOff() {
        obj.metrics.options.heartbeat.logOn = false;
      },
      /**
       * Creates heartbeat breakpoint at specified interval (ms)
       * @param {number} bp - breakpoint in milliseconds
       * @example
       * consumer.heartbeatSetBreakpoint(1000)
       * // => prints log to the console when breakpoint is exceeded;
       * // includes ms breakpoint exceeded, heartbeat event payload timestamp, current breakpoint
       */
      heartbeatSetBreakpoint(bp) {
        obj.metrics.options.heartbeat.breakpoint = bp;
      },
      /**
       * Cancels existing heartbeat breakpoint
       * @example
       * consumer.heartbeatCancelBreakpoint()
       */
      heartbeatCancelBreakpoint() {
        obj.metrics.options.heartbeat.breakpoint = null;
      },

      // OFFSET LAG METHODS
      /**
       * Creates offsetLag breakpoint at specified integer
       * @param {number} bp - breakpoint number
       * @example
       * consumer.offsetLagSetBreakpoint(4)
       * // => prints log to the console when breakpoint is exceeded;
       * // includes event payload offsetLag, amount breakpoint exceeded, current breakpoint
       */
      offsetLagSetBreakpoint(bp) {
        obj.metrics.options.offsetLag.breakpoint = bp;
      },
      /**
       * Cancels existing offsetLag breakpoint
       * @example
       * consumer.offsetLagCancelBreakpoint()
       */
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
    heartbeatOn(obj);
  }

  // begin calculating rate variables
  calculateRates(obj, type);

  // return updated object
  return obj;
}

module.exports = addMetrics;
