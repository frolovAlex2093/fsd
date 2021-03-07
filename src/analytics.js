import * as $ from 'jquery'


function createAnalytics(){
    let counter = 0
    let Destroyed = false
    const listener = () => counter++

    document.addEventListener("click", listener)

    return{
        destroy(){
            removeEventListener("click", listener)
            Destroyed = true
        },

        getClick(){
            if (Destroyed){
                return "Analytics is destroyed"
            }
            return counter
        }
    }
}

window.analytics = createAnalytics()