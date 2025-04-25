let sumOfAmount = 0;

document.addEventListener('DOMContentLoaded', () => {
    sumOfAmount = 0;
    localStorage.removeItem('sumOfAmount');
    document.getElementById('sumOfAmount').innerText = sumOfAmount.toFixed(2);

    fetch('/inventory')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];
            data.forEach(item => {
                const newRow = table.insertRow();
                newRow.innerHTML = `
                    <td><input type="checkbox" class="select-product" data-id="${item.id}" data-name="${item.product_name}" data-category="${item.category}" data-quantity="${item.quantity}" data-price="${item.price}"></td>
                    <td>${item.product_name}</td>
                    <td>${item.category}</td>
                    <td>${item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${item.total_price.toFixed(2)}</td>
                    <td>
                        <button onclick="editProduct(${item.id})">Edit</button>
                        <button onclick="deleteProduct(${item.id})">Delete</button>
                    </td>
                `;
                sumOfAmount += item.total_price;
            });
            document.getElementById('sumOfAmount').innerText = sumOfAmount.toFixed(2);
        })
        .catch(error => console.error('Error fetching inventory data:', error));
});

function addProduct() {
    const productName = document.getElementById('productName').value;
    const category = document.getElementById('category').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const price = parseFloat(document.getElementById('price').value);
    const totalPrice = quantity * price;

    fetch('/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_name: productName, category, quantity, price, total_price: totalPrice })
    })
    .then(response => response.json())
    .then(data => {
        const table = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td>${productName}</td>
            <td>${category}</td>
            <td>${quantity}</td>
            <td>${price.toFixed(2)}</td>
            <td>${totalPrice.toFixed(2)}</td>
            <td>
                <button onclick="editProduct(${data.id})">Edit</button>
                <button onclick="deleteProduct(${data.id})">Delete</button>
            </td>
        `;
        sumOfAmount += totalPrice;
        document.getElementById('sumOfAmount').innerText = sumOfAmount.toFixed(2);
        localStorage.setItem('sumOfAmount', sumOfAmount.toFixed(2));
        document.getElementById('productForm').reset();
    })
    .catch(error => console.error('Error:', error));
}

function editProduct(productId) {
    fetch(`/inventory/${productId}`)
        .then(response => response.json())
        .then(product => {
            document.getElementById('productName').value = product.product_name;
            document.getElementById('category').value = product.category;
            document.getElementById('quantity').value = product.quantity;
            document.getElementById('price').value = product.price;
            document.getElementById('productForm').onsubmit = function(event) {
                event.preventDefault();
                updateProduct(productId);
            };
        })
        .catch(error => console.error('Error fetching product data:', error));
}

function updateProduct(productId) {
    const productName = document.getElementById('productName').value;
    const category = document.getElementById('category').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const price = parseFloat(document.getElementById('price').value);
    const totalPrice = quantity * price;

    fetch(`/inventory/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_name: productName, category, quantity, price, total_price: totalPrice })
    })
    .then(response => response.json())
    .then(data => {
        const table = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];
        for (let i = 0; i < table.rows.length; i++) {
            const row = table.rows[i];
            if (parseInt(row.cells[5].getElementsByTagName('button')[0].getAttribute('onclick').match(/\d+/)[0]) === productId) {
                row.cells[0].innerText = productName;
                row.cells[1].innerText = category;
                row.cells[2].innerText = quantity;
                row.cells[3].innerText = price.toFixed(2);
                row.cells[4].innerText = totalPrice.toFixed(2);
                break;
            }
        }
        sumOfAmount = Array.from(table.rows).reduce((sum, row) => sum + parseFloat(row.cells[4].innerText), 0);
        document.getElementById('sumOfAmount').innerText = sumOfAmount.toFixed(2);
        localStorage.setItem('sumOfAmount', sumOfAmount.toFixed(2));
        document.getElementById('productForm').reset();
        document.getElementById('productForm').onsubmit = function(event) {
            event.preventDefault();
            addProduct();
        };
    })
    .catch(error => console.error('Error:', error));
}

function deleteProduct(productId) {
    fetch(`/inventory/${productId}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(data => {
        const table = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];
        for (let i = 0; i < table.rows.length; i++) {
            const row = table.rows[i];
            if (parseInt(row.cells[5].getElementsByTagName('button')[0].getAttribute('onclick').match(/\d+/)[0]) === productId) {
                sumOfAmount -= parseFloat(row.cells[4].innerText);
                table.deleteRow(i);
                break;
            }
        }
        document.getElementById('sumOfAmount').innerText = sumOfAmount.toFixed(2);
        localStorage.setItem('sumOfAmount', sumOfAmount.toFixed(2));
    })
    .catch(error => console.error('Error:', error));
}

function showOrderSection() {
    document.getElementById('orderSection').style.display = 'block';
    populateCategorySelect();
}

function populateCategorySelect() {
    const categorySelect = document.getElementById('orderCategory');
    categorySelect.innerHTML = '<option value="">Select Category</option>';

    const inventoryTableBody = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];
    const categories = new Set();

    for (let i = 0; i < inventoryTableBody.rows.length; i++) {
        const row = inventoryTableBody.rows[i];
        categories.add(row.cells[1].innerText);
    }

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.innerText = category;
        categorySelect.appendChild(option);
    });
}

function showProductsByCategory() {
    const selectedCategory = document.getElementById('orderCategory').value;
    const orderTableBody = document.getElementById('orderTable').getElementsByTagName('tbody')[0];
    const inventoryTableBody = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];

    orderTableBody.innerHTML = '';

    for (let i = 0; i < inventoryTableBody.rows.length; i++) {
        const row = inventoryTableBody.rows[i];
        if (row.cells[1].innerText === selectedCategory) {
            const newRow = orderTableBody.insertRow();
            newRow.innerHTML = `
                <td>${row.cells[0].innerText}</td>
                <td>${row.cells[1].innerText}</td>
                <td>${row.cells[3].innerText}</td>
                <td><input type="number" min="0" max="${row.cells[2].innerText}" value="0"></td>
            `;
        }
    }
}

function addMoreProducts() {
    populateCategorySelect();
    document.getElementById('orderCategory').value = '';
}

function placeOrder() {
    const selectedProducts = [];
    document.querySelectorAll('.select-product:checked').forEach(checkbox => {
        selectedProducts.push({
            id: checkbox.getAttribute('data-id'),
            productName: checkbox.getAttribute('data-name'),
            category: checkbox.getAttribute('data-category'),
            quantity: parseInt(checkbox.getAttribute('data-quantity')),
            price: parseFloat(checkbox.getAttribute('data-price'))
        });
    });
    localStorage.setItem('orderedProducts', JSON.stringify(selectedProducts));
    window.location.href = 'order.html';
}