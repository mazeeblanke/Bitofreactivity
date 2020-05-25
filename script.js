
// initialize the component by getting the data
// observe the data
// we walk throught the DOM and refresh/update the elements
// if a change occurs, we refresh the DOM again


let rawData = document.querySelector('[x-data]').getAttribute('x-data')

let data = observe (rawData)

refreshDOM()

function observe (data) {
   return new Proxy(eval(`(${data})`), {
       set (target, key, value) {
        target[key] = value
        refreshDOM()      
       }
   })
}

function refreshDOM () {
    walkDOM(document.querySelector('[x-data]'), (el) => {
        if (el.hasAttribute('x-text')) {
            with (data) {
                el.innerText = eval(`${el.getAttribute('x-text')}`)
            }
        }
    })
}

function walkDOM (el, callback) {
    callback(el)
    let element = el.firstElementChild
    while (element) {
        walkDOM(element, callback)
        element = element.nextElementSibling
    }
}