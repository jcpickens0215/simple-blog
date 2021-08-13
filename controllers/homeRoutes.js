// Import libraries
const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
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
        }],
        limit: 10,
        order: [
          ['date_created','DESC']
        ]
      }
    );

    const blogs = mostRecentBlogs.map(x => x.get({plain:true}));
    res.status(200).render('homepage', {
      blogs,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Individual Blog post
// 'domain'/blog/'id'
router.get('/blog/:id', async (req, res) => {
  try {
    let selectedBlog = await Blog.findByPk(
      req.params.id,
      {
        include: [{
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          required: false,
          include: [{
            model: User,
            exclude: ['password']
          }],
        },
        ]
      }
    );

    let blog = selectedBlog.get({plain:true});
    let comments = blog.comments;
    blog.comments = [];

    comments.map( (x) => {
      if (req.session.logged_in) {
        if (x.user_id === req.session.user_id) {
          blog.comments.push({...x, is_my_comment: true});
        } else {
          blog.comments.push({...x, is_my_comment: false});
        }
      } else {
        blog.comments.push(x);
      }
    });

    console.log('ATTEMPT RENDER');
    res.status(200).render('blog', {
      ...blog,
      logged_in: req.session.logged_in
    });
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