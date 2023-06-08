const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tags = await Tag.findAll({ include: [{model: Product}]});
    res.json(tags);
  } catch (err){
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  const tagId = req.params.id;
  try {
    const tagsById = await Category.findByPk(tagId, { include: [{model: Product}]});
    if (tagId){
      res.json(tagsById);
    }
    else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (err){
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  const tagName = req.body.tag_name;
  try {
    const createTag = await Tag.create({tagName});
    res.status(200).json(createTag);
  } catch (err){
    console.error(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const tagName = req.body.tag_name;
  const tagId = req.params.id;
  try {
    const updateTag = await Tag.findByPk(tagId);
    if (updateTag){
      await updateTag.update({tagName});
      res.status(200).json(updateTag);
    }
    else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (err){
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const tagId = req.params.id;
  try {
    const deleteTag = await Tag.findByPk(tagId);
    if (deleteTag){
      await deleteTag.destroy();
      res.status(200).json({message: 'Tag successfully deleted'});
    }
    else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (err){
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
