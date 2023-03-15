// require in producer/consumer/admin folders
const addMetrics = require('./src');

// Metrics will be added to any consumer/producer/admin instance from this client
function metricize(client, visualize = false, token = false) {
  // if visualize and token have been passed into metricize function, send request to route /token
  if (visualize && token) {
    fetch('http://localhost:3000/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
      })
      .catch((err) => {
        console.log('error in initial redis token: ', err);
      });
  }

  // create client.metrics object for client metrics
  client.metrics = {
    // total number of connected consumers
    totalConsumers: 0, // modified in src/connect.js and src/disconnect.js
    // total number of connected producers
    totalProducers: 0, // modified in src/connect.js and src/disconnect.js
    // total number of connected admins
    totalAdmins: 0, // modified in src/connect.js and src/disconnect.js
    options: {
      visualize,
      token,
      consumerNum: 0, // modified in src/index.js
    },
  };

  // add metrics to consumer constructor
  const vanillaConsumer = client.consumer;
  client.consumer = function wrapConsumer() {
    return addMetrics(
      vanillaConsumer.apply(this, arguments),
      client,
      'consumer'
    );
  };

  // add metrics to producer constructor
  const vanillaProducer = client.producer;
  client.producer = function wrapProducer() {
    return addMetrics(
      vanillaProducer.apply(this, arguments),
      client,
      'producer'
    );
  };

  // add metrics to admin constructor
  const vanillaAdmin = client.admin;
  client.admin = function wrapAdmin() {
    return addMetrics(vanillaAdmin.apply(this, arguments), client, 'admin');
  };
}

module.exports = { metricize };
