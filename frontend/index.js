const messageDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

async function loadMessages() {
  try {
    const response = await fetch(
      "https://cloud24chat.azurewebsites.net/api/messages"
    );
    const messages = await response.json();

    messageDiv.innerHTML = "";

    messages.forEach((msg) => {
      const messageElement = document.createElement("div");
      messageElement.textContent = `${msg.text}`;
      messageDiv.appendChild(messageElement);
    });
  } catch (error) {
    console.log(error);
  }
}

loadMessages();

function sendMessage() {
  const input = messageInput.value.trim();

  if (input === "") {
    alert("Meddelandet kan inte vara tomt!");
    return;
  }

  fetch("https://cloud24chat.azurewebsites.net/api/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: input }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Meddelande skickat:", data);

      const messageElement = document.createElement("div");
      messageElement.textContent = `${data.text}`;
      messageDiv.appendChild(messageElement);
    })
    .catch((error) => {
      console.error("Fel vid skickande av meddelande:", error);
    });
  messageInput.value = "";
}
