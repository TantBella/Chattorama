const messageDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

// const localMessages = [];

function getLocalMessages() {
  const storedMessages = localStorage.getItem("localMessages");
  return storedMessages ? JSON.parse(storedMessages) : [];
}

function saveLocalMessages(messages) {
  localStorage.setItem("localMessages", JSON.stringify(messages));
}

async function loadMessages() {
  try {
    const response = await fetch(
      "https://cloud24chat.azurewebsites.net/api/messages"
    );
    const messages = await response.json();
    const localMessages = getLocalMessages();
    messageDiv.innerHTML = "";

    messages.forEach((msg) => {
      const messageElement = document.createElement("div");
      messageElement.textContent = `${msg.text}`;

      // if (msg.isLocalhost) {
      //   messageElement.classList.add("message", "sent");
      // } else {
      //   messageElement.classList.add("message", "received");
      // }

      if (localMessages.includes(msg.text)) {
        messageElement.classList.add("message", "sent");
      } else {
        messageElement.classList.add("message", "received");
      }
      messageDiv.appendChild(messageElement);
    });
    messageDiv.scrollTop = messageDiv.scrollHeight;
  } catch (error) {
    console.log(error);
  }
}

function sendMessage() {
  const input = messageInput.value.trim();

  if (input === "") {
    alert("Meddelandet kan inte vara tomt!");
    return;
  }
  const localMessages = getLocalMessages();
  localMessages.push(input);
  saveLocalMessages(localMessages);
  
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
      messageElement.textContent = data.text;
      messageElement.classList.add("message", "sent");
      messageDiv.appendChild(messageElement);
    })
    .catch((error) => {
      console.error("Fel vid skickande av meddelande:", error);
    });
  messageInput.value = "";
  messageDiv.scrollTop = messageDiv.scrollHeight;
}

loadMessages();

sendButton.addEventListener("click", sendMessage);
messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});
