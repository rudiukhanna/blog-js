const API_BASE_URL = 'https://gorest.co.in/public/v2';
const postContainer = document.getElementById('post-container');
const postTitle = document.querySelector('h5');
const postBody = document.querySelector('p');
const postSubTitle = document.querySelector('h6');
const commentsList = document.querySelector('.comments-list');
const linkBack = document.querySelector('.link-back');
const subTitle = document.querySelector('.post-subtitle');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postId = urlParams.get('id');

function getPost() {
    return fetch(`${API_BASE_URL}/posts/${postId}`)
        .then(response => response.json())
        .then(post => {
            postTitle.textContent = post.title;
            postBody.textContent = post.body;
            linkBack.textContent = 'Назад';
            linkBack.href = 'posts.html?id=' + post.user_id;
            postSubTitle.textContent = 'Коментарі';
            return fetch(`${API_BASE_URL}/comments?post_id=${post.id}`);
        })
        .then(response => response.json())
        .then(comments => {
            commentsList.innerHTML = '';

            if (comments.length === 0) {
                commentsList.innerHTML = '<li class="no-comments">Коментарі відсутні</li>';
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

                    commentsList.appendChild(commentItem);
                });
            }
        })
        .catch(error => {
            commentsList.innerHTML = '<li class="error-message">Помилка при завантаженні коментарів</li>';
            console.error(error);
        });
}

getPost();


  

