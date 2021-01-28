import '../sort/sort.scss';

const firstSortElement = document.querySelector("#firstSortElement select");
const secondSortElement = document.querySelector("#secondSortElement select");

function toggleSortElement(dispatchEvent) {
    if(firstSortElement != null && secondSortElement != null){
        firstSortElement.parentElement.addEventListener(dispatchEvent, () => {
            firstSortElement.removeAttribute("disabled");
            secondSortElement.setAttribute("disabled", "disabled");
        })
        secondSortElement.parentElement.addEventListener(dispatchEvent, () => {
            firstSortElement.setAttribute("disabled", "disabled");
            secondSortElement.removeAttribute("disabled");
        })
    }
}

window.onload = function() {
    toggleSortElement('mouseover')
    toggleSortElement('touchstart')
}


