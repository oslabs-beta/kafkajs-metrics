//helps monitor the progress of queue size and helps alert the user if its above a certain size monitoring this helps devlopers identify any bottlenecks or capiacity planning
function requestQueueSize(producer) {
    //  methods are created in the requestPendingDuration
  //turns on requestQueueSize  
  producer.metrics.requestQueueSizelogOn = function () {
    producer.metrics.options.requestQueueSize.logOn = true;
    return;
  };
  //creates a breakpoint at the input interval 
  producer.metrics.requestQueueSizeBreakpoint = function (interval) {
    producer.metrics.options.requestQueueSize.breakpoint = interval;
    return;
  }
  // ends a previously-input breakpoint at the inputted interval
  producer.metrics.requestQueueSizeBreakpointOff = function () {
    producer.metrics.options.requestQueueSize.breakpoint = null;
    return;
  };
  //stores the presistant data into an array i want the user to get current history data
  producer.metrics.currentQueueSizeHistory = [];
  
  //when the event is being emitted this function will be invoked
  producer.on('producer.network.request_queue_size', (e) => {
    //1 is happy medium anything higher can cause increase of memory usage and latency so only run when the queue size is larger than 5
    if(e.payload.queueSize > 5) {
      currentQueueSizeHistory.push(e.payload.queueSize);
      console.log(`Current requestQueueSize is : ${e.payload.queueSize}`);
      //alerts the user regarding their queuesize and shows latest history
      if(producer.metrics.requestQueueSize.logOn && e.payload.queueSize > consumer.metrics.options.requestPendingDuration.breakpoint)
      console.log(`ALERT: WARNING The requestQueueSize is above 5! Current requestQueueSize is : ${e.payload.queueSize} `, 'current queue size history ->', currentQueueSizeHistory);
    }
  });
}

module.exports = requestQueueSize;