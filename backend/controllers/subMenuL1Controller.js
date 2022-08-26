const asyncHandler = require('express-async-handler');
const {} = require('../models/index');
const models = require('../models/index');

// @desc    Create a new Sub-Menu     ///////////////////////////////////////////////
// @route   POST /api/sl1
// @access  Private/SystemAdmin || Admin
exports.createNewSubMenuL1 = asyncHandler(async (req, res) => {
  const { subMenuId, title, url } = req.body;
  const titleExists = await models.SubMenuL1.findOne({
    where: { title: title, subMenuId: subMenuId },
  });
  if (titleExists) {
    res.status(400);
    throw new Error('title already exists');
  } else {
    const newSubMenu = await models.SubMenu.create({
      subMenuId,
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
// @route   GET /api/sl1
// @access  Public
exports.getAllSubMenu = asyncHandler(async (req, res) => {
  const subMenu = await models.SubMenuL1.findAll({
    order: [['createdAt', 'DESC']],
  });
  if (subMenu && subMenu.length !== 0) {
    res.send(subMenu);
  } else {
    res.status(404);
    throw new Error('No Sub Menu');
  }
});

// @desc    Get a Sub Menu by Id     ///////////////////////////////////////////////
// @route   GET /api/sl1/:id
// @access  Public
exports.subMenuById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const subMenu = await models.SubMenuL1.findOne({
    where: { subMenuL1Id: id },
  });

  if (subMenu) {
    res.json(subMenu);
  } else {
    res.status(404);
    throw new Error('Sub-Menu not found');
  }
});

// @desc   Update a menu by Id      ///////////////////////////////////////////////
// @route   PUT /api/sl1/:id
// @access  Private/Admin || SystemAdmin
exports.updateSubMenuById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const subMenu = await models.SubMenuL1.findOne({
    where: { subMenuL1Id: id },
  });

  if (subMenu) {
    const data = {
      title: req.body.title || subMenu.title,
      url: req.body.url || subMenu.url,
    };

    let { title, url } = data;
    const updatedsubMenu = await models.SubMenuL1.update(
      {
        title,
        url,
      },
      { where: { subMenuL1Id: id } }
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
// @route   DELETE /api/sl1/:id
// @access  Private/Admin
exports.deleteSubMenu = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const subMenu = await models.SubMenuL1.findOne({
    where: { subMenuL1Id: id },
  });

  if (subMenu) {
    models.SubMenuL1.destroy({
      where: { subMenuL1Id: id },
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
