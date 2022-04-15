import eventBus from "../../EventBus.js"

function NavBar(){
    this.enableEvents(['click'])
    this.goto = () =>{
        eventBus.dispatch('goto', )
    }
    return `<ul>
        <li><a href="#Movies" click="goto">Movies</a></li>
        <li><a href="#Characters" click="goto">Characters</a></li>
    </ul>`
}

export default NavBar