// モデルのリスト
const modelList = [
    "o1-preview", "o1-mini", "gpt-4o-mini", "gpt-4o", "gpt-4-turbo", "gpt-4", "gpt-3.5-turbo", 
    "dall-e-2", "dall-e-3", "whisper-1", "tts-1", "tts-1-hd",
    "stable-image", "stable-diffusion-xl-1024-v1-0", "stable-diffusion-v1-6", "esrgan-v1-x2plus", "stable-video-diffusion",
    "clipdrop",
    "midjourney", "midjourney_6_1",
    "6b645e3a-d64f-4341-a6d8-7a3690fbf042", "b24e16ff-06e3-43eb-8d33-4416c2d75876", 
    "e71a1c2f-4f80-4800-934f-2c68979d8cc8", "1e60896f-3c26-4296-8ecc-53e2afecc132", 
    "aa77f04e-3eec-4034-9c07-d0f619684628", "5c232a9e-9061-4777-980a-ddc8e65647c6", 
    "2067ae52-33fd-4a82-bb92-c2c55e7d2786",
    "claude-instant-1.2", "claude-2.1", "claude-3-5-sonnet-20240620", "claude-3-opus-20240229", 
    "claude-3-sonnet-20240229", "claude-3-haiku-20240307",
    "gemini-1.0-pro", "gemini-1.5-pro", "gemini-1.5-flash", "google-tts", "latest_long", 
    "latest_short", "phone_call", "telephony", "telephony_short", "medical_dictation", 
    "medical_conversation",
    "mistral-large-latest", "mistral-small-latest", "mistral-nemo", "pixtral-12b", 
    "open-mixtral-8x22b", "open-mixtral-8x7b", "open-mistral-7b",
    "meta/llama-2-70b-chat", "meta/meta-llama-3-70b-instruct", "meta/meta-llama-3.1-405b-instruct",
    "methexis-inc/img2prompt:50adaf2d3ad20a6f911a8a9e3ccf777b263b8596fbd2c8fc26e8888f8a0edbb5",
    "cjwbw/damo-text-to-video:1e205ea73084bd17a0a3b43396e49ba0d6bc2e754e9283b2df49fad2dcf95755",
    "lucataco/animate-diff:beecf59c4aee8d81bf04f0381033dfa10dc16e845b4ae00d281e2fa377e48a9f",
    "lucataco/hotshot-xl:78b3a6257e16e4b241245d65c8b2b81ea2e1ff7ed4c55306b511509ddbfd327a",
    "black-forest-labs/flux-schnell", "black-forest-labs/flux-dev", "black-forest-labs/flux-pro", 
    "black-forest-labs/flux-1.1-pro",
    "luma",
    "command",
    "mistralai/mixtral-8x7b-instruct-v0.1"
];

function sendMessage() {
    const apiKey = getCookie('apiKey');
    if (!apiKey) {
        alert('APIキーが保存されていません。');
        return;
    }

    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    const chatMessages = document.getElementById('chat-messages');

    // メッセージを表示
    chatMessages.innerHTML += `<p><strong>あなた:</strong> ${userInput}</p>`;
    document.getElementById('user-input').value = '';

    // モデルの選択（ここではデフォルトを設定）
    const selectedModel = document.getElementById('model-select').value || "gpt-4";  // デフォルトモデルを設定

    // APIにリクエスト
    fetch('https://api.1min.ai/v1/conversation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            "model": selectedModel,
            "messages": [
                {"role": "user", "content": userInput}
            ]
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.choices && data.choices[0] && data.choices[0].message) {
            chatMessages.innerHTML += `<p><strong>AI:</strong> ${data.choices[0].message.content}</p>`;
        } else {
            chatMessages.innerHTML += '<p><strong>AI:</strong> エラー: 応答がありません。</p>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        chatMessages.innerHTML += '<p><strong>AI:</strong> エラーが発生しました。</p>';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const apiKey = getCookie('apiKey');
    if (apiKey) {
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('chat-container').style.display = 'block';
    } else {
        document.getElementById('auth-container').style.display = 'block';
    }

    // モデル選択ドロップダウンの追加
    const modelSelect = document.createElement('select');
    modelSelect.id = 'model-select';
    modelList.forEach(model => {
        const option = document.createElement('option');
        option.value = model;
        option.text = model;
        modelSelect.appendChild(option);
    });
    document.getElementById('chat-container').insertBefore(modelSelect, document.getElementById('user-input'));
});
