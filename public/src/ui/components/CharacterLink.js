import eventBus from "../../EventBus.js"

export default function CharacterLink(prop){
    this.select = (e) =>{
        let arr = prop.url.split('/')
        eventBus.dispatch('characterSelected', arr[arr.length-2])
        e.preventDefault()
    }
    this.enableEvents(['click'])
    return `<li><a href="#" click="select">${prop.url}</a></li>`
}