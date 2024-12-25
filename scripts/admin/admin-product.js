/*-------------------Render Product ------------------ */
function renderProducts() {
    // Get products from localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Get the table body element
    const tableBody = document.getElementById('productTableBody');

    // Clear any existing rows in the table
    tableBody.innerHTML = '';

    // Loop through each product and create a new table row
    products.forEach((product, index) => {
        const row = document.createElement('tr');

        // Add columns to the row
        row.innerHTML = `
    <td>${index + 1}</td>
    <td>${product.name}</td>
    <td>${product.detail}</td>
    <td>$${product.price}</td>
    <td><img src="${product.image}" alt="${product.name}" class="img-fluid" style="width: 50px;"></td>
    <td>${product.type}</td>
    <td>
        <button class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#viewProductModal" onclick="viewProduct('${product.id}')">View</button>
        <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editProductModal" onclick="editProduct('${product.id}')">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteProduct('${product.id}')">Delete</button>
    </td>
`;

        // Append the row to the table body
        tableBody.appendChild(row);
    });
}
renderProducts()

/*------------------- Create Product ------------------ */
document.getElementById('saveProductBtn').addEventListener('click', function () {
    // Get form values
    const productName = document.getElementById('productName').value;
    const productDetail = document.getElementById('productDetail').value;
    const productPrice = document.getElementById('productPrice').value;
    const productImage = document.getElementById('productImage').value;
    const productType = document.getElementById('productType').value;

    // Check if all fields are filled
    if (productName && productDetail && productPrice && productImage && productType) {
        // Generate a new ID for the product
        const productID = `product-${Date.now()}`;

        // Create a product object
        const product = {
            id: productID,
            name: productName,
            detail: productDetail,
            price: parseFloat(productPrice),
            image: productImage,
            type: productType
        };

        // Get products from localStorage (or initialize empty array if none exist)
        let products = JSON.parse(localStorage.getItem('products')) || [];

        // Add the new product to the list
        products.push(product);

        // Save the updated list of products back to localStorage
        localStorage.setItem('products', JSON.stringify(products));

        // Clear form fields
        document.getElementById('productForm').reset();

        // Close the modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('createProductModal'));
        modal.hide();

        alert('Product saved successfully!');
        renderProducts()
    } else {
        alert('Please fill all fields.');
    }
});


/*------------------- View Product ------------------ */
function viewProduct(id) {
    // Get product from localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(product => product.id === id);

    // Populate modal with product details
    document.getElementById('viewProductName').textContent = product.name;
    document.getElementById('viewProductDetail').textContent = product.detail;
    document.getElementById('viewProductPrice').textContent = product.price;
    document.getElementById('viewProductImage').src = product.image;
    document.getElementById('viewProductType').textContent = product.type;
}

/*------------------- Edit Product ------------------ */

function editProduct(id) {
    // Get products from localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(product => product.id === id);

    if (product) {
        // Populate modal with product details
        document.getElementById('editProductId').value = product.id;
        document.getElementById('editProductName').value = product.name;
        document.getElementById('editProductDetail').value = product.detail;
        document.getElementById('editProductPrice').value = product.price;
        document.getElementById('editProductType').value = product.type;
    } else {
        alert('Product not found');
    }
}

function saveProductChanges() {
    // Lấy ID sản phẩm (không thay đổi)
    const productId = document.getElementById('editProductId').value;

    // Lấy danh sách sản phẩm từ localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Tìm sản phẩm theo ID
    const productIndex = products.findIndex(product => product.id === productId);

    if (productIndex !== -1) {
        // Cập nhật các thuộc tính của sản phẩm (trừ ID)
        products[productIndex].name = document.getElementById('editProductName').value;
        products[productIndex].detail = document.getElementById('editProductDetail').value;
        products[productIndex].price = document.getElementById('editProductPrice').value;
        products[productIndex].type = document.getElementById('editProductType').value;

        // Lưu lại danh sách sản phẩm vào localStorage
        localStorage.setItem('products', JSON.stringify(products));
        alert('Cập nhật sản phẩm thành công!');
        renderProducts()
    } else {
        alert('Không tìm thấy sản phẩm!');
    }
}

/*------------------- Delete Product ------------------ */
function deleteProduct(id) {
    if (confirm('Bạn có  muốn xóa sản phẩm này không?')) {
        const products = JSON.parse(localStorage.getItem('products')) || [];

        // Lọc bỏ sản phẩm có ID cần xóa
        const updatedProducts = products.filter(product => product.id !== id);

        // Kiểm tra xem sản phẩm đã bị xóa hay chưa
        if (updatedProducts.length !== products.length) {
            // Lưu danh sách mới vào localStorage
            localStorage.setItem('products', JSON.stringify(updatedProducts));
            alert('Xóa sản phẩm thành công!');
            renderProducts()
        } else {
            alert('Không tìm thấy sản phẩm để xóa!');
        }
    }
}

