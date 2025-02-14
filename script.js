// script.js

const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const modelSelect = document.getElementById('model-select');

// 入力フィールドでEnterキーを押したときにメッセージを送信
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

// メッセージをチャットコンテナに追加
function addMessage(sender, text) {
    const messageEl = document.createElement('div');
    messageEl.classList.add('message', sender);
    messageEl.textContent = (sender === 'user' ? 'ユーザー: ' : 'AI: ') + text;
    chatContainer.appendChild(messageEl);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// APIリクエストを送信
async function sendMessage(message) {
    const selectedModel = modelSelect.value;
    const apiKey = 'Y3e3f3da3a4de444b72a434aa5123d539a8925c32c67a79f13ae992a26473120e'; // **注意: 公開しないでください**

    try {
        const response = await fetch('https://api.1min.ai/conversation', { // 実際のエンドポイントに置き換えてください
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                message: message,
                model: selectedModel
            })
        });

        if (response.ok) {
            const data = await response.json();
            if (data.reply) {
                addMessage('ai', data.reply);
            } else {
                addMessage('ai', 'AIからの応答がありません。');
            }
        } else {
            addMessage('ai', `エラーが発生しました: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error:', error);
        addMessage('ai', 'エラーが発生しました。');
    }
}
