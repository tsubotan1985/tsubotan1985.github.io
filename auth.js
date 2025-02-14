// auth.js

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');

    loginButton.addEventListener('click', authenticate);

    // ページ読み込み時に認証状態を確認
    checkAuth();
});

// ログイン情報
const USERNAME = 'tsubotan';
const PASSWORD = 'tsuborin';

function authenticate() {
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    if (usernameInput === USERNAME && passwordInput === PASSWORD) {
        // 認証成功
        localStorage.setItem('isAuthenticated', 'true');
        showChat();
    } else {
        alert('ユーザー名またはパスワードが間違っています。');
    }
}

function checkAuth() {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
        showChat();
    }
}

function showChat() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('chat').style.display = 'block';
}
