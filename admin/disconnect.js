function disconnect(admin, client) {
  admin.on('admin.disconnect', () => {
    trackAdminDisconnects(admin, client);
    resetCurrentConnectionTimestamp(admin);
  });
}

// updates isConnected for admin and totalAdmins for client on admin disconnect
function trackAdminDisconnects(admin, client) {
  if (admin.metrics.isConnected === true) {
    client.metrics.totalAdmins -= 1;
    admin.metrics.isConnected = false;
  }
}

// resets admin currentConnectionTimestamp to null on disconnect
function resetCurrentConnectionTimestamp(admin) {
  admin.metrics.currentConnectionTimestamp = null;
}

module.exports = disconnect;
