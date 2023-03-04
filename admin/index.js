const connect = require('./connect');
const disconnect = require('./disconnect');

function metricizeAdmin(admin, client) {
  // create empty metrics property on admin
  admin.metrics = {
    isConnected: false, // modified in connect.js and disconnect.js
  };
  // run functions to create metrics for admin instrumentation events
  connect(admin, client);
  disconnect(admin, client);
  return admin;
}

module.exports = metricizeAdmin;
