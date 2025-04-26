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
  
    // Now send the real fetch to /api/chatgpt (once deployed)
  });