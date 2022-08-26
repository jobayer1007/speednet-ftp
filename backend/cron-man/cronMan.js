const scheduler = require('./scheduler/scheduler');

const test = require('./cron-jobs/test');
const genereList = require('./cron-jobs/genereList');

scheduler(60000 * 3, test);
// 1 Min = 60000 MiliSeconds
// 30 Min = 60000 * 30
// 1 Hour = 60000 * 60
// 1 day = 60000 * 60 * 24
