let totalAmount = 0;

window.onload = function() {
    fetchSuppliers();
};

// Toggle the visibility of the supplier form
function toggleSupplierForm() {
    const formSection = document.getElementById('supplier-form-section');
    formSection.style.display = formSection.style.display === 'none' ? 'block' : 'none';
}

// Add a new product input section
function addProduct() {
    const productsDiv = document.getElementById('products');
    const productDiv = document.createElement('div');

    productDiv.appendChild(createInput('text', 'product_name[]', 'Product Name'));
    productDiv.appendChild(createCategorySelect());
    productDiv.appendChild(createInput('number', 'product_quantity[]', 'Quantity'));
    productDiv.appendChild(createInput('number', 'product_price[]', 'Price'));
    productDiv.appendChild(createInput('number', 'product_total_price[]', 'Total Price'));

    productsDiv.appendChild(productDiv);
}

// Create an input element
function createInput(type, name, placeholder) {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = placeholder;
    return input;
}

// Create a select element for product categories
function createCategorySelect() {
    const select = document.createElement('select');
    select.name = 'product_category[]';
    const categories = ['Fruits', 'Vegetables', 'Drinks', 'Meat', 'Foods', 'Grains'];
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.toLowerCase();
        option.textContent = category;
        select.appendChild(option);
    });
    return select;
}

// Save the supplier data
function saveSupplier(event) {
    event.preventDefault();

    const supplierData = {
        name: document.getElementById('supplier-name').value,
        email: document.getElementById('supplier-email').value,
        phone: document.getElementById('supplier-phone').value,
        address: document.getElementById('supplier-address').value,
        products: getProducts()
    };

    fetch('http://localhost:3001/suppliers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(supplierData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Supplier saved successfully:', data);
        fetchSuppliers();
        toggleSupplierForm();
        document.getElementById('add-supplier-form').reset();
        document.getElementById('products').innerHTML = '';
    })
    .catch(error => {
        console.error('Error saving supplier:', error);
    });
}

// Get the list of products from the form
function getProducts() {
    const products = [];
    const productDivs = document.querySelectorAll('#products > div');
    productDivs.forEach(div => {
        const productName = div.querySelector('input[name="product_name[]"]').value;
        const productCategory = div.querySelector('select[name="product_category[]"]').value;
        const productQuantity = parseInt(div.querySelector('input[name="product_quantity[]"]').value);
        const productPrice = parseFloat(div.querySelector('input[name="product_price[]"]').value);
        const productTotalPrice = parseFloat(div.querySelector('input[name="product_total_price[]"]').value);
        totalAmount += productTotalPrice;
        products.push({ productName, productCategory, productQuantity, productPrice, productTotalPrice });
    });
    return products;
}

// Fetch the list of suppliers
function fetchSuppliers() {
    fetch('http://localhost:3001/suppliers')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched suppliers:', data);
            displaySuppliers(data);
        })
        .catch(error => {
            console.error('Error fetching suppliers:', error);
        });
}

// Display the list of suppliers
function displaySuppliers(suppliers) {
    const supplierList = document.getElementById('supplier-list').getElementsByTagName('tbody')[0];
    supplierList.innerHTML = ''; // Clear existing rows
    suppliers.forEach(supplier => {
        const supplierRow = document.createElement('tr');
        const totalSupplierAmount = supplier.products.reduce((sum, product) => sum + parseFloat(product.product_total_price), 0);
        totalAmount += totalSupplierAmount;
        supplierRow.innerHTML = `
            <td>${supplier.name}</td>
            <td>${supplier.email}</td>
            <td>${supplier.phone}</td>
            <td>${supplier.address}</td>
            <td>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${supplier.products.map(product => `
                            <tr>
                                <td>${product.product_name}</td>
                                <td>${product.product_category}</td>
                                <td>${product.product_quantity}</td>
                                <td>${product.product_price}</td>
                                <td>${product.product_total_price}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </td>
            <td>
                <button onclick="markAsPaid(this, ${totalSupplierAmount})">Paid</button>
                <button onclick="deleteSupplier(${supplier.id}, ${totalSupplierAmount})">Delete</button>
            </td>
        `;
        supplierList.appendChild(supplierRow);
    });
    updateTotalAmount();
}

// Update the total amount displayed
function updateTotalAmount() {
    const totalAmountElement = document.getElementById('totalAmount');
    totalAmountElement.innerText = totalAmount.toFixed(2);
}

// Mark a supplier as paid
function markAsPaid(button, amount) {
    if (button.disabled) return; // Prevent double-clicking

    button.disabled = true;
    totalAmount -= amount;
    updateTotalAmount();
}

// Delete a supplier
function deleteSupplier(supplierId, amount) {
    console.log(`Deleting supplier with ID: ${supplierId}`);
    fetch(`http://localhost:3001/suppliers/${supplierId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete supplier');
        }
        return response.json();
    })
    .then(data => {
        console.log('Supplier deleted successfully:', data);
        totalAmount -= amount;
        updateTotalAmount();
        fetchSuppliers(); // Refresh the supplier list
    })
    .catch(error => {
        console.error('Error deleting supplier:', error);
    });
}