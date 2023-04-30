const API_BASE_URL = 'https://gorest.co.in/public/v2';
const postsContainer = document.getElementById('posts-container');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userId = urlParams.get('id');

function renderUserPosts() {
    return fetch(`${API_BASE_URL}/users/${userId}/posts`)
        .then(response => response.json())
        .then((data) => {
            if (data.length === 0) {
                const backButton = document.createElement('a');
                backButton.href = 'users.html';
                backButton.textContent = 'Назад';
                postsContainer.appendChild(backButton);
                const noPostsMessage = document.createElement('p');
                noPostsMessage.textContent = 'У даного користувача відсутні пости';
                postsContainer.appendChild(noPostsMessage);
              } else  {
            data.forEach(post => {
                renderPostDetails(post.id);
                console.log(post)
            });
        }
     })
}


function renderPostDetails(postId) {
    fetch(`${API_BASE_URL}/posts/${postId}`)
        .then(response => response.json())
        .then(post => {
            const postElement = document.createElement('div');
            const postTitle = document.createElement('a');
            postTitle.textContent = post.title;
            postTitle.href = `post.html?id=${post.id}`;
            const postBody = document.createElement('p');
            postBody.textContent = post.body;
            postElement.appendChild(postTitle);
            postElement.appendChild(postBody);
            postsContainer.appendChild(postElement);
        })
}

renderUserPosts();
