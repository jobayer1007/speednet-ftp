const scheduler = (timer, action) => {
  setInterval(action, timer);
};

process.nextTick(() => scheduler);

module.exports = scheduler;
