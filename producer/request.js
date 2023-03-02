function calculateRate(producer) {
  const startNum = producer.metrics.totalRequests;
  setTimeout((start) => {
    const end = producer.metrics.totalRequests;
    producer.metrics.requestRate = (end - start) / 30;
  }, 30000, startNum);
}

function requestPendingDuration(producer, e){
  //check to see if the pending duration is above the average latency and only check for the offsetfetch there was only persistant data on offsetfetch maybe include future api names
  //if pending duration should also be 0. which means there is no latency anything above 0 has latency
  if (producer.metrics.options.requestPendingDuration.logOn && e.payload.apiName !== 'OffsetFetch' && e.payload.pendingDuration > 1) {
    console.warn(`ALERT: latency warning in ${e.payload.apiName}!`);
  }

  if (e.payload.pendingDuration > producer.metrics.options.requestPendingDuration.breakpoint && producer.metrics.options.requestPendingDuration.breakpoint) {
    //the developer can turn on or off the function and decide their intervals. if the interval is above the average pending duration alert the user
    console.warn(`ALERT: WARNING The requestPendingDuration is above ${producer.metrics.options.requestPendingDuration.breakpoint} in ${e.payload.apiName}`);
  }

  if (e.payload.apiName === 'OffsetFetch') {
    //the offsetfetchdata stores the desired data from the request 
    const offsetFetchData = {
      "APINAME": `${e.payload.apiName}`,  
      "PENDINGDURATION": `${e.payload.pendingDuration} ms`,
      "TIMESTAMP": `${e.timestamp}`    
    }
    // push the object/data to the array this is will store the current history of latency from offsetfetch
    producer.metrics.latencyOffsetFetch.push(offsetFetchData);
    // check to see if latencyOffsetFetch has more than 10 elements - if so, removes the first element (oldest element)
    if (producer.metrics.latencyOffsetFetch.length > 10){
      // removes the first element because we always want the first 10 most recent data
      producer.metrics.latencyOffsetFetch.shift();
    }
  }
}

function requestEvents(producer) {

  producer.on('producer.network.request', (e) => {
    producer.metrics.totalRequests += 1;
    requestPendingDuration(producer, e);
  });

  calculateRate(producer);

  setInterval(calculateRate, 60000, producer);
}

module.exports = { requestEvents };
