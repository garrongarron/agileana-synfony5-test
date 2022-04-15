import eventBus from "../../EventBus.js"
import film from "../../services/films.js"
import usePromise from "../../services/usePromise.js"

function MovieLink({title, date, id}){
    this.enableEvents(['click'])
    this.goto = (e)=>{
        eventBus.dispatch('goto', )
    }
    return `<li>
        <a href="#Movie/${id}" click="goto">${title}</a> - ${date.slice(0,4)}
    </li>`
}
function MovieList(){
    this.enableSubComponents({MovieLink})
    const [list, setList] = this.useState()

    this.useEffect(async () => {
        const [payload, error] = await usePromise(film.getAll())
        setList(payload.results)
    }, [])

    return `<ul>
        ${list?list.map(movie=>`<MovieLink title="${movie.title}" date="${movie.release_date}" id="${movie.url.split('/').reverse()[1]}"'/>`):'loading...'}
    </ul>`
}
export default function Movies(){
    this.enableSubComponents({MovieList})
    return `<div>
        <h1>Star Wars Movies</h1>
        <MovieList />
    </div>`
}