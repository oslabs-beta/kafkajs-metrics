function calculateRates(obj, type) {
  calculateRequestRate(obj);
  calculateTimeoutRate(obj);
  if (type === 'consumer') calculateConsumptionRate(obj);

  // setTimeout to calculate rates again at specified frequency
  // avoiding setInterval to be more responsive to user changing frequency option
  setTimeout(() => {
    calculateRates(obj, type);
  }, obj.metrics.options.rate.frequency);
}

// after X ms, calculates requests/second over the previous (X/1000) seconds
// X is the obj.metrics.options.rate.period property
function calculateRequestRate(obj) {
  // save current number of total requests to pass into setTimeout
  const current = obj.metrics.totalRequests;
  // calculate lifetime rate:
  const age = obj.metrics.ageSinceInitialConnection();
  if (age) {
    obj.metrics.requestRateLifetime = current / (age / 1000);
  }
  // after X ms, calculate difference and divide by X/1000 to update requestRate
  setTimeout(
    (start) => {
      const end = obj.metrics.totalRequests;
      obj.metrics.requestRate =
        (end - start) / (obj.metrics.options.rate.period / 1000);
    },
    obj.metrics.options.rate.period,
    current
  );
}

// after X ms, calculates the number of request timeouts/second over the previous (X/1000) seconds
// X is the obj.metrics.options.rate.period property
function calculateTimeoutRate(obj) {
  // save current number of total timeouts to pass into setTimeout
  const current = obj.metrics.totalRequestTimeouts;
  // calculate lifetime rate:
  const age = obj.metrics.ageSinceInitialConnection();
  if (age) {
    obj.metrics.timeoutRateLifetime = current / (age / 1000);
  }
  // after X ms, calculate difference and divide by (X/1000) to update timeoutRate
  setTimeout(
    (start) => {
      const end = obj.metrics.totalRequestTimeouts;
      obj.metrics.timeoutRate =
        (end - start) / (obj.metrics.options.rate.period / 1000);
    },
    obj.metrics.options.rate.period,
    current
  );
}

// after X ms, calculates messages consumed per second over the previous (X/1000) seconds
// X is the obj.metrics.options.rate.period property
function calculateConsumptionRate(consumer) {
  // save current number of total messages consumed to pass into setTimeout
  const current = consumer.metrics.messagesConsumed;
  // calculate lifetime rate:
  const age = consumer.metrics.ageSinceInitialConnection();
  if (age) {
    consumer.metrics.messageConsumptionRateLifetime = current / (age / 1000);
  }
  // after X ms, calculate difference and divide by X/1000 to update messageConsumptionRate
  setTimeout(
    (start) => {
      const end = consumer.metrics.messagesConsumed;
      consumer.metrics.messageConsumptionRate =
        (end - start) / (consumer.metrics.options.rate.period / 1000);
    },
    consumer.metrics.options.rate.period,
    current
  );
}

module.exports = calculateRates;
