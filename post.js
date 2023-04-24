const API_URL_Posts = 'https://gorest.co.in/public/v2/posts';

const title = document.querySelector('.post-title');
const description = document.querySelector('.post-text');
const link = document.querySelector('a');

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
}

getPost();

