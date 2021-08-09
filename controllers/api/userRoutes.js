// Import Libraries
const router = require('express').Router();
const { User } = require('../../models');

// Get all users route
// 'domain'/api/users
router.get('/', async (req, res) => {
  let allUsers = await User.findAll(
    {
      attributes: {
        include: ['username','email','password']
      }
    }
  );
  res.status(200).json(allUsers);
});

// Create user route
// 'domain'/api/users
router.post('/', async (req, res) => {

  try {

    const userData = await User.create(req.body);

    req.session.save(() => {

      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {

    res.status(400).json(err);
  }
});

// Create user session route
// 'domain'/api/users/login
router.post('/login', async (req, res) => {

  try {

    const userData = await User.findOne({ where: { email: req.body.email } });

    // On empty form submit
    if (!userData) {

      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Check submitted password
    const validPassword = await userData.checkPassword(req.body.password);

    // Incorrect password
    if (!validPassword) {

      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Start the user's session
    req.session.save(() => {

      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {

    res.status(400).json(err);
  }
});

// End user session route
// 'domain'/api/users/logout
router.post('/logout', (req, res) => {

  if (req.session.logged_in) {

    req.session.destroy(() => {

      res.status(204).end();
    });
  } else {

    res.status(404).end();
  }
});

module.exports = router;