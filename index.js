const API_URL = 'https://gorest.co.in/public/v2/users';
const API_URL_Posts = 'https://gorest.co.in/public/v2/posts';

const usersContainer = document.getElementById('users-container');

function createUser(user) {

    const name = document.createElement('a');
    name.classList.add('list-group-item', 'list-group-item-action', 'list-group-item-primary');
    name.href = `posts.html?id=${user.id}`;
    name.innerText = `${user.name}`;
    name.style.border ='1px solid';
    name.style.width ='250px';

    console.log(user.name)
    usersContainer.appendChild(name);
 
    return name;
}


function getUsers() {
   return fetch(API_URL) 
   .then(response => response.json())
   .then((data) => {
    data.forEach(user => {
        const userList = createUser(user);
        usersContainer.appendChild(userList);
    })
   })
}

getUsers();



