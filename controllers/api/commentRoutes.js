// Import Libraries
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Post new comment
// 'domain'/api/comment
router.post('/', withAuth, async (req, res) => {

  try {

    const newComment = await Comment.create({
      title: req.body.title,
      body: req.body.body,
      blog_id: req.body.id,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Put existing comment
// 'domain'/api/comment/'id'
router.put('/:id', withAuth, async (req, res) => {

  try {

    const editedComment = await Comment.update({
      title: req.body.title,
      body: req.body.body,
      blog_id: req.body.blog_id,
    },
    {
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });

    res.status(200).json(editedComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a comment
// 'domain'/api/comment/'id'
router.delete('/:id', withAuth, async (req, res) => {

  try {

    const commentData = await Comment.destroy({

      where:
      {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {

      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {

    res.status(500).json(err);
  }
});

module.exports = router;