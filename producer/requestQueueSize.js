//helps monitor the progress of queue size and helps alert the user if its above a certain size 
function requestQueueSize(producer) {
  //when the event is being emitted this function will be invoked
  producer.on('producer.network.request_queue_size', (e) => {
    //1 is happy medium anything higher can cause increase of memory usage and latency so only run when the queue size is larger than 5
    if (producer.metrics.options.requestQueueSize.logOn && e.payload.queueSize > 5) {
      //producer.metrics.currentQueueSizeHistory.push(e.payload.queueSize);
      console.warn(`ALERT: Current requestQueueSize is : ${e.payload.queueSize}`);
      //alerts the user regarding their queuesize and shows latest history
    }
    if (e.payload.queueSize > producer.metrics.options.requestQueueSize.breakpoint && producer.metrics.options.requestQueueSize.breakpoint) {
      console.warn(`ALERT: WARNING The requestQueueSize is above ${producer.metrics.options.requestQueueSize.breakpoint}! Current requestQueueSize is : ${e.payload.queueSize} `);//, 'current queue size history ->', producer.metrics.currentQueueSizeHistory
    }
  });
}


module.exports = requestQueueSize;