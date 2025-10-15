document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("insertButton");
    const nameInput = document.getElementById("name");
    const levelInput = document.getElementById("level");
    const messageDiv = document.getElementById("message");

    button.addEventListener("click", async () => {
        const name = nameInput.value;
        const level = parseInt(levelInput.value);

        try {
            const response = await fetch('/UserData', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, level })
            });

            const data = await response.json();
            if (response.ok) {
                messageDiv.textContent = `Player ${data.name} inserted with level ${data.level}`;
            } else {
                messageDiv.textContent = `Error: ${data.error}`;
            }
        } catch (err) {
            messageDiv.textContent = `Error: ${err.message}`;
        }
    });
});
