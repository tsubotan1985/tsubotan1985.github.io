// auth.js

document.addEventListener('DOMContentLoaded', () => {
    // 認証プロセスを開始
    authenticateUser();
    
    const logoutButton = document.getElementById('logout-button');

    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});

const USERNAME = 'tsubotan';
const PASSWORD = 'tsuborin';

// ユーザー認証関数
function authenticateUser() {
    const storedAuth = sessionStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
        showContent();
        return;
    }

    const enteredUsername = prompt('ユーザー名を入力してください:');
    if (enteredUsername === null) {
        // ユーザーがキャンセルした場合
        return;
    }

    const enteredPassword = prompt('パスワードを入力してください:');
    if (enteredPassword === null) {
        // ユーザーがキャンセルした場合
        return;
    }

    if (enteredUsername === USERNAME && enteredPassword === PASSWORD) {
        sessionStorage.setItem('isAuthenticated', 'true');
        showContent();
    } else {
        alert('ユーザー名またはパスワードが間違っています。再度試してください。');
        authenticateUser(); // 再度認証を試みる
    }
}

// コンテンツを表示する関数
function showContent() {
    document.getElementById('protected-content').style.display = 'block';
}

// ログアウト関数
function logout() {
    sessionStorage.removeItem('isAuthenticated');
    location.reload();
}
