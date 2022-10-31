import { apiLogin } from "../../scripts/api.js";

const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const loginButton = document.getElementById('login');

const allInputs = [inputEmail, inputPassword];

//Habilitar/desabilitar botão de login
allInputs.forEach(input => {
    input.addEventListener('input', () => {
        let allLengths = [inputEmail.value.length, inputPassword.value.length]
        if (allLengths.includes(0)) {
            loginButton.classList = 'back-login font-title-4 disabled'
        }
        else {
            loginButton.classList = 'back-login font-title-4'
        }
    })
})

// EVento de login do botão
loginButton.addEventListener("click", async () => {
    let span = document.querySelector('.spanAlert')
    inputEmail.classList = 'register-inputs'
    inputPassword.classList = 'register-inputs'

    loginButton.innerHTML = '<img class="spinning" src="../../assets/spinner.svg">'

    if (span) {
        console.log('if')
        span.remove()
    };

    try {
        let response = await apiLogin(inputEmail.value, inputPassword.value)

        if (response === "O email está incorreto") {
            inputEmail.insertAdjacentHTML('afterend', `
        <span class="font-text-2 color-alert-1 spanAlert"> O email está incorreto </span>
        `);
            inputEmail.classList = 'register-inputs invalid'
        }
        else if (response === "A senha está incorreta") {
            inputPassword.insertAdjacentHTML('afterend', `
        <span class="font-text-2 color-alert-1 spanAlert"> A senha está incorreta</span>
        `);
            inputPassword.classList = 'register-inputs invalid'
        }
        else {
            console.log("ok")
            window.location.assign('../home/index.html')
        }
    }
    finally {
        loginButton.innerHTML = 'Acessar'
    }
})