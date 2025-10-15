document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const attendanceTableBody = document.getElementById("attendanceTableBody");

    if (!attendanceTableBody) return;

    // Mock data
    const recentRecords = [
        {
            id: "CS101",
            name: "Jane Doe",
            program: "CS",
            date: "2025-10-15",
            timeIn: "08:10",
            timeOut: "16:30",
            smsStatus: "success",
        },
        {
            id: "IT223",
            name: "John Smith",
            program: "IT",
            date: "2025-10-15",
            timeIn: "08:12",
            timeOut: "16:20",
            smsStatus: "failed",
        },
    ];

    function populateTable(data) {
        attendanceTableBody.innerHTML = "";
        data.forEach((record) => {
            attendanceTableBody.innerHTML += `
                <tr>
                    <td>${record.id}</td>
                    <td>${record.name}</td>
                    <td>${record.program}</td>
                    <td>${record.date}</td>
                    <td>${record.timeIn}</td>
                    <td>${record.timeOut}</td>
                    <td>${record.smsStatus}</td>
                </tr>
            `;
        });
    }

    populateTable(recentRecords);

    searchBtn.addEventListener("click", () => {
        const query = searchInput.value.toLowerCase();
        const filtered = recentRecords.filter(
            (r) =>
                r.name.toLowerCase().includes(query) ||
                r.id.toLowerCase().includes(query),
        );
        populateTable(filtered);
    });
});
