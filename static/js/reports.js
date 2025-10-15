document.addEventListener("DOMContentLoaded", () => {
    const reportsTable = document.getElementById("reportsTable");
    const smsReportsTable = document.getElementById("smsReportsTable");
    const reportMonth = document.getElementById("reportMonth");

    if (!reportsTable) return;

    const reportsData = [
        {
            program: "Information Technology",
            total: 312,
            present: 295,
            absent: 10,
            late: 7,
            rate: "94.6%",
        },
        {
            program: "Entertainment and Multimedia",
            total: 298,
            present: 285,
            absent: 8,
            late: 5,
            rate: "95.6%",
        },
        {
            program: "Computer Science",
            total: 305,
            present: 290,
            absent: 9,
            late: 6,
            rate: "95.1%",
        },
    ];

    const smsReportsData = [
        {
            program: "Information Technology",
            total: 312,
            success: 305,
            failed: 5,
            delayed: 2,
            rate: "97.8%",
        },
        {
            program: "Entertainment and Multimedia",
            total: 298,
            success: 290,
            failed: 6,
            delayed: 2,
            rate: "97.3%",
        },
        {
            program: "Computer Science",
            total: 305,
            success: 298,
            failed: 4,
            delayed: 3,
            rate: "97.7%",
        },
    ];

    // === Populate Tables ===
    function populateReports(data) {
        reportsTable.innerHTML = "";
        data.forEach((r) => {
            reportsTable.innerHTML += `
                <tr>
                    <td>${r.program}</td>
                    <td>${r.total}</td>
                    <td>${r.present}</td>
                    <td>${r.absent}</td>
                    <td>${r.late}</td>
                    <td>${r.rate}</td>
                </tr>
            `;
        });
    }

    function populateSMSReportsTable(data) {
        smsReportsTable.innerHTML = "";
        data.forEach((report) => {
            smsReportsTable.innerHTML += `
                <tr>
                    <td>${report.program}</td>
                    <td>${report.total}</td>
                    <td>${report.success}</td>
                    <td>${report.failed}</td>
                    <td>${report.delayed}</td>
                    <td>${report.rate}</td>
                </tr>
            `;
        });
    }

    populateReports(reportsData);
    populateSMSReportsTable(smsReportsData);

    // === Attendance + SMS Trend Chart ===
    const ctx = document
        .getElementById("attendanceTrendChart")
        ?.getContext("2d");
    if (!ctx) return;

    const programLabels = reportsData.map((r) => r.program);
    const attendanceRates = reportsData.map((r) =>
        parseFloat(r.rate.replace("%", "")),
    );
    const smsSuccessRates = smsReportsData.map((r) =>
        parseFloat(r.rate.replace("%", "")),
    );

    const chartData = {
        labels: programLabels,
        datasets: [
            {
                label: "Attendance Rate (%)",
                data: attendanceRates,
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 2,
                borderRadius: 6,
            },
            {
                label: "SMS Success Rate (%)",
                data: smsSuccessRates,
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                borderRadius: 6,
            },
        ],
    };

    let attendanceChart = new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: "Percentage (%)",
                    },
                },
                x: {
                    ticks: {
                        maxRotation: 0,
                        minRotation: 0,
                    },
                },
            },
            plugins: {
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: "Attendance vs. SMS Success Rate per Program",
                    padding: { top: 10, bottom: 20 },
                    font: {
                        size: 16,
                        weight: "bold",
                    },
                },
                tooltip: {
                    callbacks: {
                        label: (context) =>
                            `${context.dataset.label}: ${context.parsed.y}%`,
                    },
                },
            },
        },
    });

    // Optional: simulate new data when changing month
    if (reportMonth) {
        reportMonth.addEventListener("change", () => {
            const newAttendanceRates = attendanceRates.map(() =>
                Math.round(90 + Math.random() * 10),
            );
            const newSmsRates = smsSuccessRates.map(() =>
                Math.round(95 + Math.random() * 5),
            );
            attendanceChart.data.datasets[0].data = newAttendanceRates;
            attendanceChart.data.datasets[1].data = newSmsRates;
            attendanceChart.update();
        });
    }
});
