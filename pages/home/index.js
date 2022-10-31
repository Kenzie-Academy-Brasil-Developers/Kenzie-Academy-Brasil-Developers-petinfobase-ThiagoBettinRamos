import { apiGetPosts, apiGetUser } from '../../scripts/api.js';
import { renderPosts, renderProfile } from '../../scripts/renderHome.js'

// Autenticação
export let token = JSON.parse(localStorage.getItem('@ThiagoBettinRamos:kenziepets:user-token'))

if(!token){
    window.location.assign('../login/index.html')
}

export let user  = await apiGetUser(token.token)
let posts = await apiGetPosts(token.token)

if(user === undefined){
    window.location.assign('../login/index.html')
}else{
    renderProfile(user)
    renderPosts(posts)
}