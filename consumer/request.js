function calculateRate(consumer) {
  const startNum = consumer.metrics.totalRequests;
  setTimeout((start) => {
    const end = consumer.metrics.totalRequests;
    consumer.metrics.requestRate = (end - start) / 30;
  }, 30000, startNum);
}

function requestPendingDuration(consumer, e){
  //check to see if the pending duration is above the average latency and only check for the offsetfetch there was only persistant data on offsetfetch maybe include future api names
  //if pending duration should also be 0. which means there is no latency anything above 0 has latency
  if (consumer.metrics.options.requestPendingDuration.logOn && e.payload.apiName !== 'OffsetFetch' && e.payload.pendingDuration > 1) {
    console.warn(`ALERT: latency warning in ${e.payload.apiName}!`);
  }

  if (e.payload.pendingDuration > consumer.metrics.options.requestPendingDuration.breakpoint && consumer.metrics.options.requestPendingDuration.breakpoint) {
    //the developer can turn on or off the function and decide their intervals. if the interval is above the average pending duration alert the user
    console.warn(`ALERT: WARNING The requestPendingDuration is above ${consumer.metrics.options.requestPendingDuration.breakpoint} in ${e.payload.apiName}`);
  }

  if (e.payload.apiName === 'OffsetFetch') {
    //the offsetfetchdata stores the desired data from the request 
    const offsetFetchData = {
      "APINAME": `${e.payload.apiName}`,  
      "PENDINGDURATION": `${e.payload.pendingDuration} ms`,
      "TIMESTAMP": `${e.timestamp}`    
    }
    // push the object/data to the array this is will store the current history of latency from offsetfetch
    consumer.metrics.latencyOffsetFetch.push(offsetFetchData);
    // check to see if latencyOffsetFetch has more than 10 elements - if so, removes the first element (oldest element)
    if (consumer.metrics.latencyOffsetFetch.length > 10){
      // removes the first element because we always want the first 10 most recent data
      consumer.metrics.latencyOffsetFetch.shift();
    }
  }
}

function requestEvents(consumer) {
  consumer.on('consumer.network.request', (e) => {
    consumer.metrics.totalRequests += 1;
    requestPendingDuration(consumer, e);

  });

  calculateRate(consumer);

  setInterval(calculateRate, 60000, consumer);
}



module.exports = { requestEvents };
