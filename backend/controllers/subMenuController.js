const asyncHandler = require('express-async-handler');
const { SubMenuL1 } = require('../models/index');
const models = require('../models/index');

// @desc    Create a new Sub-Menu     ///////////////////////////////////////////////
// @route   POST /api/sub
// @access  Private/SystemAdmin || Admin
exports.createNewSubMenu = asyncHandler(async (req, res) => {
  const { menuId, title, url } = req.body;
  const titleExists = await models.SubMenu.findOne({
    where: { title: title, menuId: menuId },
  });
  if (titleExists) {
    res.status(400);
    throw new Error('title already exists');
  } else {
    const newSubMenu = await models.SubMenu.create({
      menuId,
      title,
      url,
    });
    if (newSubMenu) {
      res.json(newSubMenu);
    } else {
      res.status(400);
      throw new Error('Encountered problem while creating new Sub-Menu');
    }
  }
});

// @desc    GET all Sub Menu      ///////////////////////////////////////////////
// @route   GET /api/sub
// @access  Public
exports.getAllSubMenu = asyncHandler(async (req, res) => {
  const subMenu = await models.SubMenu.findAll({
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: SubMenuL1,
      },
    ],
  });
  if (subMenu && subMenu.length !== 0) {
    res.send(subMenu);
  } else {
    res.status(404);
    throw new Error('No Sub Menu');
  }
});

// @desc    Get a Sub Menu by Id     ///////////////////////////////////////////////
// @route   GET /api/sub/:id
// @access  Public
exports.subMenuById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const subMenu = await models.SubMenu.findOne({
    where: { subMenuId: id },
  });

  if (subMenu) {
    res.json(subMenu);
  } else {
    res.status(404);
    throw new Error('Sub-Menu not found');
  }
});

// @desc   Update a menu by Id      ///////////////////////////////////////////////
// @route   PUT /api/sub/:id
// @access  Private/Admin || SystemAdmin
exports.updateSubMenuById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const subMenu = await models.SubMenu.findOne({
    where: { subMenuId: id },
  });

  if (subMenu) {
    const data = {
      title: req.body.title || subMenu.title,
      url: req.body.url || subMenu.url,
    };

    let { title, url } = data;
    const updatedsubMenu = await models.SubMenu.update(
      {
        title,
        url,
      },
      { where: { subMenuId: id } }
    );

    if (updatedsubMenu == 1) {
      res.send('Sub-Menu update successful');
    } else {
      res.status(400);
      throw new Error('Sub-Menu update unsuccessful');
    }
  } else {
    res.status(404);
    throw new Error('Sub-Menu not found');
  }
});

// @desc    Delete a Menu     ///////////////////////////////////////////////
// @route   DELETE /api/sub/:id
// @access  Private/Admin
exports.deleteSubMenu = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const subMenu = await models.SubMenu.findOne({
    where: { subMenuId: id },
  });

  if (subMenu) {
    models.SubMenu.destroy({
      where: { subMenuId: id },
    })
      .then((num) => {
        if (num == 1) {
          res.json('Sub-Menu has been deleted successfully');
        } else {
          res.status(400);
          throw new Error('Cannot delete the Sub-Menu');
        }
      })
      .catch((err) => console.log(err));
  } else {
    res.status(404);
    throw new Error('Sub-Menu not found');
  }
});
