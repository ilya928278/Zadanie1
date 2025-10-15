document.addEventListener("DOMContentLoaded", () => {
    const supabaseUrl = 'https://bawqpetcicwqaejnvuro.supabase.co';
    const supabaseKey = "sb_publishable_WZH697QGccpGbRrACmm5Ew_QoNQNAx1";

    const nameInput = document.getElementById("name");
    const levelInput = document.getElementById("level");
    const idInput = document.getElementById("id");
    const messageDiv = document.getElementById("message");

    const fetchAllButton = document.getElementById("fetchAll");
    const fetchByIdButton = document.getElementById("fetchById");
    const insertButton = document.getElementById("insertButton");
    const updateButton = document.getElementById("updateButton");
    const deleteButton = document.getElementById("deleteButton");

    function showMessage(msg, isError = false) {
        messageDiv.textContent = msg;
        messageDiv.style.color = isError ? "red" : "green";
        console.log(msg);
    }

    fetchAllButton.addEventListener("click", async () => {
        try {
            const res = await fetch(`${supabaseUrl}/rest/v1/UserData`, {
                method: "GET",
                headers: {
                    "apikey": supabaseKey,
                    "Authorization": `Bearer ${supabaseKey}`,
                    "Content-Type": "application/json"
                }
            });
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            showMessage(`All users: ${JSON.stringify(data)}`);
        } catch (err) {
            showMessage(`Error fetching all: ${err.message}`, true);
        }
    });

    fetchByIdButton.addEventListener("click", async () => {
        try {
            const id = idInput.value.trim();
            if (!id) return showMessage("ID is required", true);
            const res = await fetch(`${supabaseUrl}/rest/v1/UserData?id=eq.${id}`, {
                method: "GET",
                headers: {
                    "apikey": supabaseKey,
                    "Authorization": `Bearer ${supabaseKey}`,
                    "Content-Type": "application/json"
                }
            });
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            showMessage(`User: ${JSON.stringify(data[0])}`);
        } catch (err) {
            showMessage(`Error fetching by ID: ${err.message}`, true);
        }
    });

    insertButton.addEventListener("click", async () => {
        try {
            const name = nameInput.value.trim();
            const level = parseInt(levelInput.value);
            if (!name || isNaN(level)) return showMessage("Invalid name or level", true);
            const res = await fetch(`${supabaseUrl}/rest/v1/UserData`, {
                method: "POST",
                headers: {
                    "apikey": supabaseKey,
                    "Authorization": `Bearer ${supabaseKey}`,
                    "Content-Type": "application/json",
                    "Prefer": "return=representation"
                },
                body: JSON.stringify([{ name, level }])
            });
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            showMessage(`Data inserted: ${JSON.stringify(data)}`);
        } catch (err) {
            showMessage(`Insert error: ${err.message}`, true);
        }
    });

    updateButton.addEventListener("click", async () => {
        try {
            const id = idInput.value.trim();
            const name = nameInput.value.trim();
            const level = parseInt(levelInput.value);
            if (!id || !name || isNaN(level)) return showMessage("Invalid ID, name, or level", true);
            const res = await fetch(`${supabaseUrl}/rest/v1/UserData?id=eq.${id}`, {
                method: "PATCH",
                headers: {
                    "apikey": supabaseKey,
                    "Authorization": `Bearer ${supabaseKey}`,
                    "Content-Type": "application/json",
                    "Prefer": "return=representation"
                },
                body: JSON.stringify({ name, level })
            });
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            showMessage(`Updated: ${JSON.stringify(data)}`);
        } catch (err) {
            showMessage(`Update error: ${err.message}`, true);
        }
    });

    deleteButton.addEventListener("click", async () => {
        try {
            const id = idInput.value.trim();
            if (!id) return showMessage("ID is required", true);
            const res = await fetch(`${supabaseUrl}/rest/v1/UserData?id=eq.${id}`, {
                method: "DELETE",
                headers: {
                    "apikey": supabaseKey,
                    "Authorization": `Bearer ${supabaseKey}`,
                    "Content-Type": "application/json"
                }
            });
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            showMessage(`User with ID ${id} deleted`);
        } catch (err) {
            showMessage(`Delete error: ${err.message}`, true);
        }
    });
});
