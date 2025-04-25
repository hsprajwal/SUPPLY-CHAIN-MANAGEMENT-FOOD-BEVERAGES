let sumOfAmount = 0;

document.addEventListener('DOMContentLoaded', () => {
    sumOfAmount = parseFloat(localStorage.getItem('sumOfAmount')) || 0;
    document.getElementById('sumOfAmount').innerText = sumOfAmount.toFixed(2);

    fetch('/inventory')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];
            table.innerHTML = ''; // Clear existing rows
            sumOfAmount = 0; // Reset sum of amount
            data.forEach(product => {
                addProductRow(table, product);
                sumOfAmount += product.total_price;
            });
            updateSumOfAmount();
        })
        .catch(error => console.error('Error fetching inventory data:', error));
});

function addProduct(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get the input values
    const productName = document.getElementById('productName').value.trim();
    const category = document.getElementById('category').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const price = parseFloat(document.getElementById('price').value);
    const totalPrice = quantity * price;

    if (!productName || isNaN(quantity) || isNaN(price)) {
        alert('Please fill in all fields correctly.');
        return;
    }

    const product = { product_name: productName, category, quantity, price, total_price: totalPrice };

    // Add a new product
    fetch('/inventory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
        const table = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];
        addProductRow(table, data);
        sumOfAmount += totalPrice;
        updateSumOfAmount();
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

            // Temporarily override the form's onsubmit behavior for updating the product
            const productForm = document.getElementById('productForm');
            productForm.onsubmit = function(event) {
                event.preventDefault();
                updateProduct(productId);
            };
        })
        .catch(error => console.error('Error fetching product data:', error));
}

function updateProduct(productId) {
    const productName = document.getElementById('productName').value.trim();
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
            if (parseInt(row.cells[6].getElementsByTagName('button')[0].getAttribute('onclick').match(/\d+/)[0]) === productId) {
                sumOfAmount -= parseFloat(row.cells[5].innerText); // Subtract old total price
                updateProductRow(row, productName, category, quantity, price, totalPrice);
                sumOfAmount += totalPrice; // Add new total price
                break;
            }
        }
        updateSumOfAmount();

        // Reset the form and restore the default onsubmit behavior
        const productForm = document.getElementById('productForm');
        productForm.reset();
        productForm.onsubmit = function(event) {
            event.preventDefault();
            addProduct(event);
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
            if (parseInt(row.cells[6].getElementsByTagName('button')[0].getAttribute('onclick').match(/\d+/)[0]) === productId) {
                sumOfAmount -= parseFloat(row.cells[5].innerText); // Subtract total price of deleted product
                table.deleteRow(i);
                break;
            }
        }
        updateSumOfAmount();
    })
    .catch(error => console.error('Error:', error));
}

function addProductRow(table, product) {
    // Check if the product already exists in the table
    let existingRow = null;
    for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];
        if (row.cells[1].innerText === product.product_name && parseFloat(row.cells[4].innerText) === product.price) {
            existingRow = row;
            break;
        }
    }

    if (existingRow) {
        // Update the existing row
        const newQuantity = parseInt(existingRow.cells[3].innerText) + product.quantity;
        const newTotalPrice = parseFloat(existingRow.cells[5].innerText) + product.total_price;

        existingRow.cells[3].innerText = newQuantity;
        existingRow.cells[5].innerText = newTotalPrice.toFixed(2);
    } else {
        // Add a new row
        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td><input type="checkbox" class="select-product" data-id="${product.id}" data-name="${product.product_name}" data-category="${product.category}" data-quantity="${product.quantity}" data-price="${product.price}"></td>
            <td>${product.product_name}</td>
            <td>${product.category}</td>
            <td>${product.quantity}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>${product.total_price.toFixed(2)}</td>
            <td>
                <button onclick="editProduct(${product.id})">Edit</button>
                <button onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        `;
    }
}

function updateProductRow(row, productName, category, quantity, price, totalPrice) {
    row.cells[1].innerText = productName;
    row.cells[2].innerText = category;
    row.cells[3].innerText = quantity;
    row.cells[4].innerText = price.toFixed(2);
    row.cells[5].innerText = totalPrice.toFixed(2);
}

function updateSumOfAmount() {
    document.getElementById('sumOfAmount').innerText = sumOfAmount.toFixed(2);
    localStorage.setItem('sumOfAmount', sumOfAmount.toFixed(2));
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
        categories.add(row.cells[2].innerText);
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
        if (row.cells[2].innerText === selectedCategory) {
            const newRow = orderTableBody.insertRow();
            newRow.innerHTML = `
                <td>${row.cells[1].innerText}</td>
                <td>${row.cells[2].innerText}</td>
                <td>${row.cells[4].innerText}</td>
                <td><input type="number" min="0" max="${row.cells[3].innerText}" value="0"></td>
                <td><button onclick="deleteOrderProduct(this)">Delete</button></td> <!-- New delete button -->
            `;
        }
    }
}

function deleteOrderProduct(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function addMoreProducts() {
    populateCategorySelect();
    document.getElementById('orderCategory').value = '';
}
function placeOrder() {
    const orderTableBody = document.getElementById('orderTable').getElementsByTagName('tbody')[0];
    const inventoryTableBody = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];
    let totalOrderedAmount = 0;
    const orderedProducts = [];
    let canPlaceOrder = true;

    for (let i = 0; i < orderTableBody.rows.length; i++) {
        const orderRow = orderTableBody.rows[i];
        const productName = orderRow.cells[0].innerText;
        const category = orderRow.cells[1].innerText;
        const orderQuantity = parseInt(orderRow.cells[3].getElementsByTagName('input')[0].value);

        for (let j = 0; j < inventoryTableBody.rows.length; j++) {
            const inventoryRow = inventoryTableBody.rows[j];
            if (inventoryRow.cells[1].innerText === productName && inventoryRow.cells[2].innerText === category) {
                const inventoryQuantity = parseInt(inventoryRow.cells[3].innerText);
                if (orderQuantity > inventoryQuantity) {
                    alert(`Not possible to place order for ${productName} because no sufficient products are available.`);
                    canPlaceOrder = false;
                    break;
                } else {
                    const newQuantity = inventoryQuantity - orderQuantity;
                    inventoryRow.cells[3].innerText = newQuantity;
                    const price = parseFloat(inventoryRow.cells[4].innerText);
                    const newTotalPrice = newQuantity * price;
                    inventoryRow.cells[5].innerText = newTotalPrice.toFixed(2);
                    totalOrderedAmount += orderQuantity * price;

                    // Add ordered product details to the array
                    orderedProducts.push({
                        productName: productName,
                        category: category,
                        price: price,
                        quantity: orderQuantity,
                        paid: false
                    });

                    // Update the product on the server
                    fetch(`/inventory/${inventoryRow.cells[0].getElementsByTagName('input')[0].dataset.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            product_name: productName,
                            category: category,
                            quantity: newQuantity,
                            price: price,
                            total_price: newTotalPrice
                        })
                    })
                    .catch(error => console.error('Error updating inventory:', error));
                }
            }
        }
        if (!canPlaceOrder) break;
    }

    if (canPlaceOrder) {
        // Calculate the new sum of amount
        sumOfAmount -= totalOrderedAmount;
        document.getElementById('sumOfAmount').innerText = sumOfAmount.toFixed(2);

        // Store the updated sum of amount in local storage
        localStorage.setItem('sumOfAmount', sumOfAmount.toFixed(2));

        // Store ordered products in local storage
        localStorage.setItem('orderedProducts', JSON.stringify(orderedProducts));

        // Send the selected products to the server to store in the orders table
        fetch('/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderedProducts)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Order placed successfully:', data);
            // Navigate to the order page
            window.location.href = 'order.html';
        })
        .catch(error => console.error('Error placing order:', error));
    }
}