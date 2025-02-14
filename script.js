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
        // Create a new conversation first
        const conversationResponse = await fetch('https://api.1min.ai/api/conversations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'API-KEY': apiKey
            },
            body: JSON.stringify({
                title: "User Chat",
                type: "CHAT_WITH_AI",
                model: selectedModel,
                fileList: []
            })
        });

        const conversationData = await conversationResponse.json();
        if (!conversationResponse.ok) {
            throw new Error(conversationData.error?.message || 'Failed to create conversation');
        }

        const conversationUUID = conversationData.conversation.uuid;

        // Then, send the message to this conversation
        const messageResponse = await fetch(`https://api.1min.ai/api/conversations/${conversationUUID}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'API-KEY': apiKey
            },
            body: JSON.stringify({
                role: "user",
                content: message
            })
        });

        const messageData = await messageResponse.json();
        if (!messageResponse.ok) {
            throw new Error(messageData.error?.message || 'Failed to send message');
        }

        if (messageData.response) {
            addMessage('ai', messageData.response.trim());
        } else {
            addMessage('ai', 'AIからの応答がありません。');
        }
    } catch (error) {
        console.error('Error:', error);
        addMessage('ai', `エラーが発生しました: ${error.message}`);
    } finally {
        loadingIndicator.style.display = 'none';
    }
}
