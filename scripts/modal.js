const alertRegisterSucess = `
<aside class="alert">
    <div>
        <img src="../../assets/MITO.svg">
        <h2> Sua conta foi criada com sucesso! </h2>
    </div>
    <p>
        Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login:
        <a href="../login/index.html"> Acessar página de login </a>
    </p>
</aside>
`;

const alertDeletedSucess = `
<aside class="alert">
    <div>
        <img src="../../assets/MITO.svg">
        <h2> Post deletado com sucesso! </h2>
    </div>
    <p>
    O post selecionado para exlusão foi deletado, a partir de agora não aparecerá no seu feed 
    </p>
</aside>
`;


const createPostModal = `
<div class="containerModal ">
    <form>
        <div class="modalHeader">
            <h2> Criando novo post </h2>
            <button class="close-button" data-modal="containerModal" type="button"> X </button>
        </div>
        <div class="modalInfo">
            <div class="modalInfo">
                <h3> Título do post</h3>
                <input id="post-title" type="text" class="font-text-1 color-grey-1">
            </div>
            <div class="modalInfo">
                <div class="modalInfo">
                    <h3> Conteúdo do post</h3>
                    <textarea id="post-content" class="font-text-1 color-grey-1"></textarea>
                </div>
                <div class="container-button">
                    <button type="button" class="save-button"> Salvar </button>
                    <button type="button" data-modal="containerModal" class="cancel-button"> Cancelar </button>
                </div>
            </div>
        </div>
    </form>
</div>
`
export const acessPostModal = (post, date) =>`
<div class="postModal">
    <article>
        <div class="profile-box-modal">
            <div class="profile">
                <img src="${post.user.avatar}">
                <h2 class="font-title-5-bold color-grey-1">${post.user.username}</h2>
                <span class="font-title-3 color-grey-6"> | </span>
                <span class="font-title-5 color-grey-4"> ${date} </span>
            </div>
            <div>
                <button data-modal="postModal" class="button-close-modal"> x </button>
            </div>
        </div>
        <div class="post-body">
            <h2 class="">
               ${post.title}
            </h2>
            <p class="">
               ${post.content}
            </p>
        </div>
    </article>
</div>
`
export const editPostModal = `
<div class="containerModal ">
    <form>
        <div class="modalHeader">
            <h2 class="font-title-3"> Edição </h2>
            <button class="close-button" data-modal="containerModal" type="button"> X </button>
        </div>
        <div class="modalInfo">
            <div class="modalInfo">
                <h3 class="font-title-4"> Título do post</h3>
                <input id="edit-title" type="text" class="color-text-1 color-grey-1" placehouder="Digite seu texto aqui..">
            </div>
            <div class="modalInfo">
                <div class="modalInfo">
                    <h3 class="font-title-4"> Conteúdo do post</h3>
                    <textarea id="edit-content" class="font-title-5-bold color-grey-3"></textarea>
                </div>
                <div class="container-button">
                    <button id="submit-edition" type="button" class="button-save-edit"> Salvar Alterações </button>
                    <button data-modal="postModal" type="button" class="button-close-edit"> Cancelar </button>
                </div>
            </div>
        </div>
    </form>
</div>
`;

export const deletePostModal = `
<aside class="remove-modal">
    <form>
        <div class="modalHeader">
            <h2 class="font-title-3"> Confirmação de exclusão </h2>
            <button data-action="close-modal" class="button-close-modal" type="button"> x </button>
        </div>
        <div class="text-info">  
            <h1 class="font-title-2 color-grey-1"> Tem certeza que deseja excluir este post? </h1>
            <p class="font-text-1-bold color-grey-3"> Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir </p>
        </div>
        <div class="buttons-delet-post">
            <button type="button" data-action="close-modal" class="cancel-button"> Cancelar </button>
            <button type="submit" data-action="delete-post" class="button-delete"> Sim, excluir esse post </button>
        </div>
    </form>
</aside>
`;

export { alertRegisterSucess, alertDeletedSucess ,createPostModal };
