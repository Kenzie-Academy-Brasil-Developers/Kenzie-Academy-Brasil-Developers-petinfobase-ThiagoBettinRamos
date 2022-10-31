const apiUrl = "http://localhost:3333/"
/* import {alertRegisterSucess} from "./modal.js" */

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

export async function apiRegister(user, email, password, avatar){
    let registerBody = {
        "username" : user,
        "email"    : email,
        "password" : password,
        "avatar"   : avatar
    }

    try{
        let requisition = await fetch(`${apiUrl}users/create`, {
            method : "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(registerBody)
        })
        if(requisition.ok){
            document.body.insertAdjacentHTML("beforeend", alertRegisterSucess)
            setTimeout(() => {
                window.location.assign("../login/index.html")
            }, 5000);
           return requisition.json()
        }
    }
    catch(error){
        console.log(error)
    }
}

export async function apiLogin(email, password){
    let loginBody = {
        "email": email,
        "password": password
    }

    try{
        let requisition = await fetch(`${apiUrl}login`, {
            method : "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(loginBody)
        })
        if(requisition.ok){
            let token = await requisition.json()
            localStorage.setItem('@ThiagoBettinRamos:kenziepets:user-token', JSON.stringify(token))
            return token
        }else{
            let response = await requisition.json()
            return response.message
        }
    }catch(error){
        console.log(error)
    }
}

/* console.log(JSON.parse(localStorage.getItem('@ThiagoBettinRamos:kenziepets:user-token')).token) */

export async function apiGetUser(token){
    try{
        let requisition = await fetch(`${apiUrl}users/profile`, {
            method : "GET",
            headers : {
                "Authorization": `Bearer ${token}`
            }
        })

        if(requisition.ok){
            let userInfo = await requisition.json()
            return userInfo

        }
    }catch(error){
        console.log(error)
    }
}

export async function apiCreatePost(token, title, content){
    let postBody = {
        "title": title,
        "content": content
    }
    console.log(postBody)
    try{
        console.log(`${apiUrl}posts/create`)
        let requisition = await fetch(`${apiUrl}posts/create`, {
            method : "POST",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body : JSON.stringify(postBody)
        })
        if(requisition.ok){
            console.log(requisition)
        }
    }catch(error){
        console.log(error)
    }
}

export async function apiGetPosts(token){
    try{
        let requisition = await fetch(`${apiUrl}posts`, {
            method : "GET",
            headers : {
                "Authorization": `Bearer ${token}`
            }
        })
        if(requisition.ok){
            let posts = await requisition.json();
            return posts
        }
    }catch(error){
        console.log(error)
    }
}

export async function apiEditPost(id, token, title, content){
    let postBody = {
        "title": title,
        "content": content
    }

    try{
        let requisition = await fetch(`${apiUrl}posts/${id}`, {
            method : "PATCH",
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body : JSON.stringify(postBody)
        })
        if(requisition.ok){
            console.log(requisition)
        }
    }catch(error){
        console.log(error)
    }
}

export async function apiDeletePost(id, token){
    try{
        let requisition = await fetch(`${apiUrl}posts/${id}`,{
            method : "DELETE",
            headers : {
                "Authorization": `Bearer ${token}`
            }
        } )
        if(requisition.ok){
            console.log(requisition)
        }     
    }catch(error){
        console.log(error)
    }
}