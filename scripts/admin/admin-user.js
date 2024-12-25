
/*-------------------Render User ------------------ */
function renderUsers() {
    // Lấy danh sách user từ localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Tham chiếu đến tbody của bảng
    const tableBody = document.getElementById("userTableBody");

    // Xóa nội dung cũ (nếu có)
    tableBody.innerHTML = "";

    // Duyệt qua danh sách user và tạo các hàng
    users.forEach((user, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${user.username}</td>
                <td>******</td>
                <td><img src="${user.avatar}" alt="avatar" class="avatar-img"></td>
                <td>${user.role}</td>
                <td>
                    <button class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#viewUserModal" onclick="viewUser('${user.id}')">View</button>
                    <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editUserModal" onclick="editUser('${user.id}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser('${user.id}')">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}
renderUsers();

/*------------------- Create User ------------------ */
function saveUser() {
    // Lấy giá trị từ các input
    const fullName = document.getElementById("userFullName").value.trim();
    const username = document.getElementById("userName").value.trim();
    const password = document.getElementById("userPassword").value.trim();
    const avatar = document.getElementById("userAvatar").value.trim();
    const role = "User"; // Default value

    // Kiểm tra input (optional)
    if (!fullName || !username || !password) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
    }
    const userID = `user-${Date.now()}`;
    // Lấy danh sách user từ localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Kiểm tra trùng username
    const isUsernameTaken = users.some(user => user.username === username);
    if (isUsernameTaken) {
        alert("Username đã tồn tại. Vui lòng chọn username khác.");
        return;
    }

    // Tạo đối tượng user
    const user = {
        id: userID,
        fullName,
        username,
        password,
        avatar,
        role
    };

    // Thêm user mới vào danh sách
    users.push(user);

    // Lưu lại danh sách vào localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Thêm user thành công!");
    renderUsers();


    // Xóa dữ liệu trong form
    document.getElementById("userFullName").value = "";
    document.getElementById("userName").value = "";
    document.getElementById("userPassword").value = "";
    document.getElementById("userAvatar").value = "";

    // Đóng modal (nếu cần)
    const modal = document.getElementById("createUserModal");
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
}

/*------------------- Delete User ------------------ */
function deleteUser(id) {
    if (confirm('Bạn có  muốn xóa user này không?')) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.filter(user => user.id !== id);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        alert("Xóa user thành cong!");
        renderUsers();
    }
}

/*------------------- View User ------------------ */
function viewUser(id) {

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.id === id);

    document.getElementById("viewFullName").textContent = user.fullName;
    document.getElementById("viewUsername").textContent = user.username;
    document.getElementById("viewPassword").textContent = user.password;
    document.getElementById("viewAvatar").src = user.avatar;
    document.getElementById("viewRole").textContent = user.role;
}

/*------------------- Edit User ------------------ */
function editUser(id) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.id === id);

    document.getElementById("editUserId").value = user.id;
    document.getElementById("editFullName").value = user.fullName;
    document.getElementById("editUsername").value = user.username;
    document.getElementById("editPassword").value = user.password;
}

function saveUserChanges() {
    const userId = document.getElementById("editUserId").value;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
        const updatedUser = {
            ...users[userIndex],
            fullName: document.getElementById("editFullName").value,
            username: document.getElementById("editUsername").value,
            password: document.getElementById("editPassword").value
        };
        users[userIndex] = updatedUser;
        localStorage.setItem("users", JSON.stringify(users));
        alert("Cập nhật user thành công!");
        renderUsers();
    }

}
