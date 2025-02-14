// 許可されたユーザー名とパスワード
const AUTH_USER = "tsubotan";
const AUTH_PASS = "tsuborin";

// 認証プロンプトを表示
function authenticate() {
    const user = prompt("Username:");
    const pass = prompt("Password:");

    if (user !== AUTH_USER || pass !== AUTH_PASS) {
        alert("認証に失敗しました。ページを閉じます。");
        document.body.innerHTML = ""; // ページの内容を削除
    } else {
        alert("認証に成功しました。");
    }
}

// ページ読み込み時に認証を実行
window.onload = authenticate;
