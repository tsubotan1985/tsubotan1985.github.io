function saveAPIKey() {
    const apiKey = document.getElementById('apiKey').value;
    if (apiKey) {
        setCookie('apiKey', apiKey, 7);  // 7日間保存
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('chat-container').style.display = 'block';
    } else {
        alert('APIキーを入力してください。');
    }
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
