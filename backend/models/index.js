const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const basename = path.basename(module.filename);
const colors = require('colors');

dotenv.config();

const db = {};

const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
  // )
);
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  console.log('Model name :'.cyan.underline, modelName.green.underline);
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Test DB
sequelize
  .authenticate()
  .then(() =>
    console.log(
      `Connected to Database : ${process.env.PG_DATABASE} `.blue.underline
    )
  )
  .catch((err) => console.error(err.message.red.underline.bold));

// //Models/tables
db.Movie = require('../models/Movie')(sequelize, Sequelize);
db.Genere = require('../models/Genere')(sequelize, Sequelize);
db.Country = require('../models/Country')(sequelize, Sequelize);
db.Language = require('../models/Language')(sequelize, Sequelize);
db.Cast = require('../models/Cast')(sequelize, Sequelize);
db.Gender = require('../models/Gender')(sequelize, Sequelize);

// //Model relationships

db.Movie.belongsToMany(db.Genere, { through: 'GenereMovies' });
db.Genere.belongsToMany(db.Movie, { through: 'GenereMovies' });

db.Movie.belongsToMany(db.Country, { through: 'CountryMovies' });
db.Country.belongsToMany(db.Movie, { through: 'CountryMovies' });

db.Movie.belongsToMany(db.Language, { through: 'LanguageMovies' });
db.Language.belongsToMany(db.Movie, { through: 'LanguageMovies' });

db.Movie.belongsToMany(db.Cast, { through: 'CastMovies' });
db.Cast.belongsToMany(db.Movie, { through: 'CastMovies' });

// db.Gender.hasMany(db.Cast, { foreignKey: 'genderId' });
// db.Cast.belongsTo(db.Gender, { foreignKey: 'genderId' });

module.exports = db;
