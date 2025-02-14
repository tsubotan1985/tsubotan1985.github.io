// auth.js

// ログイン情報
const USERNAME = 'tsubotan';
const PASSWORD = 'tsuborin';

function authenticate() {
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    if (usernameInput === USERNAME && passwordInput === PASSWORD) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('chat').style.display = 'block';
    } else {
        alert('ユーザー名またはパスワードが間違っています。');
    }
}
