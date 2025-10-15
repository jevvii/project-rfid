// ==========================
// 🧠 STUDENTS MODULE
// ==========================

// --- Sample Student Data ---
const studentsData = [
    {
        id: "STU-2023-0042",
        name: "Sarah Johnson",
        program: "Information Technology",
        section: "A",
        contact: "555-1234",
        attendanceRate: "98%",
    },
    {
        id: "STU-2023-0038",
        name: "Michael Chen",
        program: "Computer Science",
        section: "B",
        contact: "555-5678",
        attendanceRate: "95%",
    },
    {
        id: "STU-2023-0015",
        name: "Emily Rodriguez",
        program: "Entertainment and Multimedia",
        section: "C",
        contact: "555-9012",
        attendanceRate: "92%",
    },
    {
        id: "STU-2023-0021",
        name: "James Wilson",
        program: "Computer Science",
        section: "A",
        contact: "555-3456",
        attendanceRate: "96%",
    },
    {
        id: "STU-2023-0033",
        name: "Olivia Parker",
        program: "Information Technology",
        section: "B",
        contact: "555-7890",
        attendanceRate: "94%",
    },
    {
        id: "STU-2023-0009",
        name: "Daniel Kim",
        program: "Entertainment and Multimedia",
        section: "A",
        contact: "555-2345",
        attendanceRate: "97%",
    },
    {
        id: "STU-2023-0056",
        name: "Sophia Martinez",
        program: "Computer Science",
        section: "A",
        contact: "555-6789",
        attendanceRate: "99%",
    },
    {
        id: "STU-2023-0072",
        name: "Ethan Brown",
        program: "Information Technology",
        section: "C",
        contact: "555-0123",
        attendanceRate: "91%",
    },
];

// --- DOM Elements ---
const studentsTable = document.getElementById("studentsTable");
const addStudentBtn = document.getElementById("addStudentBtn");
const addStudentModal = document.getElementById("addStudentModal");
const editStudentModal = document.getElementById("editStudentModal");
const closeBtns = document.querySelectorAll(".close-btn");
const cancelStudentBtn = document.getElementById("cancelStudentBtn");
const cancelEditStudentBtn = document.getElementById("cancelEditStudentBtn");
const saveStudentBtn = document.getElementById("saveStudentBtn");
const updateStudentBtn = document.getElementById("updateStudentBtn");

// ==========================
// 📋 TABLE POPULATION
// ==========================
function populateStudentsTable(data) {
    studentsTable.innerHTML = "";

    if (data.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="7" style="text-align: center; padding: 30px;">No students found.</td>`;
        studentsTable.appendChild(row);
        return;
    }

    data.forEach((student) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.program}</td>
            <td>${student.section}</td>
            <td>${student.contact}</td>
            <td>${student.attendanceRate}</td>
            <td>
                <button class="btn btn-secondary btn-sm edit-student" data-id="${student.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-sm delete-student" data-id="${student.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;

        studentsTable.appendChild(row);
    });

    // Rebind event listeners
    attachStudentRowEvents();
}

// ==========================
// ⚙️ EVENT HANDLERS
// ==========================
function attachStudentRowEvents() {
    document.querySelectorAll(".edit-student").forEach((button) => {
        button.addEventListener("click", function () {
            const studentId = this.getAttribute("data-id");
            editStudentRecord(studentId);
        });
    });

    document.querySelectorAll(".delete-student").forEach((button) => {
        button.addEventListener("click", function () {
            const studentId = this.getAttribute("data-id");
            deleteStudentRecord(studentId);
        });
    });
}

// ==========================
// ➕ ADD STUDENT
// ==========================
addStudentBtn.addEventListener("click", () => {
    addStudentModal.style.display = "flex";
});

saveStudentBtn.addEventListener("click", () => {
    const studentId = document.getElementById("studentId").value.trim();
    const studentName = document.getElementById("studentName").value.trim();
    const studentProgram = document
        .getElementById("studentProgram")
        .value.trim();
    const studentSection = document
        .getElementById("studentSection")
        .value.trim();
    const studentContact = document
        .getElementById("studentContact")
        .value.trim();

    if (
        !studentId ||
        !studentName ||
        !studentProgram ||
        !studentSection ||
        !studentContact
    ) {
        alert("Please fill in all required fields");
        return;
    }

    const newStudent = {
        id: studentId,
        name: studentName,
        program: studentProgram,
        section: studentSection,
        contact: studentContact,
        attendanceRate: "0%",
    };

    studentsData.push(newStudent);
    populateStudentsTable(studentsData);

    alert("Student added successfully!");
    addStudentModal.style.display = "none";
});

// ==========================
// ✏️ EDIT STUDENT
// ==========================
function editStudentRecord(studentId) {
    const student = studentsData.find((s) => s.id === studentId);
    if (student) {
        document.getElementById("editStudentId").value = student.id;
        document.getElementById("editStudentName").value = student.name;
        document.getElementById("editStudentProgram").value = student.program;
        document.getElementById("editStudentSection").value = student.section;
        document.getElementById("editStudentContact").value = student.contact;

        editStudentModal.style.display = "flex";
    }
}

updateStudentBtn.addEventListener("click", () => {
    const studentId = document.getElementById("editStudentId").value;
    const studentName = document.getElementById("editStudentName").value.trim();
    const studentProgram = document
        .getElementById("editStudentProgram")
        .value.trim();
    const studentSection = document
        .getElementById("editStudentSection")
        .value.trim();
    const studentContact = document
        .getElementById("editStudentContact")
        .value.trim();

    if (!studentName || !studentProgram || !studentSection || !studentContact) {
        alert("Please fill in all required fields");
        return;
    }

    const studentIndex = studentsData.findIndex((s) => s.id === studentId);
    if (studentIndex !== -1) {
        studentsData[studentIndex] = {
            ...studentsData[studentIndex],
            name: studentName,
            program: studentProgram,
            section: studentSection,
            contact: studentContact,
        };

        populateStudentsTable(studentsData);
        alert("Student updated successfully!");
        editStudentModal.style.display = "none";
    }
});

// ==========================
// 🗑️ DELETE STUDENT
// ==========================
function deleteStudentRecord(studentId) {
    if (confirm("Are you sure you want to delete this student?")) {
        const studentIndex = studentsData.findIndex((s) => s.id === studentId);
        if (studentIndex !== -1) {
            studentsData.splice(studentIndex, 1);
            populateStudentsTable(studentsData);
            alert("Student deleted successfully!");
        }
    }
}

// ==========================
// ❌ MODAL CLOSE & CANCEL
// ==========================
closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        addStudentModal.style.display = "none";
        editStudentModal.style.display = "none";
    });
});

cancelStudentBtn.addEventListener("click", () => {
    addStudentModal.style.display = "none";
});

cancelEditStudentBtn.addEventListener("click", () => {
    editStudentModal.style.display = "none";
});

// ==========================
// 🚀 INITIALIZE
// ==========================
populateStudentsTable(studentsData);
