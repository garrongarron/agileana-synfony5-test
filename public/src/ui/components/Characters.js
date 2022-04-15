import eventBus from "../../EventBus.js";
import character from "../../services/character.js";
import usePromise from "../../services/usePromise.js";

function MovieLink({id}){
    this.enableEvents(['click'])
    this.goto = () =>{
        eventBus.dispatch('goto', )
    }
    return `<a href="#Movie/${id}"  click="goto">Movie #${id}</a>`
}

function SingleCharacter({id, name, species, films, gender}){
    this.enableEvents(['click'])
    this.enableSubComponents({MovieLink})
    this.goto = () =>{
        eventBus.dispatch('goto', )
    }
    return `<div style="border:1px solid red; margin: 1rem; padding: 1rem">
        <strong>id</strong> <span>${id}</span><br/>
        <strong>name</strong> <span><a href="#Character/${id}" click="goto">${name}</a></span><br/>
        <strong>species</strong> <span>${species}</span><br/>
        <strong>gender</strong> <span>${gender}</span><br/>
        <strong>films</strong> 
        <span>
        ${
            films.split(',').map(movie=>` <MovieLink id="${movie.split('/').reverse()[1]}"/> `)
        }
        </span><br/>
    </div>`
}


let payloadVar = null
export default function Characters({params}){
    const [data, setData] = this.useState()
    this.useEffect(async()=>{
        const [payload, error] = await usePromise(character.getAll(params))
        payloadVar = payload
        setData(payload.results)
    })
    this.enableSubComponents({SingleCharacter})
    this.enableEvents(['click'])
    this.goto = () =>{
        eventBus.dispatch('goto', )
    }
    return `<div>
        <h1>Characters page:</h1>
        ${!payloadVar?.previous?'':`<a href="#Characters/${payloadVar.previous.split('/').reverse()[0]}" click="goto">prev</a>`}
        ${!payloadVar?.next?'':`<a href="#Characters/${payloadVar.next.split('/').reverse()[0]}" click="goto">next</a>`}
        ${
            !data
            ?'Loading...'
            :data.map(character=>`
                <SingleCharacter 
                id="${character.url.split('/').reverse()[1]}" 
                name="${character.name}" 
                species="${character.species.join(',')}" 
                films="${character.films.join(',')}" 
                gender="${character.gender}" />
            `)
        }
        ${!payloadVar?.previous?'':`<a href="#Characters/${payloadVar.previous.split('/').reverse()[0]}" click="goto">prev</a>`}
        ${!payloadVar?.next?'':`<a href="#Characters/${payloadVar.next.split('/').reverse()[0]}" click="goto">next</a>`}
    </div>`
}