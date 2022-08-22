// require('./cron-man/cronMan');

const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const colors = require('colors');

const { sequelize } = require('./models/index');
const models = require('../backend/models/index');

const morgan = require('morgan');

const SERVER_CONFIGS = require('./constants/server');

const configureServer = require('./server');

dotenv.config();

const app = express();
configureServer(app);

// const syncStatus = false;

// sequelize
//   .sync({
//     force: syncStatus,
//     alter: true,
//   })
//   .then(() => {
//     //   //if  (syncStatus) {
//     //   //defaultValueManager.Generate(syncStatus);
//     //   // }

//     console.log('initial synced'.yellow.inverse);
//   })
//   .catch((err) => console.log(err));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(path.resolve(), '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(path.resolve(), 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running.....');
  });
}

// app.use(notFound);

// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const time = new Date();
app.listen(
  PORT,
  console.log(
    `Server runing in ${process.env.NODE_ENV} mode ${time}  on port ${PORT}`
      .green.bold.underline
  )
);
