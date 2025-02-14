// script.js

const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const modelSelect = document.getElementById('model-select');
const loadingIndicator = document.getElementById('loading');

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
    
    loadingIndicator.style.display = 'block';

    try {
        const response = await fetch('https://api.1min.ai/v1/chat/completions', { // 実際のエンドポイントに置き換えてください
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: selectedModel,
                messages: [
                    { role: "user", content: message }
                ]
            })
        });

        const data = await response.json();
        if (response.ok && data.choices && data.choices.length > 0) {
            const reply = data.choices[0].message.content.trim();
            addMessage('ai', reply);
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
