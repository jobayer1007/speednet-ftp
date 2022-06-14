const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');

dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

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
