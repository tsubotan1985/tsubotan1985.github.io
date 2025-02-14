const apiKey = '3e3f3da3a4de444b72a434aa5123d539a8925c32c67a79f13ae992a26473120e';
const endpoint = 'https://api.1min.ai/api/conversations';

async function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    document.getElementById("chatbox").innerHTML += `<p><b>You:</b> ${userInput}</p>`;

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ message: userInput })
    });

    const data = await response.json();
    document.getElementById("chatbox").innerHTML += `<p><b>AI:</b> ${data.response}</p>`;
}
