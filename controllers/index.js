// Import express' router
const router = require('express').Router();

// Define route code paths
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
