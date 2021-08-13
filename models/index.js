const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

// A user has many blogs
User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// A user has many comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// A comment belongs to a user
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

// A comment belongs to a blog
Comment.belongsTo(Blog, {
  foreignKey: 'blog_id',
});

// Blogs have many comments
Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE',
});

// Blogs belong to a user
Blog.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Blog, Comment };
