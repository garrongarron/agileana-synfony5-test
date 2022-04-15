import eventBus from "../EventBus.js"
import Movies from "../ui/components/Movies.js"
import Movie from "../ui/components/Movie.js"
import CharacterPage from "../ui/components/CharacterPage.js"
import Characters from "../ui/components/Characters.js"
import NavBar from '../ui/components/NavBar.js'

const routes = {
    '':"Movies",
    '#':"Movies",
    '#Movies':"Movies",
    '#Movie':"Movie",
    '#Character':"CharacterPage",
    '#Characters':"Characters",
}

let refresh = null
eventBus.subscribe('goto',() =>{
    setTimeout(() => {
        refresh(location.hash)
    }, 100);
})


function Router(){
    const [data, setData] = this.useState(location.hash)
    this.enableSubComponents({Movies, Movie, CharacterPage, Characters, NavBar})
    refresh = setData
    let page = data
    let params
    if(data.split('/').length > 1){
        let tmp = data.split('/')
        page = tmp.shift()
        params = tmp.join('/')
    }
    console.log(page, params);
    return `<div>
        <NavBar/>
        <${routes[page]} ${params?`params="${params}"`:''} />
    </div>`
}

export default Router