// admin-auth.js

function checkAdminAccess() {
    // Lấy thông tin loggedInUser từ localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser || loggedInUser.role !== 'Admin') {
        window.location.href = '../404.html';
    }
}

checkAdminAccess();
