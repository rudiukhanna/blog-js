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
                postsContainer.classList.toggle('posts-wrapper');
                const noPostsMessage = document.createElement('p');
                noPostsMessage.textContent = 'У даного користувача відсутні пости';
                postsContainer.appendChild(noPostsMessage);

                const div = document.createElement('div');
                const backButton = document.createElement('a');
                backButton.href = 'users.html';
                backButton.textContent = 'Назад';
                backButton.classList.add('text-success');
                div.appendChild(backButton);
                postsContainer.appendChild(div);
               
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
            postElement.classList.add('border', 'border-success', 'rounded', 'p-2');
            const postTitle = document.createElement('a');
            postTitle.classList.add('text-success', 'fs-4')
            postTitle.textContent = post.title;
            postTitle.href = `post.html?id=${post.id}`;
            const postBody = document.createElement('p');
            postBody.textContent = post.body;
            postBody.classList.add('fs-6', 'text-secondary')
            postElement.appendChild(postTitle);
            postElement.appendChild(postBody);
            postsContainer.appendChild(postElement);
        })
}

renderUserPosts();
