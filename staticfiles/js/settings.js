document.addEventListener("DOMContentLoaded", () => {
    const saveBtn = document.getElementById("saveSettings");
    if (!saveBtn) return;

    saveBtn.addEventListener("click", () => {
        alert("Settings saved successfully!");
    });
});
