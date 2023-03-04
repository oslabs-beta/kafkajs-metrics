function endBatchProcess(consumer) {
  consumer.on('consumer.end_batch_process', (e) => {
    addMessagesConsumed(consumer, e);
    setOffsetLag(consumer, e);
    sendBreakpointAlert(consumer, e);
    return;
  });
}

// add batchSize to messagesConsumed
function addMessagesConsumed(consumer, e) {
  consumer.metrics.messagesConsumed += e.payload.batchSize;
  return;
}

// update offsetLag to payload's offsetLag
function setOffsetLag(consumer, e) {
  consumer.metrics.offsetLag = Number(e.payload.offsetLag);
  return;
}

// send breakpoint alert if required
function sendBreakpointAlert(consumer) {
  // check if breakpoint exists and if offsetLag is greater than breakpoint value
  if (
    consumer.metrics.options.offsetLag.breakpoint &&
    consumer.metrics.offsetLag > consumer.metrics.options.offsetLag.breakpoint
  ) {
    // send warning, including consumer name if provided
    console.warn(
      `BREAKPOINT ALERT: offsetLag exceeded breakpoint (${
        consumer.metrics.options.offsetLag.breakpoint
      }): current offsetLag is ${consumer.metrics.offsetLag} for consumer ${
        consumer.metrics.name ? consumer.metrics.name + ' ' : ''
      }(member id: ${consumer.metrics.memberId})`
    );
  }
  return;
}

module.exports = endBatchProcess;
