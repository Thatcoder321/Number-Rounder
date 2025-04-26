document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("trig-input");
  const button = document.getElementById("calc-btn");
  const result = document.getElementById("trig-result");

  button.addEventListener("click", () => {
    const raw = input.value.toLowerCase().replace(/\s+/g, '');
    const match = raw.match(/(cos|sin|tan)\(?(\d+)(degrees)?\)?/);

    if (!match) {
      result.textContent = "Invalid format. Try: cos(59 degrees) or sin 45";
      return;
    }

    const func = match[1];
    const degrees = parseFloat(match[2]);
    const angle = degrees * (Math.PI / 180); // Always convert to radians
    let value;
    switch (func) {
      case "cos":
        value = Math.cos(angle);
        break;
      case "sin":
        value = Math.sin(angle);
        break;
      case "tan":
        value = Math.tan(angle);
        break;
      default:
        result.textContent = "Unsupported function.";
        return;
    }

    result.textContent = `${func}(${degrees}°) = ${value.toFixed(6)}`;
    // Show the "Round it?" button and set its click behavior
const roundLink = document.getElementById("round-link");
roundLink.style.display = "block";
roundLink.onclick = () => {
  const roundedValue = value.toFixed(6);
  const encoded = encodeURIComponent(roundedValue);
  window.location.href = `index.html?value=${encoded}`;
};
  });
});