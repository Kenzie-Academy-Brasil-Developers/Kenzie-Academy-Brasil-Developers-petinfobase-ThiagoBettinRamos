import { apiRegister } from "../../scripts/api.js";

const inputUser = document.getElementById("user")
const inputEmail = document.getElementById("email")
const inputLink = document.getElementById("link")
const inputPassword = document.getElementById("password")

const allInputs = [inputUser, inputEmail, inputLink, inputPassword]
const registerButton = document.getElementById('register');

// Habilita/Desabilita botão de registrar
allInputs.forEach(input => {
    input.addEventListener('input', () => {
        let allLengths = [inputUser.value.length, inputEmail.value.length, inputLink.value.length, inputPassword.value.length]
        if (allLengths.includes(0)) {
            registerButton.classList = 'register font-title-4 disabled'
        }
        else {
            registerButton.classList = 'register font-title-4'
        }
    })
})

registerButton.addEventListener('click', async () => {
    try {
        registerButton.innerHTML = '<img class="spinning" src="../../assets/spinner.svg">'
        await apiRegister(inputUser.value, inputEmail.value, inputPassword.value, inputLink.value);
    } finally {
        registerButton.innerHTML = 'Cadastrar'
    }
})