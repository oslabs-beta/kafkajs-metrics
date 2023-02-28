//help monitor the progress of the cosumed message, checks to see if there is any latency
function requestPendingDuration(producer) {
    //  methods are created in the requestPendingDuration
    //turns on requestPendingDuration  
    producer.metrics.requestPendingDurationlogOn = function () {
      producer.metrics.options.requestPendingDuration.logOn = true;
      return;
    };
    //creates a breakpoint at the input interval 
    producer.metrics.requestPendingDurationBreakpoint = function (interval) {
      producer.metrics.options.requestPendingDuration.breakpoint = interval;
      return;
    }
    // ends a previously-input breakpoint at the inputted interval
    producer.metrics.requestPendingDurationBreakpointOff = function () {
      producer.metrics.options.requestPendingDuration.breakpoint = null;
      return;
    };
    //stores the presistant data into an array
    producer.metrics.latencyOffsetFetch = [];
  
    //initializes evnt emitter for requestPendingDuration
    producer.on('producer.network.request', (e) => {
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
        producer.metrics.latencyOffsetFetch.push(offsetFetchData);
        //check to see if latencyOffsetFetch has more than 10 elements - if so, removes the first element (oldest element)
        if (latencyOffsetFetch.length > 10){
          //removes the first element because we always want the first 10 most recent data
          latencyOffsetFetch.shift();
        }
        //the developer can turn on or off the function and decide their intervals. if the interval is above the average pending duration alert the user
        if(producer.metrics.options.requestPendingDuration.logOn && e.payload.pendingDuration > producer.metrics.options.requestPendingDuration.breakpoint){
          console.log('ALERT: latency warning!', latencyOffsetFetch);
        }
      }
    });
  }
  
  module.exports = requestPendingDuration;