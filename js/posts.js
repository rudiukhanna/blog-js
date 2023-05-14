const API_BASE_URL = 'https://gorest.co.in/public/v2';
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userId = urlParams.get('id');

class PostRenderer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  renderUserPosts(userId) {
    return fetch(`${API_BASE_URL}/users/${userId}/posts`)
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          this.container.classList.toggle('posts-wrapper');
          const noPostsMessage = document.createElement('p');
          noPostsMessage.textContent = 'У даного користувача відсутні пости';
          this.container.appendChild(noPostsMessage);

          const div = document.createElement('div');
          const backButton = document.createElement('a');
          backButton.href = 'users.html';
          backButton.textContent = 'Назад';
          backButton.classList.add('text-success');
          div.appendChild(backButton);
          this.container.appendChild(div);
        } else {
          data.forEach(post => {
            this.renderPostDetails(post.id);
            console.log(post);
          });
        }
      });
  }

  renderPostDetails(postId) {
    fetch(`${API_BASE_URL}/posts/${postId}`)
      .then(response => response.json())
      .then(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('border', 'border-success', 'rounded', 'p-2');
        const postTitle = document.createElement('a');
        postTitle.classList.add('text-success', 'fs-4');
        postTitle.textContent = post.title;
        postTitle.href = `post.html?id=${post.id}`;
        const postBody = document.createElement('p');
        postBody.textContent = post.body;
        postBody.classList.add('fs-6', 'text-secondary');
        postElement.appendChild(postTitle);
        postElement.appendChild(postBody);
        this.container.appendChild(postElement);
      });
  }
}

const postRenderer = new PostRenderer('posts-container');
postRenderer.renderUserPosts(userId);
