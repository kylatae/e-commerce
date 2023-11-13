const router = require('express').Router();
const { Category, Product } = require('../../models');

  // find all categories
  // be sure to include its associated Products
router.get("/", async (req, res) => {
  try{
    const payload = await Category.findAll({
      include: { model: Product, as: 'category_product'},
    });
    res.status(200).json({status: "Success", payload})
  } catch(err){
    res.status(500).json({status: "Error", payload: err.message})
  }
})

  // find one category by its `id` value
  // be sure to include its associated Products
  router.get("/:id", async (req, res) => {
    try{
      const payload = await Category.findByPk(req.params.id,{
        include: { model: Product, as: 'category_product'},
      });
      res.status(200).json({status: "Success", payload})
    } catch(err){
      res.status(500).json({status: "Error", payload: err.message})
    }
  })


  // create a new category
router.post("/", async (req, res) => {
  try{
    const payload = await Category.create(req.body);
    res.status(200).json({status: "Success", payload})
  } catch(err){
    res.status(500).json({status: "Error", payload: err.message})
  }
})

  // update a category by its `id` value
  router.put('/:id', (req, res) => {
    Category.update(
      {
        category_name: req.body.category_name,
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

  // delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  try{
    const payload = await Category.destroy({
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
