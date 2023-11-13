const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
  // find all tags
  // be sure to include its associated Product data
router.get("/", async (req, res) => {
  try{
    const payload = await Tag.findAll({
      include: { model: Product, as: 'tag_product'},
    });
    res.status(200).json({status: "Success", payload})
  } catch(err){
    res.status(500).json({status: "Error", payload: err.message})
  }
})

  // find a single tag by its `id`
  // be sure to include its associated Product data
router.get("/:id", async (req, res) => {
  try{
    const payload = await Tag.findByPk(req.params.id,{
      include: { model: Product, as: 'tag_product'},
    });
    res.status(200).json({status: "Success", payload})
  } catch(err){
    res.status(500).json({status: "Error", payload: err.message})
  }
})

  // create a new tag
  router.post("/", async (req, res) => {
    try{
      const payload = await Tag.create(req.body);
      res.status(200).json({status: "Success", payload})
    } catch(err){
      res.status(500).json({status: "Error", payload: err.message})
    }
  })


  // update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((payload) => {
      res.status(200).json({status: "Success"})
    })
    .catch((err) => res.json(err));
});

  // delete on tag by its `id` value
router.delete("/:id", async (req, res) => {
  try{
    const payload = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({status: "Success"})
  } catch(err){
    res.status(500).json({status: "Error", payload: err.message})
  }
})

module.exports = router;
