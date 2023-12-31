// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  through: {
    model: Product,
    unique: false
  },
  as: 'product_category',
  foreignKey:{
    name: 'category_id',
    allowNull:false
}
});

// Categories have many Products
Category.hasOne(Product, {
  through: {
    model: Product,
    unique: false
  },
  as: 'category_product',
  foreignKey:{
    name: 'category_id',
    allowNull:false
}
});


// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false
  },
  as: 'product_tags'
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false
  },
  as: 'tag_product'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
