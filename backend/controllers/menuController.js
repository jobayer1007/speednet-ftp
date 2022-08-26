const asyncHandler = require('express-async-handler');
const { SubMenuL1, SubMenu } = require('../models/index');
const models = require('../models/index');

// @desc    Create a new Main Menu     ///////////////////////////////////////////////
// @route   POST /api/main
// @access  Private/SystemAdmin || Admin
exports.createNewMainMenu = asyncHandler(async (req, res) => {
  const { title, url } = req.body;
  const titleExists = await models.Menu.findOne({
    where: { title: title },
  });
  if (titleExists) {
    res.status(400);
    throw new Error('title already exists');
  } else {
    const newMain = await models.Menu.create({
      title,
      url,
    });
    if (newMain) {
      res.json(newMain);
    } else {
      res.status(400);
      throw new Error('Encountered problem while creating new Menu');
    }
  }
});

// @desc    GET all Main Menu     ///////////////////////////////////////////////
// @route   GET /api/menu
// @access  Public
exports.getAllMenu = asyncHandler(async (req, res) => {
  const menu = await models.Menu.findAll({
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: SubMenu,
        include: [
          {
            model: SubMenuL1,
          },
        ],
      },
    ],
  });
  if (menu && menu.length !== 0) {
    res.send(menu);
  } else {
    res.status(404);
    throw new Error('No Menu');
  }
});

// @desc    Get a Main Menu by Id     ///////////////////////////////////////////////
// @route   GET /api/menu/:id
// @access  Public
exports.mainMenuById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const mainMenu = await models.Menu.findOne({
    where: { menuId: id },
    include: [
      {
        model: SubMenu,
        include: [
          {
            model: SubMenuL1,
          },
        ],
      },
    ],
  });

  if (mainMenu) {
    res.json(mainMenu);
  } else {
    res.status(404);
    throw new Error('Menu not found');
  }
});

// @desc   Update a menu by Id      ///////////////////////////////////////////////
// @route   PUT /api/menu/:id
// @access  Private/Admin || SystemAdmin
exports.updateMainMenuById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const mainMenu = await models.Menu.findOne({
    where: { menuId: id },
  });

  if (mainMenu) {
    const data = {
      title: req.body.title || mainMenu.title,
      url: req.body.url || mainMenu.url,
    };

    let { title, url } = data;
    const updatedMainMenu = await models.Menu.update(
      {
        title,
        url,
      },
      { where: { menuId: id } }
    );

    if (updatedMainMenu == 1) {
      res.send('Menu update successful');
    } else {
      res.status(400);
      throw new Error('Menu update unsuccessful');
    }
  } else {
    res.status(404);
    throw new Error('Menu not found');
  }
});

// @desc    Delete a Menu     ///////////////////////////////////////////////
// @route   DELETE /api/menu/:id
// @access  Private/Admin
exports.deleteMainMenu = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const menu = await models.Menu.findOne({
    where: { menuId: id },
  });

  if (menu) {
    models.MainMenu.destroy({
      where: { menuId: id },
    })
      .then((num) => {
        if (num == 1) {
          res.json('Menu has been deleted successfully');
        } else {
          res.status(400);
          throw new Error('Cannot delete the Menu');
        }
      })
      .catch((err) => console.log(err));
  } else {
    res.status(404);
    throw new Error('Menu not found');
  }
});
