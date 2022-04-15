import domain from "./domain.js"

class Character {
    constructor() {
        this.url = `${domain}/api`
    }
    getAll(params = null) {
        let page = params?params:''
        return fetch(
            this.url, {
                method: "POST",
                body: JSON.stringify({ "url": "https://swapi.dev/api/people/"+page })
            }).then(a => a.json())
    }
    
    getById(id){
        return fetch(
            this.url, {
                method: "POST",
                body: JSON.stringify({ "url": "https://swapi.dev/api/people/"+id })
            }).then(a => a.json())
    }
}
const character = new Character()
export default character