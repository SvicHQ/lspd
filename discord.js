let lastSentMessage = "";
const button = document.getElementById("send_to_discord");
const outputEl = document.getElementById("output");

button.addEventListener("click", async () => {
    let message = outputEl.textContent.trim();
    if (!message) {
        alert("Nothing to send! Generate the report first.");
        return;
    }

    if (message === lastSentMessage) {
        alert("This message has already been sent!");
        return;
    }

    let webhookURL = localStorage.getItem("discordWebhook");
    
    if (!webhookURL) {
        webhookURL = prompt("Enter your Discord Webhook URL:");
        if (!webhookURL || !webhookURL.startsWith("https://discord.com/api/webhooks/")) {
            alert("Invalid webhook URL. Message not sent.");
            return;
        }
        localStorage.setItem("discordWebhook", webhookURL);
    }

    try {
        const response = await fetch(webhookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: message })
        });

        if (response.ok) {
            lastSentMessage = message;
            button.textContent = "Sent ✓";
            button.disabled = true;
            setTimeout(() => {
                button.textContent = "📨 Send to Discord";
                button.disabled = false;
            }, 2000);
        } else {
            alert("Failed to send message.");
        }
    } catch (err) {
        console.error(err);
        alert("Error sending message.");
    }
});
