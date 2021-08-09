const User = require('./User');
const Blog = require('./Blog');

// A user has many blogs
User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// Blogs belong to a user
Blog.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Blog };
