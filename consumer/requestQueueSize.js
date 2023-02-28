//helps monitor the progress of queue size and helps alert the user if its above a certain size 
function requestQueueSize(consumer) {
  //when the event is being emitted this function will be invoked
  consumer.on('consumer.network.request_queue_size', (e) => {
    //1 is happy medium anything higher can cause increase of memory usage and latency so only run when the queue size is larger than 5
    if(e.payload.queueSize > 5) {
      currentQueueSizeHistory.push(e.payload.queueSize);
      console.log(`Current requestQueueSize is : ${e.payload.queueSize}`);
      //alerts the user regarding their queuesize and shows latest history
      if(consumer.metrics.requestQueueSize.logOn && e.payload.queueSize > consumer.metrics.options.requestPendingDuration.breakpoint)
      console.log(`ALERT: WARNING The requestQueueSize is above 5! Current requestQueueSize is : ${e.payload.queueSize} `, 'current queue size history ->', currentQueueSizeHistory);
    }
  });
}

module.exports = requestQueueSize;