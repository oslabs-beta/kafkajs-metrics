function endBatchProcess(consumer) {
  const { metrics } = consumer;
  // each time end_batch_process fires:
  consumer.on('consumer.end_batch_process', (e) => {
    // add payload.batchSize to metrics.messagesConsumed
    metrics.messagesConsumed += e.payload.batchSize;
    // change metrics.offsetLag to payload.offsetLag
    metrics.offsetLag = e.payload.offsetLag;
    if (
      metrics.options.offsetLagBreakpoint > -1 &&
      metrics.offsetLag > metrics.options.offsetLagBreakpoint
    ) {
      console.warn(
        `offsetLag for consumer '${Object.keys({ consumer })[0]}' (member id: ${
          consumer.metrics.memberId
        }) exceeded ${
          metrics.options.offsetLagBreakpoint
        }ms: current offsetLag is ${metrics.offsetLag}ms`
      );
    }
  });
}

module.exports = endBatchProcess;
