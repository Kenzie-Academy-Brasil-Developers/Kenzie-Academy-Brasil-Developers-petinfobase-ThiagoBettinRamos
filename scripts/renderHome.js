import { createPostModal, acessPostModal, editPostModal, deletePostModal } from "./modal.js";
import { apiCreatePost, apiEditPost, apiDeletePost } from "./api.js";
import { token, user } from "../pages/home/index.js";


let renderedPosts = []

export function renderProfile(user) {
    let userWrapper = `
    <img src="${user.avatar}" alt="Foto de perfil de ${user.username}">
    <div class="options">
        <span class="usertitle font-text-2 color-grey-1"> @${user.username}</span>
        <div class="bottom">
            <div class="exit-icon"></div>
            <span class="font-text-2 color-grey-1" id="exit-button"> Sair da conta </span>
        </div>
    </div>
    `

    document.querySelector('.user-wrapper').innerHTML = userWrapper;

    const exitButton = document.getElementById('exit-button').addEventListener('click', () => {
        localStorage.removeItem('@ThiagoBettinRamos:kenziepets:user-token');
        window.location.assign('../login/index.html');
    })
}

export function renderPosts(posts) {
    posts.forEach(post => {
        if (post.user.id === user.id) {
            renderedPosts.push(post)
            let date = fixDate(post.createdAt)
            let smallContent = post.content.slice(0, 145) + "..."
            let htmlPost = `
                <article>
                    <div class="container">
                        <div class="profile-box">
                            <div class="profile">
                                <img src="${post.user.avatar}">
                                <h2 class="font-title-5-bold color-grey-1">${post.user.username}</h2>
                            </div>
                            <span class="font-title-3 color-grey-6"> | </span>
                            <span class="font-title-5 color-grey-4"> ${date} </span>
                        </div>
                        <div>
                            <button data-action="edit" data-post-id="${post.id}" class="edit font-title-5"> Editar </button>
                            <button data-action="delete" data-post-id="${post.id}" class="trash font-title-5"> Excluir </button>
                        </div>
                    </div>
                    <div class="description">
                        <h2 class="font-title-2-bold color-grey-1">
                            ${post.title}
                        </h2>
                        <p class="font-text-1-bold color-grey-3">
                            ${smallContent}
                        </p>
                        <button class="link font-title-4 " id="${post.id}"> Acessar publicação </button>
                    </div>
                </article>
                `

            document.querySelector("main").insertAdjacentHTML("afterbegin", htmlPost)
            let editButton = document.querySelector('[data-action="edit"]')
            let deleteButton = document.querySelector('[data-action="delete"]')
            editPostEvent(editButton)
            deletePostEvent(deleteButton)
            // acess post event
            document.getElementById(`${post.id}`).addEventListener("click", (e) => {
                let currentPost = renderedPosts.find(item => item.id === e.target.id)
                document.body.insertAdjacentHTML("afterbegin", acessPostModal(currentPost, date))
                document.querySelector('[data-modal="postModal"]').addEventListener('click', (e) => {
                    document.querySelector(`.${e.target.dataset.modal}`).remove()
                })
            })
        }
        else {
            renderedPosts.push(post)
            let date = fixDate(post.createdAt)
            let smallContent = post.content.slice(0, 145) + "..."
            let htmlPost = `
        <article>
            <div class="container">
                <div class="profile-box">
                    <div class="profile">
                        <img src="${post.user.avatar}">
                        <h2 class="font-title-5-bold color-grey-1">${post.user.username}</h2>
                    </div>
                    <span class="font-title-3 color-grey-6"> | </span>
                    <span class="font-title-5 color-grey-4"> ${date} </span>
                </div>
            </div>
            <div class="description">
                <h2 class="font-title-2-bold color-grey-1">
                    ${post.title}
                </h2>
                <p class="font-text-1-bold color-grey-3">
                    ${smallContent}
                </p>
                <button class="link font-title-4 " id="${post.id}"> Acessar publicação </button>
            </div>
        </article>
        `

            document.querySelector("main").insertAdjacentHTML("afterbegin", htmlPost)
            document.getElementById(`${post.id}`).addEventListener("click", (e) => {
                let currentPost = renderedPosts.find(item => item.id === e.target.id)
                document.body.insertAdjacentHTML("afterbegin", acessPostModal(currentPost, date))
                document.querySelector('[data-modal="postModal"]').addEventListener('click', (e) => {
                    document.querySelector(`.${e.target.dataset.modal}`).remove()
                })
            })
        }
    })

}

const buttonCreate = document.getElementById("post-create")
buttonCreate.addEventListener("click", (e) => {
    document.body.insertAdjacentHTML("afterbegin", createPostModal)
    let modal = document.querySelector(".containerModal")
    let buttons = Array.from(modal.querySelectorAll("button"))
    closeButtonEvent(buttons[0])
    submitPostEvent(buttons[1])
    closeButtonEvent(buttons[2])
})

function closeButtonEvent(button) {
    button.addEventListener("click", (e) => {
        let modal = e.target.dataset.modal
        document.querySelector(`.${modal}`).remove()
    })
}

function submitPostEvent(button) {
    button.addEventListener("click", (e) => {
        let modal = document.querySelector(".containerModal")
        let title = modal.querySelector("#post-title").value
        let content = modal.querySelector("#post-content").value
        apiCreatePost(token.token, title, content)
        window.location.reload()
    })
}

function fixDate(date) {
    let months = [0, "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    let month = months[Number(date.slice(5, 7))]
    let year = date.slice(0, 4)
    return `${month} de ${year}`
}

function editPostEvent(button){
    button.addEventListener("click", (e) => {
        let currentPost = renderedPosts.find(item => item.id === e.target.dataset.postId)
        document.body.insertAdjacentHTML('afterbegin', editPostModal)
        document.querySelector('#edit-title').value = currentPost.title
        document.querySelector('#edit-content').value = currentPost.content
        let title = document.querySelector('#edit-title')
        let content = document.querySelector('#edit-content')

        let closeButtons = document.querySelectorAll('[data-modal="containerModal"]');
        closeButtons.forEach(button => button.addEventListener('click', (e) => {
            document.querySelector(`.${e.target.dataset.modal}`).remove()
        }))

        let submitButton = document.querySelector('#submit-edition')
        submitButton.addEventListener('click', () => {
            apiEditPost(currentPost.id, token.token, title.value, content.value)
            window.location.reload()
        })
    })
}

function deletePostEvent(button){
    button.addEventListener("click", (e) => {
        document.body.insertAdjacentHTML('afterbegin', deletePostModal);
        let closeButtons = document.querySelectorAll('[data-action="close-modal"]');
        closeButtons.forEach(button => button.addEventListener('click', (e) => {
            document.querySelector(`.remove-modal`).remove()
        }))
        let submitButton = document.querySelector('[data-action="delete-post"]')
        submitButton.addEventListener('click', () => {
            apiDeletePost(e.target.dataset.postId, token.token)
        })

        
    })
}