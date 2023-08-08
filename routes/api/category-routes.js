const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
 try { // find all categories
  // be sure to include its associated Products
  const categoryData = await Category.findAll({
    include: [{ 
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
    }],
  });
  res.status(200).json(categoryData);
 } catch (err) {
  res.status(500).json('Error in retrieving category data');
 }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ 
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      }],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category with that id'});
      return;
    }
    res.status(200).json(categoryData);
  }  catch (err) {
    res.status(500).json('Error in retrieving category id');
   }

});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newcategoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newcategoryData);
  }  catch (err) {
    res.status(500).json('Error in creating new category');
   }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
  const categoryData = await Category.update(req.body, {
    where: {
        id: req.params.id,
    },
  });
  res.status(200).json(categoryData);
 
  } catch (err) {
    res.status(500).json('Error in updating the category')
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
  const categoryData = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
    if (!categoryData) {
      res.status(400).json({ message: 'No category with that id'})
    }
    res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json('Error in deleting category')
}
});

module.exports = router;
