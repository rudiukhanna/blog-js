const API_URL = 'https://gorest.co.in/public/v2/users';

const usersContainer = document.getElementById('users-container');


function createUser(user) {
    const name = document.createElement('a');
    name.classList.add('d-block','d-flex','flex-row','gap-3', 'flex-column','mb-3', 'border', 'p-2', 'text-decoration-none',
    'text-success', 'bg-white', 'link-success', 'rounded', 'border-success');
    name.href = `post-list.html?id=${user.id}`;
    name.innerText = `${user.name}`;

    return name;
}

function createErrorMessageBox(message) {
    const errorMessageBox = document.createElement('div');
    errorMessageBox.classList.add('alert', 'alert-danger');
    errorMessageBox.innerText = message;

    return errorMessageBox;
}


function getUsers() {
   return fetch(API_URL) 
   .then(response => {
    if (!response.ok) {
        throw new Error('Користувачі не знайдені :(');
    }

    return response.json()
   })
   .then((data) => {
    data.forEach(user => {
        const div = createUser(user);
        usersContainer.appendChild(div);
    })
   })
   .catch(error => {
    const errorMessageBox = createErrorMessageBox(error.message);
    usersContainer.appendChild(errorMessageBox);
   })
}

getUsers();



