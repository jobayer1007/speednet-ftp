// require('./cron-man/cronMan');

const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const colors = require('colors');

const { sequelize } = require('./models/index');

const userRoutes = require('./routes/userRoutes');
const mainMenuRoutes = require('./routes/mainMenuRoutes');
const subMenuRoutes = require('./routes/subMenuRoutes');
const subMenuL1Routes = require('./routes/subMenuL1Routes');
const movieRoutes = require('./routes/movieRoutes');

const morgan = require('morgan');

dotenv.config();

const app = express();

// ///////// SERVER SYNC BLOCK ///////////////
// const syncStatus = true;

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

// ///////// SERVER SYNC BLOCK ///////////////

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/menu', mainMenuRoutes);
app.use('/api/sub', subMenuRoutes);
app.use('/api/sl1', subMenuL1Routes);
app.use('/api/movie', movieRoutes);

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
