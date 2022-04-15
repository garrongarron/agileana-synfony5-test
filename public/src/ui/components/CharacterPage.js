import character from "../../services/character.js";
import usePromise from "../../services/usePromise.js";

export default function CharacterPage({params}){
    const [data, setData] = this.useState()
    this.useEffect(async()=>{
        const [payload, error] = await usePromise(character.getById(params))
        setData(payload)
    })
    return `<div>
        <h1>Character page: ${!data?'...':data.name}</h1>
        ${
            !data
            ?'Loading...'
            :`Details: <pre>${JSON.stringify(data, null, 2)}</pre>`
        }
    </div>`
}