function endBatchProcess(consumer) {
  // create messagesConsumed property
  consumer.metrics.messagesConsumed = 0;
  // create offsetLag property
  consumer.metrics.offsetLag = null;
  // each time end_batch_process fires:
  consumer.on('consumer.end_batch_process', (e) => {
    console.log('in event emitter');
    // add payload.batchSize to metrics.messagesConsumed
    consumer.metrics.messagesConsumed += e.payload.batchSize;
    // change metrics.offsetLag to payload.offsetLag
    consumer.metrics.offsetLag = e.payload.offsetLag;
  });
}

module.exports = endBatchProcess;
