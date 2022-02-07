window.addEventListener('DOMContentLoaded', (e) => {
    checkAndSetNavigationLinksList();
});

window.addEventListener('resize', function(event){
    checkAndSetNavigationLinksList();
});

function checkAndSetNavigationLinksList(){
    var width = window.innerWidth;
    var element = document.querySelector("#unorderedListId");
    if(width > 575){
        element.classList.add("inline-list");
    }
    else {
        element.classList.remove("inline-list");
    }
}
