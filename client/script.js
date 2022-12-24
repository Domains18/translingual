import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chat_container = document.querySelector('#chat_container');
let loadInterval;

function loader(element){
    element.textContent = '';
    loadInterval = setInterval(()=>{
        element.textContent += '.';
        if (element.textContent.length > 4){
            element.textContent = "";
        }
    }, 300)
}

function typeText(element, text){
    let i = 0;
    let interval = setInterval(()=>{
        element.textContent += text[i];
        i++;
        if (i >= text.length){
            clearInterval(interval);
        }
    }, 20)
}