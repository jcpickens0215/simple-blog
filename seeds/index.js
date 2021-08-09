// Import Libraries and seed data
const sequelize = require('../config/connection');
const { User, Blog } = require('../models');
const userData = require('./users.json');
const blogData = require('./blogs.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const blogs = await Blog.bulkCreate(blogData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
