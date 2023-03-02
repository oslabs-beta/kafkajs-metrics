function calculateRate(producer) {
  const startNum = producer.metrics.totalRequests;
  setTimeout(
    (start) => {
      const end = producer.metrics.totalRequests;
      producer.metrics.requestRate = (end - start) / 30;
    },
    30000,
    startNum
  );
}

function requestPendingDuration(producer, e) {
  if (
    producer.metrics.options.requestPendingDuration.logOn &&
    e.payload.apiName === 'OffsetFetch' &&
    e.payload.pendingDuration > 1
  ) {
    //the offsetfetchdata stores the desired data from the request
    const offsetFetchData = {
      APINAME: `${e.payload.apiName}`,
      PENDINGDURATION: `${e.payload.pendingDuration} ms`,
      TIMESTAMP: `${e.timestamp}`,
    };
    // //push the object/data to the array this is will store the current history of latency from offsetfetch
    // consumer.metrics.latencyOffsetFetch.push(offsetFetchData);
    // //check to see if latencyOffsetFetch has more than 10 elements - if so, removes the first element (oldest element)
    // if (consumer.metrics.latencyOffsetFetch.length > 10){
    //   //removes the first element because we always want the first 10 most recent data
    //   consumer.metrics.latencyOffsetFetch.shift();
    // }
    //the developer can turn on or off the function and decide their intervals. if the interval is above the average pending duration alert the user
    console.warn('ALERT: latency warning!'); //, consumer.metrics.latencyOffsetFetch
  }
  if (
    e.payload.pendingDuration >
      producer.metrics.options.requestPendingDuration.breakpoint &&
    producer.metrics.options.requestPendingDuration.breakpoint
  ) {
    if (producer.metrics.name) {
      console.warn(
        `BREAKPOINT ALERT: OffsetFetch latency exceeded for producer ${producer.metrics.name} (member id: ${producer.metrics.memberId}); last 10 OffsetFetch events: ${producer.metrics.latencyOffsetFetch}`
      );
    } else {
      console.warn(
        `BREAKPOINT ALERT: OffsetFetch latency exceeded for producer (member id: ${producer.metrics.memberId}); last 10 OffsetFetch Request events: ${producer.metrics.latencyOffsetFetch}`
      );
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
