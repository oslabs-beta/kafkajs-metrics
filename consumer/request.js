function calculateRate(consumer) {
  const startNum = consumer.metrics.totalRequests;
  setTimeout((start) => {
    const end = consumer.metrics.totalRequests;
    consumer.metrics.requestRate = (end - start) / 30;
  }, 30000, startNum);
}

function requestPendingDuration(consumer){
  //check to see if the pending duration is above the average latency and only check for the offsetfetch there was only persistant data on offsetfetch maybe include future api names
  //if pending duration should also be 0. which means there is no latency anything above 0 has latency
  if (e.payload.pendingDuration > 1 && e.payload.apiName === 'OffsetFetch') {
    //the offsetfetchdata stores the desired data from the request 
    const offsetFetchData = {
      "APINAME": `${e.payload.apiName}`,  
      "PENDINGDURATION": `${e.payload.pendingDuration} ms`,
      "TIMESTAMP": `${e.timestamp}`    
    }
    //push the object/data to the array this is will store the current history of latency from offsetfetch
    consumer.metrics.latencyOffsetFetch.push(offsetFetchData);
    //check to see if latencyOffsetFetch has more than 10 elements - if so, removes the first element (oldest element)
    if (latencyOffsetFetch.length > 10){
      //removes the first element because we always want the first 10 most recent data
      latencyOffsetFetch.shift();
    }
      //the developer can turn on or off the function and decide their intervals. if the interval is above the average pending duration alert the user
    if(consumer.metrics.options.requestPendingDuration.logOn && e.payload.pendingDuration > consumer.metrics.options.requestPendingDuration.breakpoint){
      console.log('ALERT: latency warning!', latencyOffsetFetch);
    }
  }
}

function totalRequests(consumer) {
  consumer.metrics.totalRequests = 0;
  consumer.metrics.requestRate = 0;

  consumer.on(`${consumer}.request`, () => {
    consumer.metrics.totalRequests += 1;
    requestPendingDuration(consumer);
  });

  calculateRate(consumer);

  setInterval(calculateRate, 60000, consumer);
}



module.exports = { totalRequests };