const API_BASE_URL = 'https://gorest.co.in/public/v2';
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postId = urlParams.get('id');

class PostViewer {
  constructor() {
    this.postContainer = document.getElementById('post-container');
    this.postTitle = document.querySelector('h5');
    this.postBody = document.querySelector('p');
    this.postSubTitle = document.querySelector('h6');
    this.commentsList = document.querySelector('.comments-list');
    this.linkBack = document.querySelector('.link-back');
    this.subTitle = document.querySelector('.post-subtitle');
  }

  getPost(postId) {
    return fetch(`${API_BASE_URL}/posts/${postId}`)
      .then(response => response.json())
      .then(post => {
        this.postTitle.textContent = post.title;
        this.postBody.textContent = post.body;
        this.linkBack.textContent = 'Назад';
        this.linkBack.href = `posts.html?id=${post.user_id}`;
        this.postSubTitle.textContent = 'Коментарі';
        return fetch(`${API_BASE_URL}/comments?post_id=${post.id}`);
      })
      .then(response => response.json())
      .then(comments => {
        this.commentsList.innerHTML = '';

        if (comments.length === 0) {
          this.commentsList.innerHTML = '<li class="no-comments">Коментарі відсутні</li>';
        } else {
          comments.forEach(comment => {
            const commentItem = document.createElement('li');
            commentItem.classList.add('comment-item');

            const commentName = document.createElement('h6');
            commentName.classList.add('comment-name');
            commentName.textContent = comment.name;

            const commentBody = document.createElement('p');
            commentBody.classList.add('comment-body');
            commentBody.textContent = comment.body;

            commentItem.appendChild(commentName);
            commentItem.appendChild(commentBody);

            this.commentsList.appendChild(commentItem);
          });
        }
      })
      .catch(error => {
        this.commentsList.innerHTML = '<li class="error-message">Помилка при завантаженні коментарів</li>';
        console.error(error);
      });
  }
}

const postViewer = new PostViewer();
postViewer.getPost(postId);


  

