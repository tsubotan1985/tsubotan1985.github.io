// auth.js

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');
    const logoutButton = document.getElementById('logout-button');

    if (loginButton) {
        loginButton.addEventListener('click', authenticate);
    }

    if (logoutButton) { // チャット画面が表示されている場合のみ
        logoutButton.addEventListener('click', logout);
    }

    // ページ読み込み時に認証状態を確認
    checkAuth();
});

// ログイン情報
const USERNAME = 'tsubotan';
const PASSWORD = 'tsuborin';

function authenticate() {
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    console.log(`Attempting to authenticate with Username: ${usernameInput}, Password: ${passwordInput}`);

    if (usernameInput === USERNAME && passwordInput === PASSWORD) {
        // 認証成功
        localStorage.setItem('isAuthenticated', 'true');
        console.log('Authentication successful. Showing chat.');
        showChat();
    } else {
        console.log('Authentication failed.');
        alert('ユーザー名またはパスワードが間違っています。');
    }
}

function checkAuth() {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    console.log(`Check Auth: ${isAuthenticated}`);
    if (isAuthenticated === 'true') {
        showChat();
    }
}

function showChat() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('chat').style.display = 'block';
    console.log('Chat screen displayed.');
}

function logout() {
    localStorage.removeItem('isAuthenticated');
    document.getElementById('chat').style.display = 'none';
    document.getElementById('login').style.display = 'block';
    console.log('Logged out. Showing login screen.');
}
