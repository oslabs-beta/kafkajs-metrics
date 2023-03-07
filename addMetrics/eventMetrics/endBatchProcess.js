function endBatchProcess(consumer) {
  consumer.on('consumer.end_batch_process', (e) => {
    addMessagesConsumed(consumer, e);
    setOffsetLag(consumer, e);
    sendBreakpointAlert(consumer, e);
  });
}

// add batchSize to messagesConsumed
function addMessagesConsumed(consumer, e) {
  consumer.metrics.messagesConsumed += e.payload.batchSize;
}

// update offsetLag to payload's offsetLag
function setOffsetLag(consumer, e) {
  consumer.metrics.offsetLag = Number(e.payload.offsetLag);
}

// send breakpoint alert if required
function sendBreakpointAlert(consumer) {
  // check if breakpoint exists and if offsetLag is greater than breakpoint value
  if (
    consumer.metrics.options.offsetLag.breakpoint &&
    consumer.metrics.offsetLag > consumer.metrics.options.offsetLag.breakpoint
  ) {
    console.warn(
      `BREAKPOINT ALERT: offsetLag breakpoint exceeded by ${
        consumer.metrics.offsetLag -
        consumer.metrics.options.offsetLag.breakpoint
      } for consumer ${consumer.metrics.name} (member id: ${
        consumer.metrics.memberId
      }).\nCurrent offsetLag is ${consumer.metrics.offsetLag}, breakpoint is ${
        consumer.metrics.options.offsetLag.breakpoint
      }`
    );
  }
}

module.exports = endBatchProcess;
