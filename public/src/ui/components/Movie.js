import film from "../../services/films.js";
import character from "../../services/character.js";
import usePromise from "../../services/usePromise.js";
import eventBus from "../../EventBus.js";

function CharacterLink({id}){
    this.enableEvents(['click'])
    this.getName = async (e) =>{
        if(!e.target.hasAttribute("name")){
            e.preventDefault()
            alert(`Wait a moment until load the character's name, then click again to read mor details`)
        } else {
            eventBus.dispatch('goto', )
        }
        const [payload, error] = await usePromise(character.getById(id))
        e.target.innerHTML = payload.name
        e.target.setAttribute("name", payload.name)
    }
    return `<li><a href="#Character/${id}" click="getName">Character #${id}</a></li>`
}


let refresh
export default function Movie({params}) {
    console.log(params);
    const [data, setData] = this.useState()
    this.useEffect(async ()=>{
        const [payload, error] = await usePromise(film.getById(params))
        setData(payload)
    })
    this.enableSubComponents({CharacterLink})
    refresh = setData
    return `<div>
        ${!data?'Loading...'
        :`
        <strong>Title</strong> <h1>${data.title}</h1><br/>
        <strong>Episode</strong> <span>${data.episode_id}</span><br/>
        <strong>Description</strong> <span>${data.opening_crawl}</span><br/>
        <strong>Director</strong> <span>${data.director}</span><br/>
        <strong>Producer</strong> <span>${data.producer}</span><br/>
        <strong>Release</strong> <span>${data.release_date}</span><br/>
        <strong>Description</strong> <span>${data.opening_crawl}</span><br/>
        <strong>Characters</strong> <ul>${data.characters.map(character=>{
            return `<CharacterLink id="${character.split('/').reverse()[1]}"/>`
        })}</ul>

         Details: <pre>${JSON.stringify(data, null, 2)}</pre>`
        }</div>`
}