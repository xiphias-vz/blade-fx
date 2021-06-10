window.addEventListener('DOMContentLoaded', (e) => {
    let slot = <HTMLElement>document.querySelector('.contact-info-slot');
    if(slot !== null) {
        let slotInfo = slot.cloneNode(true);
        let footer = document.querySelector('footer');
        let contactStoreInfo = footer.querySelector('.contact-store-info');
        slot.style.display = 'none';
        contactStoreInfo.prepend(slotInfo)
    }
});
