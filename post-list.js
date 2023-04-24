/* список постів
<ol class="list-group list-group-numbered">
  <li class="list-group-item">A list item</li>
  <li class="list-group-item">A list item</li>
  <li class="list-group-item">A list item</li>
</ol>
*/

const API_URL_Posts = 'https://gorest.co.in/public/v2/posts';

const postsContainer = document.getElementById('posts-container');

function createPost(post) {
    const postContainer = document.createElement('div');
   
    const postTitle  = document.createElement('a');
    postTitle.classList.add('list-group-item-action');
    postTitle.href = `post.html?id=${post.body}`;
    postTitle.innerText = `${post.title}`;
    postTitle.style.fontWeight = 'bold';
    postContainer.appendChild(postTitle);

    const postBody = document.createElement('p');
    postBody.innerText = `${post.body}`;
    postContainer.appendChild(postBody);

    return postContainer;
}

function getPosts() {
    return fetch(API_URL_Posts)
    .then(response => response.json())
    .then((data) => {
        data.forEach(post => {
            const postList = createPost(post);
            postsContainer.appendChild(postList);
        })
    })
}

getPosts()