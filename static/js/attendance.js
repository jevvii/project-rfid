// attendance.js
document.addEventListener("DOMContentLoaded", () => {
    // ===== DOM ELEMENTS =====
    const attendanceTable = document.getElementById(
        "attendanceManagementTable",
    );
    const programFilter = document.getElementById("programFilter");
    const statusFilter = document.getElementById("statusFilter");
    const attendanceDateFilter = document.getElementById(
        "attendanceDateFilter",
    );
    const addAttendanceBtn = document.getElementById("addAttendanceBtn");
    const addAttendanceModal = document.getElementById("addAttendanceModal");
    const editAttendanceModal = document.getElementById("editAttendanceModal");
    const closeBtns = document.querySelectorAll(".close-btn");
    const cancelAttendanceBtn = document.getElementById("cancelAttendanceBtn");
    const saveAttendanceBtn = document.getElementById("saveAttendanceBtn");
    const updateAttendanceBtn = document.getElementById("updateAttendanceBtn");
    const cancelEditAttendanceBtn = document.getElementById(
        "cancelEditAttendanceBtn",
    );

    if (!attendanceTable) return;

    // ===== SAMPLE DATA =====
    const attendanceData = [
        {
            id: "STU-2023-0042",
            name: "Sarah Johnson",
            program: "Computer Science",
            date: "2023-10-16",
            timeIn: "08:15 AM",
            timeOut: "03:30 PM",
            status: "success",
        },
        {
            id: "STU-2023-0038",
            name: "Michael Chen",
            program: "Computer Science",
            date: "2023-10-16",
            timeIn: "08:05 AM",
            timeOut: "03:25 PM",
            status: "success",
        },
        {
            id: "STU-2023-0015",
            name: "Emily Rodriguez",
            program: "Information Technology",
            date: "2023-10-16",
            timeIn: "08:10 AM",
            timeOut: "03:20 PM",
            status: "success",
        },
        {
            id: "STU-2023-0021",
            name: "James Wilson",
            program: "Entertainment and Multimedia",
            date: "2023-10-16",
            timeIn: "08:12 AM",
            timeOut: "03:28 PM",
            status: "success",
        },
        {
            id: "STU-2023-0033",
            name: "Olivia Parker",
            program: "Information Technology",
            date: "2023-10-16",
            timeIn: "08:18 AM",
            timeOut: "03:32 PM",
            status: "success",
        },
        {
            id: "STU-2023-0009",
            name: "Daniel Kim",
            program: "Entertainment and Multimedia",
            date: "2023-10-16",
            timeIn: "08:22 AM",
            timeOut: "03:35 PM",
            status: "success",
        },
        {
            id: "STU-2023-0056",
            name: "Sophia Martinez",
            program: "Computer Science",
            date: "2023-10-16",
            timeIn: "08:08 AM",
            timeOut: "03:26 PM",
            status: "success",
        },
        {
            id: "STU-2023-0072",
            name: "Ethan Brown",
            program: "Computer Science",
            date: "2023-10-16",
            timeIn: "08:14 AM",
            timeOut: "03:29 PM",
            status: "success",
        },
        {
            id: "STU-2023-0042",
            name: "Sarah Johnson",
            program: "Information Technology",
            date: "2023-10-15",
            timeIn: "08:20 AM",
            timeOut: "03:35 PM",
            status: "success",
        },
        {
            id: "STU-2023-0042",
            name: "Sarah Johnson",
            program: "Information Technology",
            date: "2023-10-12",
            timeIn: "08:10 AM",
            timeOut: "03:25 PM",
            status: "success",
        },
    ];

    // ===== FUNCTIONS =====

    // Fill attendance table
    function populateAttendance(data) {
        attendanceTable.innerHTML = "";
        data.forEach((r) => {
            const statusClass =
                r.status === "success"
                    ? "success"
                    : r.status === "failed"
                      ? "failed"
                      : "delayed";
            const statusText =
                r.status === "success"
                    ? "Success"
                    : r.status === "failed"
                      ? "Failed"
                      : "Delayed";

            attendanceTable.innerHTML += `
                <tr>
                    <td>${r.id}</td>
                    <td>${r.name}</td>
                    <td>${r.program}</td>
                    <td>${r.date}</td>
                    <td>${r.timeIn}</td>
                    <td>${r.timeOut}</td>
                    <td><span class="status ${statusClass}">${statusText}</span></td>
                    <td>
                        <button class="btn btn-secondary btn-sm edit-attendance" data-id="${r.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-sm delete-attendance" data-id="${r.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });

        // Add event listeners for the edit/delete buttons dynamically
        document.querySelectorAll(".edit-attendance").forEach((btn) => {
            btn.addEventListener("click", () => {
                const recordId = btn.dataset.id;
                openEditModal(recordId);
            });
        });

        document.querySelectorAll(".delete-attendance").forEach((btn) => {
            btn.addEventListener("click", () => {
                const recordId = btn.dataset.id;
                deleteAttendanceRecord(recordId);
            });
        });
    }

    // Apply filters
    function applyAttendanceFilters() {
        const selectedDate = attendanceDateFilter.value;
        const selectedProgram = programFilter.value;
        const selectedStatus = statusFilter.value;

        let filteredData = [...attendanceData];

        if (selectedDate) {
            filteredData = filteredData.filter((r) => r.date === selectedDate);
        }
        if (selectedProgram) {
            filteredData = filteredData.filter(
                (r) => r.program === selectedProgram,
            );
        }
        if (selectedStatus) {
            filteredData = filteredData.filter(
                (r) => r.status === selectedStatus,
            );
        }

        populateAttendance(filteredData);
    }

    // Format 24h → 12h
    function formatTime(time24) {
        if (!time24) return "-";
        const [hours, minutes] = time24.split(":");
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? "PM" : "AM";
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    }

    // ===== MODAL SUPPORT FUNCTIONS =====
    function openEditModal(recordId) {
        const record = attendanceData.find((r) => r.id === recordId);
        if (!record) return;

        document.getElementById("editRecordId").value = record.id;
        document.getElementById("editAttendanceDate").value = record.date;
        document.getElementById("editTimeInInput").value = parseTime(
            record.timeIn,
        );
        document.getElementById("editTimeOutInput").value = parseTime(
            record.timeOut,
        );
        document.getElementById("editStatusSelect").value = record.status;

        const editStudentSelect = document.getElementById("editStudentSelect");
        editStudentSelect.innerHTML = `<option value="${record.id}" selected>${record.name}</option>`;

        editAttendanceModal.style.display = "flex";
    }

    function deleteAttendanceRecord(recordId) {
        if (confirm("Are you sure you want to delete this record?")) {
            const index = attendanceData.findIndex((r) => r.id === recordId);
            if (index !== -1) {
                attendanceData.splice(index, 1);
                populateAttendance(attendanceData);
                alert("Attendance record deleted successfully!");
            }
        }
    }

    function parseTime(time12) {
        if (!time12) return "";
        const [time, ampm] = time12.split(" ");
        let [hours, minutes] = time.split(":");
        hours = parseInt(hours);
        if (ampm === "PM" && hours < 12) hours += 12;
        if (ampm === "AM" && hours === 12) hours = 0;
        return `${hours.toString().padStart(2, "0")}:${minutes}`;
    }

    // ===== EVENT HANDLERS =====
    programFilter?.addEventListener("change", applyAttendanceFilters);
    statusFilter?.addEventListener("change", applyAttendanceFilters);
    attendanceDateFilter?.addEventListener("change", applyAttendanceFilters);

    addAttendanceBtn?.addEventListener("click", () => {
        addAttendanceModal.style.display = "flex";
    });

    closeBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            addAttendanceModal.style.display = "none";
            editAttendanceModal.style.display = "none";
        });
    });

    cancelAttendanceBtn?.addEventListener("click", () => {
        addAttendanceModal.style.display = "none";
    });

    cancelEditAttendanceBtn?.addEventListener("click", () => {
        editAttendanceModal.style.display = "none";
    });

    saveAttendanceBtn?.addEventListener("click", () => {
        const studentSelect = document.getElementById("studentSelect");
        const date = document.getElementById("attendanceDate").value;
        const timeIn = document.getElementById("timeInInput").value;
        const timeOut = document.getElementById("timeOutInput").value;
        const status = document.getElementById("statusSelect").value;

        if (!studentSelect.value || !date) {
            alert("Please fill in all required fields");
            return;
        }

        const newRecord = {
            id: studentSelect.value,
            name: studentSelect.options[studentSelect.selectedIndex].text,
            program: "Unknown Program",
            date,
            timeIn: formatTime(timeIn),
            timeOut: formatTime(timeOut),
            status,
        };

        attendanceData.push(newRecord);
        populateAttendance(attendanceData);

        alert("Attendance record saved successfully!");
        addAttendanceModal.style.display = "none";
    });

    updateAttendanceBtn?.addEventListener("click", () => {
        const recordId = document.getElementById("editRecordId").value;
        const studentSelect = document.getElementById("editStudentSelect");
        const date = document.getElementById("editAttendanceDate").value;
        const timeIn = document.getElementById("editTimeInInput").value;
        const timeOut = document.getElementById("editTimeOutInput").value;
        const status = document.getElementById("editStatusSelect").value;

        if (!studentSelect.value || !date) {
            alert("Please fill in all required fields");
            return;
        }

        const recordIndex = attendanceData.findIndex((r) => r.id === recordId);
        if (recordIndex !== -1) {
            attendanceData[recordIndex] = {
                id: studentSelect.value,
                name: studentSelect.options[studentSelect.selectedIndex].text,
                program: "Unknown Program",
                date,
                timeIn: formatTime(timeIn),
                timeOut: formatTime(timeOut),
                status,
            };

            populateAttendance(attendanceData);
            alert("Attendance record updated successfully!");
            editAttendanceModal.style.display = "none";
        }
    });

    // ===== INITIAL RENDER =====
    populateAttendance(attendanceData);
});
