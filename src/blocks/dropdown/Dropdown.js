const colvos = document.querySelectorAll(".colvo")
const items = document.querySelectorAll('.item')
const clearBtn = document.querySelector('.clear')
const primBtn = document.querySelector('.prim')
const str = document.querySelector('.itog')
const names = document.querySelectorAll('.name')

let st = ''

//console.log(parseInt(colvos[0].innerHTML))

clearBtn.addEventListener('click', () => {
    for (const colvo of colvos) {
        colvo.innerHTML = 0
    }
})

primBtn.addEventListener('click', () => {
    for (let i = 0; i < names.length; i++) {
        if(parseInt(colvos[i].innerHTML) > 0) {
            st = st + " " + names[i].innerHTML + " " + colvos[i].innerHTML
        }
    }
    str.innerHTML = st
    st = ""
})



for (const item of items) {
    item.addEventListener('click', (event) =>{
        let ch = parseInt(item.querySelector('.colvo').innerHTML)
        if(event.target.classList.contains('pl')){
            ch++
            console.log(ch)
        }else if(event.target.classList.contains('mn')){
            ch--
            if(ch <= 0){
                ch = 0;
            }
        }
        item.querySelector('.colvo').innerHTML = String(ch)
    })
}



