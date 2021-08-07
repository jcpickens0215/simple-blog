// Import Libraries
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes');

// Define route code paths
router.use('/users', userRoutes);
router.use('/blog', blogRoutes);

module.exports = router;