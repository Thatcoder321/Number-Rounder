export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).end();
    }
  
    const { messages } = req.body;
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a helpful assistant named Nethul." },
            ...messages,
          ],
        }),
      });
  
      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content;
  
      res.status(200).json({ reply });
    } catch (error) {
      console.error("ChatGPT API error:", error);
      res.status(500).json({ error: "Failed to fetch response from ChatGPT." });
    }
  }
  // Helper function to check if it's a new day
function isNewDay(lastDate) {
  const today = new Date().toLocaleDateString();
  return today !== lastDate;
}

document.getElementById("chat-send").addEventListener("click", async () => {
  const input = document.getElementById("chat-input");
  const message = input.value.trim();
  if (!message) return;

  // Get stored usage
  let usage = JSON.parse(localStorage.getItem("chatUsage")) || { count: 0, date: new Date().toLocaleDateString() };

  // If it's a new day, reset count
  if (isNewDay(usage.date)) {
    usage = { count: 0, date: new Date().toLocaleDateString() };
  }

  if (usage.count >= 5) {
    alert("⚠️ You've reached your 5 queries for today. Try again tomorrow!");
    return;
  }

  // Increment usage and save
  usage.count += 1;
  localStorage.setItem("chatUsage", JSON.stringify(usage));

  
});