// Import Libraries
const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// Post new blog
// 'domain'/api/blog
router.post('/', withAuth, async (req, res) => {

  try {

    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Put existing blog
// 'domain'/api/blog/'id'
router.put('/:id', withAuth, async (req, res) => {

  try {

    const editedBlog = await Blog.update({
      title: req.body.title,
      body: req.body.body,
    },
    {
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });

    res.status(200).json(editedBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a blog
// 'domain'/api/blog/'id'
router.delete('/:id', withAuth, async (req, res) => {

  try {

    const blogData = await Blog.destroy({

      where:
      {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {

      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {

    res.status(500).json(err);
  }
});

module.exports = router;