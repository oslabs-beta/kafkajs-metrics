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
      metrics.offsetLag >= metrics.options.offsetLagBreakpoint
    ) {
      // if consumer name has been assigned, include it in console log
      if (metrics.name) {
        console.warn(
          `BREAKPOINT ALERT: offsetLag breakpoint exceeded ${metrics.options.offsetLagBreakpoint}ms: current offsetLag is ${metrics.offsetLag}ms for consumer ${metrics.name} (member id: ${metrics.memberId})`
        );
      } else {
        console.warn(
          `BREAKPOINT ALERT: offsetLag breakpoint exceeded ${metrics.options.offsetLagBreakpoint}ms: current offsetLag is ${metrics.offsetLag}ms for consumer (member id: ${metrics.memberId})`
        );
      }
    }
  });
}

module.exports = endBatchProcess;
