const axios = require('axios');

const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');

const dotenv = require('dotenv');

dotenv.config();

const asyncHandler = require('express-async-handler');
const models = require('../../models/index');
const apiConfig = require('../../api/apiConfig');
const { Genere, Country, Language, Cast } = require('../../models/index');
// const { generateId } = require('../../utils/generateId');
// const { deleteDonationType } = require('../../controllers/chapterController');
// const { sendAdminNotificationEmail } = require('../../controllers/mailer');
// const { getEmailById } = require('../../controllers/emailController');

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
);

const test = asyncHandler(async (req, res) => {
  // const orders = await models.Order.findAll({});
  console.log('Starting cronjob----------------------------------------------');
  // let adminEmails = [];
  // const admins = await models.User.findAll({
  //   where: { userRole: 'admin' },
  //   attributes: ['email'],
  // });
  // // console.log(admins);
  // for (let i = 0; i < admins.length; i++) {
  //   adminEmails.push(admins[i].email);
  // }
  // console.log(adminEmails);
  // const testbcc = ['jobayer1007@gmail.com', 'test.jobayer@gmail.com'];

  // await sendAdminNotificationEmail({
  //   fromAdmin: 'test1.jobayer@gmail.com',
  //   pass: '1007Jobayer',
  //   toUserEmail: testbcc,
  //   toUser: 'Jobayer',
  //   hash: 'pendingUserRegister.pendingId',
  //   domain: 'checkChapter',
  // });

  //joining path of directory
  const __dirname = path.resolve();
  const directoryPath = path.join(__dirname, 'uploads');

  console.log(__dirname);
  console.log(directoryPath);

  //passsing directoryPath and callback function
  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    if (files.length !== 0) {
      files.forEach(async function (file) {
        // Do whatever you want to do with the file
        console.log(file.replace(/\.[^/.]+$/, ''));
        await axios
          .get(
            `${apiConfig.baseUrl}search/movie?api_key=${
              apiConfig.apiKey
            }&query=${file.replace(/\.[^/.]+$/, '')}`
          )
          .then(async (res) => {
            // console.log(res.data.results[0]);
            const movieData = res.data.results[0];

            const movie = await models.Movie.findOne({
              where: { title: movieData.title },
            });

            // console.log(movie);

            if (!movie) {
              const movieDetails = await axios.get(
                `${apiConfig.baseUrl}movie/${movieData.id}?api_key=${apiConfig.apiKey}&language=en-US`
              );

              const castDetails = await axios.get(
                `${apiConfig.baseUrl}movie/${movieData.id}/credits?api_key=${apiConfig.apiKey}&language=en-US`
              );
              const castList = castDetails.data.cast.slice(0, 5);
              console.log(castList);
              const t = await sequelize.transaction();

              try {
                const newMovie = await models.Movie.create(
                  {
                    title: movieDetails.data.title,
                    original_title: movieDetails.data.original_title,
                    adult: movieDetails.data.adult,
                    poster_path: movieDetails.data.poster_path,
                    backdrop_path: movieDetails.data.backdrop_path,
                    tmdb_id: movieDetails.data.id,
                    imdb_id: movieDetails.data.imdb_id,
                    overview: movieDetails.data.overview,
                    release_date: movieDetails.data.release_date,
                    original_language: movieDetails.data.original_language,
                    tagline: movieDetails.data.tagline,
                  },
                  { transaction: t }
                );

                // GENERE //
                for (let i = 0; i < movieDetails.data.genres.length; i++) {
                  const element = movieDetails.data.genres[i];

                  const genere = await models.Genere.findOne({
                    where: { id: element.id },
                  });

                  if (genere) {
                    await newMovie.addGeneres(genere, { transaction: t });
                  } else {
                    const newGenere = await models.Genere.create(
                      {
                        id: element.id,
                        name: element.name,
                      },
                      { transaction: t }
                    );
                    await newMovie.addGeneres(newGenere, { transaction: t });
                  }
                }
                // GENERE END //

                // PRODUCTION COUNTRY //
                for (
                  let j = 0;
                  j < movieDetails.data.production_countries.length;
                  j++
                ) {
                  const element = movieDetails.data.production_countries[j];

                  const country = await models.Country.findOne({
                    where: { iso_3166_1: element.iso_3166_1 },
                  });

                  if (country) {
                    await newMovie.addCountries(country, { transaction: t });
                  } else {
                    const newCountry = await models.Country.create(
                      {
                        iso_3166_1: element.iso_3166_1,
                        name: element.name,
                      },
                      { transaction: t }
                    );
                    await newMovie.addCountries(newCountry, { transaction: t });
                  }
                }
                // PRODUCTION COUNTRY END//

                // SPOKEN LANGUAGE //
                for (
                  let k = 0;
                  k < movieDetails.data.spoken_languages.length;
                  k++
                ) {
                  const element = movieDetails.data.spoken_languages[k];

                  const language = await models.Language.findOne({
                    where: { iso_639_1: element.iso_639_1 },
                  });

                  if (language) {
                    await newMovie.addLanguages(language, { transaction: t });
                  } else {
                    const newLanguage = await models.Language.create(
                      {
                        iso_639_1: element.iso_639_1,
                        english_name: element.english_name,
                        name: element.name,
                      },
                      { transaction: t }
                    );
                    await newMovie.addLanguages(newLanguage, {
                      transaction: t,
                    });
                  }
                }
                // SPOKEN LANGUAGE END//

                // Cast //
                for (let l = 0; l < castList.length; l++) {
                  const element = castList[l];

                  const cast = await models.Cast.findOne({
                    where: { CastId: element.id },
                  });

                  if (cast) {
                    await newMovie.addCasts(cast, { transaction: t });
                  } else {
                    const newCast = await models.Cast.create(
                      {
                        CastId: element.id,
                        original_name: element.original_name,
                        profile_path: element.profile_path,
                      },
                      { transaction: t }
                    );
                    await newMovie.addCasts(newCast, {
                      transaction: t,
                    });
                  }
                }
                // Cast END//
                await t.commit();
              } catch (error) {
                await t.rollback();
                console.log(error);
              }
            }
          })
          .catch((err) => console.log(err));
        console.log('-------------------------------------');
      });
    } else {
      console.log('there are no file');
    }
  });

  try {
    const movies = await models.Movie.findAll({
      include: [
        {
          model: Genere,
        },
        {
          model: Country,
        },
        {
          model: Language,
        },
        {
          model: Cast,
        },
      ],
    });

    console.log(movies[0].generes);
  } catch (error) {
    console.log(error);
  }

  console.log('Cron job done---------------------------------------');
});

module.exports = test;
