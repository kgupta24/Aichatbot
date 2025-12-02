const API_KEY = "AIzaSyBQSp9lz3JVnPol784wMoAnGUNPp1iEs9E";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
let chatHistory = [];

const sendMessage = async () => {
    const userInput = document.getElementById("inputbox").value.trim();
    if (userInput === "") return;

    // Add user input to chat history and display it in the chat window
    chatHistory.push({
        role: "user",
        parts: [{ text: userInput }]
    });

    displayMessage(userInput, "user");

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: chatHistory })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error.message);

        const aiResponse = data.candidates[0]?.content?.parts[0]?.text || "No response received";
        console.log(aiResponse);

        // Add AI response to chat history and display it in the chat window
        chatHistory.push({
            role: "assistant",
            parts: [{ text: aiResponse }]
        });

        displayMessage(aiResponse, "ai");

    } catch (error) {
        console.log(error);
    }

    // Clear input box after sending the message
    document.getElementById("inputbox").value = "";
};

const displayMessage = (message, sender) => {
    const chatWindow = document.getElementById("chatWindow");
    
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.classList.add(`${sender}-message`);

    messageDiv.innerHTML = message;
    chatWindow.appendChild(messageDiv);

    // Scroll to the bottom of the chat window to show the latest message
    chatWindow.scrollTop = chatWindow.scrollHeight;
};

// Add event listener to input box for sending message on Enter key press
document.getElementById("inputbox").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

document.querySelector(".sendbutton").addEventListener("click", sendMessage);
document.querySelector(".sendbutton").addEventListener("click",()=>{
    document.getElementById("inputbox").value = "";
});


document.querySelector(".resetChat").addEventListener("click", () => {
    let resetButton = document.querySelector(".resetChat");
    
    // Add rotation class
    resetButton.classList.add("rotate");

    // Remove rotation class after animation completes to allow repeated clicks
    setTimeout(() => {
        resetButton.classList.remove("rotate");
    }, 500); // 0.5s = Animation duration

    // Clear chat history
    document.getElementById("chatWindow").innerHTML = "";
});





