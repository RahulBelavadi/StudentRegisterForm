document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("studentForm");
    const studentTable = document.querySelector("#studentTable tbody");
    let students = JSON.parse(localStorage.getItem("students")) || [];

    const renderTable = () => {
        studentTable.innerHTML = "";
        students.forEach((student, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.Phone}</td>
                <td>
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </td>
            `;
            studentTable.appendChild(row);
        });
    };

    const saveToLocalStorage = () => {
        localStorage.setItem("students", JSON.stringify(students));
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = form.studentName.value.trim();
        const id = form.studentID.value.trim();
        const email = form.email.value.trim();
        const Phone = form.Phone.value.trim();

        if (!name || !id || !email || !Phone) {
            alert("All fields are required!");
            return;
        }

   
        if (students.some(student => student.id === id)) {
            alert("Student ID already exists!");
            return;
        }

        students.push({ name, id, email, Phone });
        saveToLocalStorage();
        renderTable();
        form.reset();
    });

    studentTable.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete")) {
            const index = e.target.dataset.index;
            students.splice(index, 1);
            saveToLocalStorage();
            renderTable();
        }

        if (e.target.classList.contains("edit")) {
            const index = e.target.dataset.index;
            const student = students[index];
            form.studentName.value = student.name;
            form.studentID.value = student.id;
            form.email.value = student.email;
            form.Phone.value = student.Phone;
            students.splice(index, 1); 
        }
    });

    renderTable();
});
