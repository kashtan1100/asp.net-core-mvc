const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
    modal.classList.toggle("is-open");
}

// DAY 1
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const logInInput = document.querySelector('#login'); // для поля ввода 
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');

let login = localStorage.getItem('gloDelivery'); // переменная для авторизации 
console.log(login);

/*
modalAuth.classList.add('hello'); // добавляет класс
console.log(modalAuth);
console.log(modalAuth.classList.contains('hello')); // проверить есть ли такой класс
modalAuth.classList.remove('hello'); // удаляет класс
*/

function toggleModalAuth() {
    modalAuth.classList.toggle('is-open');
}

/*
buttonAuth.addEventListener('click', toggleModalAuth);
closeAuth.addEventListener('click', toggleModalAuth);
*/
// когда пользователь авторизован 
function authorized() {
    // будем обнулять логин, вызывать проверку, скрывать все кнопки, добавлять кнопку авторизации
    function logOut() {
        login = null;
        localStorage.removeItem('gloDelivery'); // удаляем значение из localStorage
        // скрываем 
        buttonAuth.style.display = '';
        userName.style.display = '';
        buttonOut.style.display = '';

        buttonOut.removeEventListener('click', logOut);
        checkAuth(); // проверка
    }
    ////////////////////////
    console.log('Авторизован');

    userName.textContent = login; // чтобы введеный логин высветился  возле кнопки ВЫЙТИ

    buttonAuth.style.display = 'none'; // обращаемся к свойствам стилей 
    userName.style.display = 'inline';
    buttonOut.style.display = 'block'; // кнопка ВЫЙТИ ( чтобы она появилась )
    buttonOut.addEventListener('click', logOut);
}


function notAuthorized() {
    console.log('Не авторизован');

    function logIn(event) { // чтобы отменить перезагрузку браузера 
        event.preventDefault();
        login = logInInput.value;

        localStorage.setItem('gloDelivery', login);

        toggleModalAuth();

        buttonAuth.removeEventListener('click', toggleModalAuth);
        closeAuth.removeEventListener('click', toggleModalAuth);
        logInForm.removeEventListener('submit', logIn);
        logInForm.reset();
        checkAuth();
    }
    buttonAuth.addEventListener('click', toggleModalAuth);
    closeAuth.addEventListener('click', toggleModalAuth);
    logInForm.addEventListener('submit', logIn);
}

function checkAuth() {
    if (login) {
        authorized();
    } else {
        notAuthorized();
    }
}
checkAuth();