import './header.scss';

const button = document.querySelector('.js-header__navigation-trigger');
button.addEventListener("click", handleClick);

function handleClick() {
    console.log("Clicked!");

    this.removeEventListener("click", handleClick);
}
