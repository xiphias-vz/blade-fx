window.addEventListener('DOMContentLoaded', (e) => {
    let slot = <HTMLElement>document.querySelector('.contact-info-slot');
    let slotInfo = slot.cloneNode(true);
    if(slotInfo != null || slotInfo != undefined) {
        let footer = document.querySelector('footer');
        let contactStoreInfo = footer.querySelector('.contact-store-info');
        slot.style.display = 'none';
        contactStoreInfo.prepend(slotInfo)
    }
});
