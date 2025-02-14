const apiKey = 'Y3e3f3da3a4de444b72a434aa5123d539a8925c32c67a79f13ae992a26473120e'; // 取得したAPIキーをここに入力
const endpoint = 'https://api.1min.ai/api/features';

// 利用可能なモデルを取得してドロップダウンに追加
async function fetchModels() {
    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'API-KEY': apiKey,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        const modelSelect = document.getElementById('modelSelect');
        data.models.forEach(model => {
            const option = document.createElement('option');
            option.value = model.id;
            option.textContent = model.name;
            modelSelect.appendChild(option);
        });
    } catch (error) {
        console.error('モデルの取得中にエラーが発生しました:', error);
    }
}

// メッセージを送信してAIからの応答を取得
async function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    const modelId = document.getElementById('modelSelect').value;
    if (!userInput || !modelId) return;

    // ユーザーメッセージを表示
    displayMessage(userInput, 'userMessage');

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'API-KEY': apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: modelId,
                prompt: userInput
            })
        });
        const data = await response.json();
        // AIからの応答を表示
        displayMessage(data.response, 'aiMessage');
    } catch (error) {
        console.error('メッセージ送信中にエラーが発生しました:', error);
    }
}

// メッセージをチャットボックスに表示
function displayMessage(message, className) {
    const chatbox = document.getElementById('chatbox');
    const messageElement = document.createElement('div');
    messageElement.className = className;
    messageElement.textContent = message;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}

// ページ読み込み時にモデルを取得
window.onload = fetchModels;
