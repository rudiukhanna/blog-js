const API_BASE_URL = 'https://gorest.co.in/public/v2';

class UserRenderer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  createUser(user) {
    const name = document.createElement('a');
    const nameId = user.id;
    name.addEventListener('click', () => {
      window.location.href = `posts.html?id=${nameId}`;
      this.renderUserPosts(nameId);
    });
    name.classList.add(
      'd-block',
      'd-flex',
      'flex-row',
      'gap-3',
      'flex-column',
      'mb-3',
      'border',
      'p-2',
      'text-decoration-none',
      'text-success',
      'bg-white',
      'link-success',
      'rounded',
      'border-success'
    );
    name.innerText = `${user.name}`;
    console.log(name);
    return name;
  }

  renderUserPosts(nameId) {
    return fetch(`${API_BASE_URL}/users/${nameId}/posts`)
      .then(response => response.json())
      .then(data => {
        data.forEach(post => {
          this.renderPostDetails(post.id);
          console.log(post.id, post.body);
        });
      });
  }

  renderPostDetails(postId) {
    fetch(`${API_BASE_URL}/posts/${postId}`)
      .then(response => response.json())
      .then(post => {
        const postElement = document.createElement('div');
        const postTitle = document.createElement('a');
        postTitle.textContent = post.title;
        postTitle.href = `post.html?id=${postId}`;
        const postBody = document.createElement('p');
        postBody.textContent = post.body;
        postElement.appendChild(postTitle);
        postElement.appendChild(postBody);
        document.body.appendChild(postElement);
        console.log(post);
      });
  }

  createErrorMessageBox(message) {
    const errorMessageBox = document.createElement('div');
    errorMessageBox.classList.add('alert', 'alert-danger');
    errorMessageBox.innerText = message;
    return errorMessageBox;
  }

  getUsers() {
    return fetch(`${API_BASE_URL}/users`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Користувачі не знайдені :(');
        }

        return response.json();
      })
      .then(data => {
        data.forEach(user => {
          const div = this.createUser(user);
          this.container.appendChild(div);
          console.log(user);
        });
      })
      .catch(error => {
        const errorMessageBox = this.createErrorMessageBox(error.message);
        this.container.appendChild(errorMessageBox);
      });
  }
}

const userRenderer = new UserRenderer('users-container');
userRenderer.getUsers();


