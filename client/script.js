import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');
let loadInterval;

function loader(element){
    element.textContent = '';
    loadInterval = setInterval(()=>{
        element.textContent += '.';
        if (element.textContent.length > 4){
            element.textContent = "";
        }
    }, 300);
}

function typeText(element, text){
    let i = 0;
    let interval = setInterval(()=>{
        element.textContent += text[i];
        i++;
        if (i >= text.length){
            clearInterval(interval);
        }
    }, 20);
}

function generateUniqueId(){
    const timestamp = new Date();
    const randomNumber = Math.random();
    const hexaString = randomNumber.toString(16);

    return `id-${timestamp}-${hexaString}`;
    // return timestamp.getTime() + hexaString.slice(2);
}

function chatStripe(isAi, value, uniqueId) {
    return (
        ` <div class="wrapper ${isAi && 'ai'}">
            <div class="chat">
                <div class="profile">
                    <img src="${isAi ? bot : user}" alt="profile"/>
                </div>
                <div class="message" id=${uniqueId}>${value}</div>
            </div>
        </div>`
    );
}
const handleSubmit = async (e)=>{
    e.preventDefault();
    const data = FormData(form);
    chatContainer.innerHTML += chatStripe(false, data.get('prompt'));
    form.reset();

    // bot chatstripe
    const uniqueId = generateUniqueId();
    chatContainer.innerHTMl += chatStripe(true, " ", uniqueId);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    const messageDiv = document.get(uniqueId);
    loader(messageDiv);

    form.addEventListener('submit', handleSubmit);
    form.addEventListener('keyup', (e) =>{
        if(e.keyCode === 13){
            handleSubmit(e);
        }
    });
}
