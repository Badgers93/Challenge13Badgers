const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categories = await Category.findAll({ include: [{model: Product}]});
    res.json(categories);
  } catch (err){
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  const categoryId = req.params.id;
  try {
    const categories = await Category.findByPk(categoryId, { include: [{model: Product}]});
    if (categoryId){
      res.json(categoryId);
    }
    else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (err){
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  const categoryName = req.body.category_name;
  try {
    const createCategory = await Category.create({categoryName});
    res.status(200).json(categoryName);
  } catch (err){
    console.error(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const categoryName = req.body.category_name;
  const categoryId = req.params.id;
  try {
    const updateCategory = await Category.findByPk(categoryId);
    if (updateCategory){
      await updateCategory.update({categoryName});
      res.status(200).json(updateCategory);
    }
    else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (err){
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const categoryId = req.params.id;
  try {
    const deleteCategory = await Category.findByPk(categoryId);
    if (deleteCategory){
      await deleteCategory.destroy();
      res.status(200).json({message: 'Category successfully deleted'});
    }
    else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (err){
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
