document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const firstNameField = document.querySelector('#first-name');
    const lastNameField = document.querySelector('#last-name');
    const messageField = document.querySelector('#message');
    const errorMessageContainer = document.querySelector('#error-message');
    const commentListContainer = document.querySelector('#comment-list');
  
    // Check for existing comments in LocalStorage
    const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
  
    // Display saved comments
    savedComments.forEach((comment) => {
      const newComment = displayComment(comment);
      commentListContainer.appendChild(newComment);
        });
  
      
    // Submit form
    function submitForm(event) {
      event.preventDefault();
  
      if (!firstNameField.value || !lastNameField.value || !messageField.value) {
        errorMessageContainer.style.display = 'block';
        return;
      }
  
      errorMessageContainer.style.display = 'none';
  
      const newComment = {
        firstName: firstNameField.value,
        lastName: lastNameField.value,
        message: messageField.value,
      };
  
      const newCommentElement = displayComment(newComment);
  
      commentListContainer.appendChild(newCommentElement);
  
      form.reset();
  
      // Save the comment to LocalStorage
      savedComments.push(newComment);
      localStorage.setItem('comments', JSON.stringify(savedComments));
    }
  
    // Add event listener to the form
    form.addEventListener('submit', submitForm);
  
    // Display comment function
    function displayComment(comment) {
      const newComment = document.createElement('div');
      newComment.classList.add(
        'flex',
        'space-x-4',
        'text-sm',
        'text-gray-500',
        'py-10',
        'border-t',
        'border-gray-200'
      );
  
      newComment.innerHTML = `
        <div class="flex-1">
          <h3 class="font-medium text-gray-900">${comment.firstName} ${comment.lastName}</h3>
          <div class="prose prose-sm mt-4 max-w-none text-gray-500">
            <p>${comment.message}</p>
          </div>
        </div>
      `;
  
      return newComment;
    }
  
    // Add event listener for error message
    document.getElementById("comment-form").addEventListener("submit", function (event) {
      if (firstNameField.value.length === 0 || lastNameField.value.length === 0 || messageField.value.length === 0) {
        event.preventDefault();
        errorMessageContainer.style.display = 'block';
      }
    });
  });