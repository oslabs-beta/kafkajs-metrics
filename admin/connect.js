function connect(admin, client) {
  admin.on('admin.connect', (e) => {
    trackAdminConnects(admin, client);
    setInitialConnectionTimestamp(admin, e);
    setCurrentConnectionTimestamp(admin, e);
  });
}

// if isConnected is false, set to true and increment totalPonsumers on client
function trackAdminConnects(admin, client) {
  if (admin.metrics.isConnected === false) {
    client.metrics.totalAdmins += 1;
    admin.metrics.isConnected = true;
  }
}

// if initialConnectionTimestamp is null, set equal to connect event's timestamp
function setInitialConnectionTimestamp(admin, e) {
  if (!admin.metrics.initialConnectionTimestamp) {
    admin.metrics.initialConnectionTimestamp = e.timestamp;
  }
}

// set currentConnectionTimestamp equal to connect event's timestamp
function setCurrentConnectionTimestamp(admin, e) {
  admin.metrics.currentConnectionTimestamp = e.timestamp;
}

module.exports = connect;
