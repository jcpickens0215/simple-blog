// Reveal Comment edit form
function handleEditButton (element) {
  var id = element.getAttribute('data-id');

  var formToOpen = document.getElementById(`edit-comment-form-${id}`);
  formToOpen.setAttribute('style', 'display: block;');
}

// Reveal Comment edit form
function handleShowBlogEditButton () {
  var formToOpen = document.getElementById('edit-blog-reveal-btn');
  formToOpen.setAttribute('style', 'display: block;');
}

// DELETE Comment
var handleDeleteButton = async (element) => {
  if (element.hasAttribute('data-id')) {
    var id = element.getAttribute('data-id');

    // FETCH DELETE request here passing in id
    // Redirect back here
    const response = await fetch(`/api/comment/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location = window.location;
    } else {
      alert('Failed to delete comment');
    }
  }
};

// POST Comment
var handleCommentSubmitButton = async () => {
  // Get contents of Title and Body
  const title = document.querySelector('#comment-title').value.trim();
  const body = document.querySelector('#comment-body').value.trim();

  const id = window.location.pathname.split('/')[2];

  // FETCH POST request here passing in title and body
  // Redirect back here
  if (title && body && id) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ title, body, id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location = window.location;
    } else {
      alert('Failed to add comment');
    }
  }
};

// PUT Comment
var handleCommentUpdateButton = async (element) => {
  var id = element.getAttribute('data-id');

  // Get contents of Title and Body
  const title = document.getElementById(`edit-comment-title-${id}`).value.trim();
  const body = document.getElementById(`edit-comment-body-${id}`).value.trim();

  const blog_id = window.location.pathname.split('/')[2];

  // FETCH PUT request here passing in title and body
  // Redirect back here
  if (title && body) {
    const response = await fetch(`/api/comment/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, body, blog_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location = window.location;
    } else {
      alert('Failed to edit comment');
    }
  } else {
    alert('The comment needs a title and body');
  }
};

const handleEditBlog = async (event) => {
  event.preventDefault();

  const blog_id = window.location.pathname.split('/')[2];

  const title = document.querySelector('#edit-blog-title').value.trim();
  const body = document.querySelector('#edit-blog-body').value.trim();

  if (title && body) {
    const response = await fetch(`/api/blog/${blog_id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, body }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location = window.location;
    } else {
      document.location.replace('/login');
    }
  }
};

function handleClickedButton(event) {
  event.preventDefault();

  if (event.target.classList.contains('edit-btn')) {
    handleEditButton(event.target);
  } else if (event.target.classList.contains('delete-btn')) {
    handleDeleteButton(event.target);
  } else if (event.target.classList.contains('add-comment-btn')) {
    handleCommentSubmitButton();
  } else if (event.target.classList.contains('submit-update-btn')) {
    handleCommentUpdateButton(event.target);
  } else if (event.target.classList.contains('edit-blog-btn')) {
    handleShowBlogEditButton();
  } else if (event.target.classList.contains('submit-update-blog-btn')) {
    handleEditBlog(event);
  }
}

document.querySelector('.container').addEventListener('click', handleClickedButton);