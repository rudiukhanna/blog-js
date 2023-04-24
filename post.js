const API_URL_Posts = 'https://gorest.co.in/public/v2/posts';
const API_URL_Comments = 'https://gorest.co.in/public/v2/comments1';

const title = document.querySelector('.post-title');
const description = document.querySelector('.post-text');
const subTitle = document.querySelector('.post-subtitle');
const link = document.querySelector('a');
const postBody = document.querySelector('.post-body');
const commentsList = document.querySelector('.comments-list');

function getIdFromUrl() {
    const params = new URL(document.location).searchParams;

    return params.get('id');
}


async function getPost() {
    const id = getIdFromUrl();
    const response = await fetch(`${API_URL_Posts}/${id}`);
    const post = await response.json();

    title.innerText = post.title;
    description.innerText = post.body;
    link.innerText = 'Назад';
    link.href = 'http://127.0.0.1:5503/post-list.html';
    subTitle.innerText = 'Коментарі';
}

getPost();

function createComment(comment) {

    const comName = document.createElement('li');
    comName.innerHTML = `${comment.name}<br>${comment.body}`;

    commentsList.appendChild(comName);

    return comName;
}

function createErrorMessageBox(message) {
    const errorMessageBox = document.createElement('div');
    errorMessageBox.classList.add('alert', 'alert-danger');
    errorMessageBox.innerText = message;

    return errorMessageBox;
}


 function getComments() {
    return fetch(API_URL_Comments)
    .then(response => {
        if (!response.ok) {
            throw new Error('Коментарі відсутні');
        }
    
        return response.json()
       })
    .then((data) => {
        
        data.forEach(comment => {
            const commentItem = createComment(comment);
            commentsList.appendChild(commentItem);
        })
      
    })
    .catch(error => {
        const errorMessageBox = createErrorMessageBox(error.message);
        commentsList.appendChild(errorMessageBox);
       })
    
}

getComments();

