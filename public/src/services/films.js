import domain from "./domain.js"
class Films {
    constructor() {
        this.url = `${domain}/api`
    }
    getAll() {
        return fetch(
            this.url, {
                method: "POST",
                body: JSON.stringify({ "url": "https://swapi.dev/api/films/" })
            }).then(a => a.json())
    }
    getById(id){
        return fetch(
            this.url, {
                method: "POST",
                body: JSON.stringify({ "url": "https://swapi.dev/api/films/"+id })
            }).then(a => a.json())
    }
}
const film = new Films()
export default film