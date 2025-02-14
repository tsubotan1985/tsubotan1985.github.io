// ログイン処理（ユーザー名：「tsubotan」、パスワード：「tsuborin」）
document.getElementById('loginForm').addEventListener('submit', function(e) {
e.preventDefault();
var username = document.getElementById('username').value.trim();
var password = document.getElementById('password').value.trim();
if (username === "tsubotan" && password === "tsuborin") {
// ログイン成功時：ログイン画面を非表示にしてチャット画面を表示
document.getElementById('login').classList.add("hidden");
document.getElementById('chat').classList.remove("hidden");
} else {
alert("ユーザー名またはパスワードが正しくありません！");
}
});

// DOM要素の取得
var chatWindow = document.getElementById('conversationWindow');
var userInput = document.getElementById('userInput');

// ユーザー入力欄でEnterキーが押されたら送信（Shift+Enterで改行）
userInput.addEventListener('keydown', function(e) {
if (e.key === "Enter" && !e.shiftKey) {
e.preventDefault();
var message = userInput.value.trim();
if (message !== "") {
appendMessage("ユーザー", message);
userInput.value = "";
sendMessage(message);
}
}
});

// メッセージを画面に追加する関数
function appendMessage(sender, message) {
var messageDiv = document.createElement("div");
messageDiv.className = "message";
messageDiv.innerHTML = "" + sender + ": " + message;
chatWindow.appendChild(messageDiv);
// 最新のメッセージが見えるようにスクロールする
chatWindow.scrollTop = chatWindow.scrollHeight;
}

// APIに問い合わせる関数（fetchを利用）
// ※apiUrlは1min AIのAPIドキュメント情報に合わせて調整してください。
function sendMessage(message) {
var model = document.getElementById('modelSelect').value;
var apiUrl = "https://api.1minai.com/chat";  // 仮のエンドポイントURL

fetch(apiUrl, {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": "Bearer Y3e3f3da3a4de444b72a434aa5123d539a8925c32c67a79f13ae992a26473120e"
},
body: JSON.stringify({
model: model,
prompt: message
})
})
.then(function(response) {
return response.json();
})
.then(function(data) {
// APIのレスポンス形式に合わせて処理を調整してください（例：data.answerに返答内容が入っている場合）
if (data.answer) {
appendMessage("AI", data.answer);
} else {
appendMessage("AI", "エラー：応答内容がありません。");
}
})
.catch(function(error) {
console.error("APIエラー:", error);
appendMessage("システム", "APIの呼び出しに失敗しました。");
});
}
