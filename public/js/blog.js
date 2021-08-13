function handleEditButton (element) {
  var id = element.getAttribute('data-id');

  var formToOpen = document.getElementById('edit-comment-form-' + id);
  formToOpen.setAttribute('style', 'display: block;');
}

function handleDeleteButton (element) {
  var id = element.getAttribute('data-id');

  // FETCH DELETE request here passing in ID
  // Redirect back here
}

function handleCommentSubmitButton () {
  // Get contents of Title and Body

  // FETCH POST request here passing in title and body
  // Redirect back here
}

function handleCommentUpdateButton (element) {
  var id = element.getAttribute('data-id');
  // Get contents of Title and Body

  // FETCH PUT request here passing in title and body
  // Redirect back here
}

function handleClickedButton(event) {
  console.log(event.target);

  if (event.target.classList.contains('edit-btn')) {
    handleEditButton(event.target);
  } else if (event.target.classList.contains('delete-btn')) {
    handleDeleteButton(event.target);
  } else if (event.target.classList.contains('add-comment-btn')) {
    handleCommentSubmitButton();
  } else if (event.target.classList.contains('submit-update-btn')) {
    handleCommentUpdateButton(event.target);
  }
}

document.addEventListener('click', handleClickedButton);