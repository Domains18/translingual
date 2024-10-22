document.getElementById('translateBtn').addEventListener('click', async () => {
    const inputText = document.getElementById('inputText').value;
    const translateBtn = document.getElementById('translateBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const outputDiv = document.getElementById('translationOutput');

    if (!inputText) {
        alert('Please enter some text.');
        return;
    }

    translateBtn.disabled = true;
    loadingSpinner.style.display = 'block';
    outputDiv.innerHTML = '';

    try {
        const response = await fetch('http://localhost:3000/api/app/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                threadId: 'thread_PLfrTPqCNPxeZptOxzhqZEsV',  
                message: inputText
            }),
        });

        const data = await response.json();
        const messages = data.messages[0][0].text.value;

        spellOutText(messages, outputDiv);
    } catch (error) {
        outputDiv.innerHTML = 'Error processing request.';
    } finally {
        translateBtn.disabled = false;
        loadingSpinner.style.display = 'none';
    }
});

function spellOutText(text, outputDiv) {
    const words = text.split(' ');
    let wordIndex = 0;

    const interval = setInterval(() => {
        if (wordIndex < words.length) {
            outputDiv.innerHTML += words[wordIndex] + ' ';
            wordIndex++;
        } else {
            clearInterval(interval);
        }
    }, 100); 
}
