const API_URL_Posts = 'https://gorest.co.in/public/v2/posts';

const postsContainer = document.getElementById('posts-container');

function createPost(post) {
    const postContainer = document.createElement('div');
   
    const postTitle  = document.createElement('a');
    postTitle.classList.add('list-group-item-action');
    postTitle.href = `post.html?id=${post.id}`;
    postTitle.innerText = `${post.title}`;
    postTitle.style.fontWeight = 'bold';
    postContainer.appendChild(postTitle);

    const postBody = document.createElement('p');
    postBody.innerText = `${post.body}`;
    postContainer.appendChild(postBody);

    return postContainer;
}


function createErrorMessageBox(message) {
    const errorMessageBox = document.createElement('div');
    errorMessageBox.classList.add('alert', 'alert-danger');
    errorMessageBox.innerText = message;

    const linkContainer = document.createElement('div');


    const linkBack = document.createElement('a');
    linkBack.classList.add('list-group-item-action');
    linkBack.innerText = 'Назад';
    linkBack.href = 'http://127.0.0.1:5503/index.html';
    linkContainer.appendChild(linkBack);
    errorMessageBox.appendChild(linkContainer);

    return errorMessageBox;
}


function getPosts() {
    return fetch(API_URL_Posts)
    .then(response => {
        if (!response.ok) {
            throw new Error('У даного користувача відсутні пости');
        }
    
        return response.json()
       })
    .then((data) => {
        data.forEach(post => {
            const postList = createPost(post);
            postsContainer.appendChild(postList);
        })
    })
    .catch(error => {
        const errorMessageBox = createErrorMessageBox(error.message);
        postsContainer.appendChild(errorMessageBox);
       })
}

getPosts()