// script.js
document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    const userInput = document.getElementById('user-input');
    const modelSelect = document.getElementById('model-select');
    const loadingIndicator = document.getElementById('loading');

    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const message = userInput.value.trim();
            if (message !== "") {
                addMessage('user', message);
                userInput.value = '';
                sendMessage(message);
            }
        }
    });
});

function addMessage(sender, text) {
    const chatContainer = document.getElementById('chat-container');
    const messageEl = document.createElement('div');
    messageEl.classList.add('message', sender);
    messageEl.textContent = (sender === 'user' ? 'ユーザー: ' : 'AI: ') + text;
    chatContainer.appendChild(messageEl);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function sendMessage(message) {
    const selectedModel = document.getElementById('model-select').value;
    const apiKey = 'Y3e3f3da3a4de444b72a434aa5123d539a8925c32c67a79f13ae992a26473120e'; // **注意: 公開しないでください**
    const loadingIndicator = document.getElementById('loading');

    loadingIndicator.style.display = 'block';

    try {
        const response = await fetch('https://api.1min.ai/api/conversations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'API-KEY': apiKey
            },
            body: JSON.stringify({
                title: "User Chat",
                type: "CHAT_WITH_AI",
                model: selectedModel,
                fileList: [],
                messages: [
                    { role: "user", content: message }
                ]
            })
        });

        const data = await response.json();

        if (response.ok && data.response) {
            addMessage('ai', data.response.trim());
        } else {
            const errorMessage = data.error ? data.error.message : 'AIからの応答がありません。';
            addMessage('ai', `エラー: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error:', error);
        addMessage('ai', 'エラーが発生しました。');
    } finally {
        loadingIndicator.style.display = 'none';
    }
}
