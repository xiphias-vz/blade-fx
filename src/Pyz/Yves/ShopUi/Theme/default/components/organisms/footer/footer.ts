window.addEventListener('DOMContentLoaded', (e) => {
    let slot = <HTMLElement>document.querySelector('.contact-info-slot');
    if(slot !== null) {
        let slotInfo = slot.cloneNode(true);
        slotInfo.classList.remove('is-hidden');
        let footer = document.querySelector('footer');
        let contactStoreInfo = footer.querySelector('.contact-store-info');
        slot.style.display = 'none';
        contactStoreInfo.prepend(slotInfo);
        checkAndSetFooter();
    }
    checkAndSetFooter();
});

window.addEventListener('resize', function(event){
    checkAndSetFooter();
});

function checkAndSetFooter(){
    var width = window.innerWidth;

    var elementTextCenter = document.querySelector(".copyright-build-with");
    var footerNav = document.querySelector("#footerNav");
    if(width > 575){
       elementTextCenter.classList.add("text-center");
       footerNav.classList.add("footer__navigation");
    }
    else {
       elementTextCenter.classList.remove("text-center");
       footerNav.classList.remove("footer__navigation");
    }
}
