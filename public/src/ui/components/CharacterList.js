import eventBus from "../../EventBus.js"
import CharacterLink from './CharacterLink.js'

let refresh = null
eventBus.subscribe('characterList',async (payload)=>{
    refresh(payload)
})

export default function CharacterList(){
    const [data, setData] = this.useState([])
    this.enableSubComponents({CharacterLink})
    refresh = setData
    return `<div>
        <h2>Chatacters</h2>
        <ul>
            ${data.map(character=>`<CharacterLink url="${character}"/>`)}
        </ul>
    </div>`
}