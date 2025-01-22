function sendMessage() {
  const input = document.getElementById("chatMessage").value;

  if (input.trim() === "") {
    alert("Meddelandet kan inte vara tomt!");
    return;
  }

  fetch("http://localhost:3000/api/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: input }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Meddelande skickat:", data);
      document.getElementById("chatmessages").innerText = data.text;
    })
    .catch((error) => {
      console.error("Fel vid skickande av meddelande:", error);
    });

  document.getElementById("chatMessage").value = "";
}
