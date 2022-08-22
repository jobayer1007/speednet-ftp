const axios = require('axios');
const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');

const dotenv = require('dotenv');

dotenv.config();

const asyncHandler = require('express-async-handler');
const models = require('../../models/index');
const apiConfig = require('../../api/apiConfig');
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

const genereList = asyncHandler(async (req, res) => {
  // const orders = await models.Order.findAll({});
  console.log(
    'Starting cronjob-------------------------Updating the Genere List---------------------'
  );
  await axios
    .get(
      `${apiConfig.baseUrl}genre/movie/list?api_key=${apiConfig.apiKey}&language=en-US`
    )
    .then(async (res) => {
      console.log(res.data.genres);
      const generes = res.data.genres;

      const t = await sequelize.transaction();

      try {
        for (let i = 0; i < generes.length; i++) {
          const element = generes[i];

          const genere = await models.Genere.findOne({
            where: { id: element.id },
          });

          if (!genere) {
            await models.Genere.create(
              {
                id: element.id,
                name: element.name,
              },
              { transaction: t }
            );
          }

          console.log(`-----genere created------: ${i} :---------`);
        }

        await t.commit();
        console.log('genere updated');
      } catch (error) {
        await t.rollback();
        console.log(error);
      }
    })
    .catch((err) => console.log(err));
  console.log('-------------------------------------');

  console.log('Cron job done---------------------------------------');
});

module.exports = genereList;
