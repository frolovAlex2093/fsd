const quantitys = document.querySelectorAll(".dropdown-item-quantity")
const items = document.querySelectorAll('.dropdown-item')
const str = document.querySelector('.dropdown-itog-text')
const names = document.querySelectorAll('.dropdown-item-name')
const row = document.querySelector('.dropdown-row')
const optBtn = document.querySelector('.dropdown-option')

let st = ''

row.addEventListener('click', () => {

    if(document.querySelector('.dropdown-items').classList.contains('show')){
        document.querySelector('.dropdown-items').classList.remove('show')
    }else {
        document.querySelector('.dropdown-items').classList.add('show')
    }
})

optBtn.firstElementChild.addEventListener('click',(event) => {
    for (const quantity of quantitys) {
        quantity.innerHTML = 0
    }
})

optBtn.lastElementChild.addEventListener('click', () => {
    for (let i = 0; i < names.length; i++) {
        if(parseInt(quantitys[i].innerHTML) > 0) {
            st = st + " " + names[i].innerHTML + " " + quantitys[i].innerHTML
        }
    }
    str.innerHTML = st
    st = ""
})



for (const item of items) {
    item.addEventListener('click', (event) =>{
        let ch = parseInt(item.querySelector('.dropdown-item-quantity').innerHTML)
        if(event.target.classList.contains('dropdown-item-plus')){
            ch++
            console.log(ch)
        }else if(event.target.classList.contains('dropdown-item-minus')){
            ch--
            if(ch <= 0){
                ch = 0;
            }
        }
        item.querySelector('.dropdown-item-quantity').innerHTML = String(ch)
    })
}



