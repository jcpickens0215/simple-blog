// Import libraries
const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

// Main route
// 'domain'/
router.get('/', async (req, res) => {
  try {
    let mostRecentBlogs = await Blog.findAll(
      {
        attributes: {
          include: [
            'title',
            'body',
            'date_created',
          ],
        },
        include: [{
          model: User,
          attributes: ['username']
        }]
      }
    );

    const blogs = mostRecentBlogs.map(x => x.get({plain:true}));
    res.status(200).render('homepage', { blogs });

    // Testing!
    // res.status(200).json(mostRecentBlogs);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Individual Blog post
// 'domain'/blog/'id'
router.get('/blog/:id', async (req, res) => {
  try {
    console.log('ATTEMPT QUERY');
    let selectedBlog = await Blog.findByPk(
      req.params.id,
      {
        attributes: {
          include: [
            'title',
            'body',
            'date_created',
          ],
        },
        include: [{
          model: User,
          attributes: ['username']
        }],
      }
    );

    console.log('ATTEMPT SERIALIZE');
    let blog = selectedBlog.get({plain:true});

    console.log(blog);

    console.log('ATTEMPT RENDER');
    res.status(200).render('blog', blog);

    // Testing!
    // res.status(200).json(selectedBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

// User Profile view route
// Use withAuth middleware to prevent access to route
// 'domain'/profile
router.get('/profile', withAuth, async (req, res) => {
  try {
    // console.log('ATTEMPT ');
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// User Login route
// 'domain'/login
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;