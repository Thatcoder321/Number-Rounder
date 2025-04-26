document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("number-input");
    const roundType = document.getElementById("round-type");
    const result = document.getElementById("result");
    const button = document.getElementById("round-btn");
    const explanationToggle = document.getElementById("explanation-toggle");
    const explanationText = document.getElementById("explanation-text");
    // Pre-fill input if coming from trig page
    document.getElementById("chatbot-toggle").addEventListener("click", () => {
        const box = document.getElementById("chatbot-box");
        box.style.display = box.style.display === "none" ? "flex" : "none";
      });
      
      document.getElementById("chat-send").addEventListener("click", async () => {
        const input = document.getElementById("chat-input");
        const message = input.value.trim();
        if (!message) return;
      
        const chat = document.getElementById("chat-messages");
        chat.innerHTML += `<div style="margin-bottom: 8px;"><b>You:</b> ${message}</div>`;
        input.value = "";
      
        const response = await fetch("/api/chatgpt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content: message }]
          })
        });
      
        const data = await response.json();
        const reply = data.reply || "Oops, something went wrong.";
      
        chat.innerHTML += `<div style="margin-bottom: 8px;"><b>Nethul:</b> ${reply}</div>`;
        chat.scrollTop = chat.scrollHeight;
      });
const urlParams = new URLSearchParams(window.location.search);
const presetValue = urlParams.get("value");
if (presetValue) {
  input.value = presetValue;
}
    button.addEventListener("click", () => {
        const inputValue = parseFloat(input.value);
        const roundTypeValue = roundType.value;

        if (isNaN(inputValue)) {
            result.textContent = "Please enter a valid number.";
            return;
        }

        let rounded;

        switch (roundTypeValue) {
            case "nearest-10":
                rounded = Math.round(inputValue / 10) * 10;
                break;
            case "nearest-100":
                rounded = Math.round(inputValue / 100) * 100;
                break;
            case "decimal-1":
                rounded = inputValue.toFixed(1);
                break;

            case "decimal-2":   
                rounded = inputValue.toFixed(2);
                break;
            case "decimal-3":
                rounded = inputValue.toFixed(3);
                break;
            default:
                rounded = inputValue;
        }
        result.textContent = rounded;
        if (roundTypeValue === "decimal-1") {
            const tenth = Math.floor(inputValue * 10) / 10;
            const hundredthsDigit = Math.floor((inputValue * 100) % 10);
            let explanation = `To round ${inputValue} to the nearest tenth, you look at the hundredths place (which is ${hundredthsDigit} in this case):<br>`;
            explanation += `• Tenth place: ${tenth.toFixed(1).split(".")[1][0]}<br>`;
            explanation += `• Hundredths place: ${hundredthsDigit} ${hundredthsDigit >= 5 ? "(which is 5 or more, so we round up)" : "(which is less than 5, so we keep it)"}`;
            explanation += `<br><br>So, ${inputValue} rounded to the nearest tenth is ${rounded}.`;
          
            explanationToggle.style.display = "block";
            explanationText.style.display = "none";
            explanationText.innerHTML = explanation;
          }
            
                });

    explanationToggle.addEventListener("click", () => {
        explanationText.style.display = explanationText.style.display === "none" ? "block" : "none";
    });
        });
