// let totalAmount = 0;

// function toggleSupplierForm() {
//     const formSection = document.getElementById('supplier-form-section');
//     formSection.style.display = formSection.style.display === 'none' ? 'block' : 'none';
// }

// function addProduct() {
//     const productsDiv = document.getElementById('products');
//     const productDiv = document.createElement('div');

//     const productNameInput = document.createElement('input');
//     productNameInput.type = 'text';
//     productNameInput.name = 'product_name[]';
//     productNameInput.placeholder = 'Product Name';
//     productDiv.appendChild(productNameInput);

//     const productCategorySelect = document.createElement('select');
//     productCategorySelect.name = 'product_category[]';
//     const categories = ['Fruits', 'Vegetables', 'Drinks', 'Meat', 'Foods', 'Grains'];
//     categories.forEach(category => {
//         const option = document.createElement('option');
//         option.value = category.toLowerCase();
//         option.textContent = category;
//         productCategorySelect.appendChild(option);
//     });
//     productDiv.appendChild(productCategorySelect);

//     const productQuantityInput = document.createElement('input');
//     productQuantityInput.type = 'number';
//     productQuantityInput.name = 'product_quantity[]';
//     productQuantityInput.placeholder = 'Quantity';
//     productDiv.appendChild(productQuantityInput);

//     const productPriceInput = document.createElement('input');
//     productPriceInput.type = 'number';
//     productPriceInput.name = 'product_price[]';
//     productPriceInput.placeholder = 'Price';
//     productDiv.appendChild(productPriceInput);

//     const productTotalPriceInput = document.createElement('input');
//     productTotalPriceInput.type = 'number';
//     productTotalPriceInput.name = 'product_total_price[]';
//     productTotalPriceInput.placeholder = 'Total Price';
//     productDiv.appendChild(productTotalPriceInput);

//     productsDiv.appendChild(productDiv);
// }

// function saveSupplier(event) {
//     event.preventDefault();

//     const supplierName = document.getElementById('supplier-name').value;
//     const supplierEmail = document.getElementById('supplier-email').value;
//     const supplierPhone = document.getElementById('supplier-phone').value;
//     const supplierAddress = document.getElementById('supplier-address').value;

//     const products = [];
//     const productDivs = document.querySelectorAll('#products > div');
//     productDivs.forEach(div => {
//         const productName = div.querySelector('input[name="product_name[]"]').value;
//         const productCategory = div.querySelector('select[name="product_category[]"]').value;
//         const productQuantity = parseInt(div.querySelector('input[name="product_quantity[]"]').value);
//         const productPrice = parseFloat(div.querySelector('input[name="product_price[]"]').value);
//         const productTotalPrice = parseFloat(div.querySelector('input[name="product_total_price[]"]').value);
//         totalAmount += productTotalPrice;
//         products.push({ productName, productCategory, productQuantity, productPrice, productTotalPrice });
//     });

//     const supplierData = {
//         name: supplierName,
//         email: supplierEmail,
//         phone: supplierPhone,
//         address: supplierAddress,
//         products: products
//     };

//     fetch('/suppliers', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(supplierData)
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Supplier saved successfully:', data);
//         fetchSuppliers(); // Fetch the updated list of suppliers
//         toggleSupplierForm();
//         document.getElementById('add-supplier-form').reset();
//         document.getElementById('products').innerHTML = '';
//     })
//     .catch(error => console.error('Error saving supplier:', error));
// }

// function updateTotalAmount() {
//     const totalAmountRow = document.getElementById('total-amount-row');
//     if (totalAmountRow) {
//         totalAmountRow.innerHTML = `
//             <td colspan="4">Total Amount to be Paid</td>
//             <td colspan="2">${totalAmount}</td>
//         `;
//     } else {
//         const supplierList = document.getElementById('supplier-list');
//         const totalRow = document.createElement('tr');
//         totalRow.id = 'total-amount-row';
//         totalRow.innerHTML = `
//             <td colspan="4">Total Amount to be Paid</td>
//             <td colspan="2">${totalAmount}</td>
//         `;
//         supplierList.appendChild(totalRow);
//     }
// }

// function changeStatus(button, index) {
//     const row = button.parentElement.parentElement;
//     const paidStatus = row.querySelectorAll('td')[5].querySelectorAll('button')[1].dataset.paid;
//     alert(paidStatus === 'true' ? 'The amount has been paid.' : 'The amount is to be paid.');
// }

// function markAsPaid(button, index, productTotalPrice) {
//     const row = button.parentElement.parentElement;
//     if (button.dataset.paid !== 'true') {
//         button.dataset.paid = 'true';
//         totalAmount -= parseFloat(productTotalPrice);
//         updateTotalAmount();
//         button.disabled = true;
//         alert('The amount has been paid.');
//     }
// }

// async function fetchSuppliers() {
//     try {
//         const response = await fetch('/suppliers');
//         const suppliers = await response.json();
//         displaySuppliers(suppliers);
//     } catch (error) {
//         console.error('Error fetching suppliers:', error);
//     }
// }

// function displaySuppliers(suppliers) {
//     const suppliersDiv = document.getElementById('suppliers');
//     suppliersDiv.innerHTML = '';
//     suppliers.forEach(supplier => {
//         const supplierDiv = document.createElement('div');
//         supplierDiv.innerHTML = `
//             <h2>${supplier.name}</h2>
//             <p>Email: ${supplier.email}</p>
//             <p>Phone: ${supplier.phone}</p>
//             <p>Address: ${supplier.address}</p>
//             <h3>Products</h3>
//             <ul>
//                 ${supplier.products.map(product => `
//                     <li>${product.product_name} - ${product.product_category} - ${product.product_quantity} - ${product.product_price} - ${product.product_total_price}</li>
//                 `).join('')}
//             </ul>
//         `;
//         suppliersDiv.appendChild(supplierDiv);
//     });
// }

// fetchSuppliers();


// let totalAmount = 0;

// function toggleSupplierForm() {
//     const formSection = document.getElementById('supplier-form-section');
//     formSection.style.display = formSection.style.display === 'none' ? 'block' : 'none';
// }

// function addProduct() {
//     const productsDiv = document.getElementById('products');
//     const productDiv = document.createElement('div');

//     const productNameInput = document.createElement('input');
//     productNameInput.type = 'text';
//     productNameInput.name = 'product_name[]';
//     productNameInput.placeholder = 'Product Name';
//     productDiv.appendChild(productNameInput);

//     const productCategorySelect = document.createElement('select');
//     productCategorySelect.name = 'product_category[]';
//     const categories = ['Fruits', 'Vegetables', 'Drinks', 'Meat', 'Foods', 'Grains'];
//     categories.forEach(category => {
//         const option = document.createElement('option');
//         option.value = category.toLowerCase();
//         option.textContent = category;
//         productCategorySelect.appendChild(option);
//     });
//     productDiv.appendChild(productCategorySelect);

//     const productQuantityInput = document.createElement('input');
//     productQuantityInput.type = 'number';
//     productQuantityInput.name = 'product_quantity[]';
//     productQuantityInput.placeholder = 'Quantity';
//     productDiv.appendChild(productQuantityInput);

//     const productPriceInput = document.createElement('input');
//     productPriceInput.type = 'number';
//     productPriceInput.name = 'product_price[]';
//     productPriceInput.placeholder = 'Price';
//     productDiv.appendChild(productPriceInput);

//     const productTotalPriceInput = document.createElement('input');
//     productTotalPriceInput.type = 'number';
//     productTotalPriceInput.name = 'product_total_price[]';
//     productTotalPriceInput.placeholder = 'Total Price';
//     productDiv.appendChild(productTotalPriceInput);

//     productsDiv.appendChild(productDiv);
// }

// function saveSupplier(event) {
//     event.preventDefault();

//     const supplierName = document.getElementById('supplier-name').value;
//     const supplierEmail = document.getElementById('supplier-email').value;
//     const supplierPhone = document.getElementById('supplier-phone').value;
//     const supplierAddress = document.getElementById('supplier-address').value;

//     const products = [];
//     const productDivs = document.querySelectorAll('#products > div');
//     productDivs.forEach(div => {
//         const productName = div.querySelector('input[name="product_name[]"]').value;
//         const productCategory = div.querySelector('select[name="product_category[]"]').value;
//         const productQuantity = div.querySelector('input[name="product_quantity[]"]').value;
//         const productPrice = div.querySelector('input[name="product_price[]"]').value;
//         const productTotalPrice = div.querySelector('input[name="product_total_price[]"]').value;
//         totalAmount += parseFloat(productTotalPrice);
//         products.push({ productName, productCategory, productQuantity, productPrice, productTotalPrice, paid: false });

//         // Send product data to PHP script
//         const xhr = new XMLHttpRequest();
//         xhr.open("POST", "save_product.php", true);
//         xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//         xhr.onload = function() {
//             if (xhr.status === 200) {
//                 console.log("Product saved successfully:", xhr.responseText);
//             } else {
//                 console.error("Failed to save product:", xhr.statusText);
//             }
//         };
//         xhr.onerror = function() {
//             console.error("Request error...");
//         };
//         xhr.send(`product_name=${productName}&product_category=${productCategory}&product_quantity=${productQuantity}&product_price=${productPrice}&product_total_price=${productTotalPrice}`);
//     });

//     const supplierList = document.getElementById('supplier-list');
//     const supplierRow = document.createElement('tr');
//     supplierRow.innerHTML = `
//         <td>${supplierName}</td>
//         <td>${supplierEmail}</td>
//         <td>${supplierPhone}</td>
//         <td>${supplierAddress}</td>
//         <td>
//             <table border="1">
//                 <thead>
//                     <tr>
//                         <th>Product Name</th>
//                         <th>Category</th>
//                         <th>Quantity</th>
//                         <th>Price</th>
//                         <th>Total Price</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     ${products.map((product, index) => `
//                         <tr>
//                             <td>${product.productName}</td>
//                             <td>${product.productCategory}</td>
//                             <td>${product.productQuantity}</td>
//                             <td>${product.productPrice}</td>
//                             <td>${product.productTotalPrice}</td>
//                             <td>
//                                 <button onclick="changeStatus(this, ${index})">Status</button>
//                                 <button onclick="markAsPaid(this, ${index}, ${product.productTotalPrice})">Paid</button>
//                             </td>
//                         </tr>
//                     `).join('')}
//                 </tbody>
//             </table>
//         </td>
//     `;
//     supplierList.appendChild(supplierRow);

//     updateTotalAmount();

//     toggleSupplierForm();
//     document.getElementById('add-supplier-form').reset();
//     document.getElementById('products').innerHTML = '';
// }

// function updateTotalAmount() {
//     const totalAmountRow = document.getElementById('total-amount-row');
//     if (totalAmountRow) {
//         totalAmountRow.innerHTML = `
//             <td colspan="4">Total Amount to be Paid</td>
//             <td colspan="2">${totalAmount}</td>
//         `;
//     } else {
//         const supplierList = document.getElementById('supplier-list');
//         const totalRow = document.createElement('tr');
//         totalRow.id = 'total-amount-row';
//         totalRow.innerHTML = `
//             <td colspan="4">Total Amount to be Paid</td>
//             <td colspan="2">${totalAmount}</td>
//         `;
//         supplierList.appendChild(totalRow);
//     }
// }

// function changeStatus(button, index) {
//     const row = button.parentElement.parentElement;
//     const paidStatus = row.querySelectorAll('td')[5].querySelectorAll('button')[1].dataset.paid;
//     alert(paidStatus === 'true' ? 'The amount has been paid.' : 'The amount is to be paid.');
// }

// function markAsPaid(button, index, productTotalPrice) {
//     const row = button.parentElement.parentElement;
//     if (button.dataset.paid !== 'true') {
//         button.dataset.paid = 'true';
//         totalAmount -= parseFloat(productTotalPrice);
//         updateTotalAmount();
//         button.disabled = true;
//         alert('The amount has been paid.');
//     }
// }

// async function fetchSuppliers() {
//     try {
//         const response = await fetch('/suppliers');
//         const suppliers = await response.json();
//         console.log('Fetched suppliers:', suppliers); // Debugging log
//         displaySuppliers(suppliers);
//     } catch (error) {
//         console.error('Error fetching suppliers:', error);
//     }
// }

// function displaySuppliers(suppliers) {
//     const supplierList = document.getElementById('supplier-list');
//     supplierList.innerHTML = '';
//     suppliers.forEach(supplier => {
//         const supplierRow = document.createElement('tr');
//         supplierRow.innerHTML = `
//             <td>${supplier.name}</td>
//             <td>${supplier.email}</td>
//             <td>${supplier.phone}</td>
//             <td>${supplier.address}</td>
//             <td>
//                 <ul>
//                     ${supplier.products.map(product => `
//                         <li>${product.product_name} - ${product.product_category} - ${product.product_quantity} - ${product.product_price} - ${product.product_total_price}</li>
//                     `).join('')}
//                 </ul>
//             </td>
//         `;
//         supplierList.appendChild(supplierRow);
//     });
// }

// fetchSuppliers();

//--------------------
let totalAmount = 0;

function toggleSupplierForm() {
    const formSection = document.getElementById('supplier-form-section');
    formSection.style.display = formSection.style.display === 'none' ? 'block' : 'none';
}

function addProduct() {
    const productsDiv = document.getElementById('products');
    const productDiv = document.createElement('div');

    const productNameInput = document.createElement('input');
    productNameInput.type = 'text';
    productNameInput.name = 'product_name[]';
    productNameInput.placeholder = 'Product Name';
    productDiv.appendChild(productNameInput);

    const productCategorySelect = document.createElement('select');
    productCategorySelect.name = 'product_category[]';
    const categories = ['Fruits', 'Vegetables', 'Drinks', 'Meat', 'Foods', 'Grains'];
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.toLowerCase();
        option.textContent = category;
        productCategorySelect.appendChild(option);
    });
    productDiv.appendChild(productCategorySelect);

    const productQuantityInput = document.createElement('input');
    productQuantityInput.type = 'number';
    productQuantityInput.name = 'product_quantity[]';
    productQuantityInput.placeholder = 'Quantity';
    productDiv.appendChild(productQuantityInput);

    const productPriceInput = document.createElement('input');
    productPriceInput.type = 'number';
    productPriceInput.name = 'product_price[]';
    productPriceInput.placeholder = 'Price';
    productDiv.appendChild(productPriceInput);

    const productTotalPriceInput = document.createElement('input');
    productTotalPriceInput.type = 'number';
    productTotalPriceInput.name = 'product_total_price[]';
    productTotalPriceInput.placeholder = 'Total Price';
    productDiv.appendChild(productTotalPriceInput);

    productsDiv.appendChild(productDiv);
}

function saveSupplier(event) {
    event.preventDefault();

    const supplierName = document.getElementById('supplier-name').value;
    const supplierEmail = document.getElementById('supplier-email').value;
    const supplierPhone = document.getElementById('supplier-phone').value;
    const supplierAddress = document.getElementById('supplier-address').value;

    const products = [];
    const productDivs = document.querySelectorAll('#products > div');
    productDivs.forEach(div => {
        const productName = div.querySelector('input[name="product_name[]"]').value;
        const productCategory = div.querySelector('select[name="product_category[]"]').value;
        const productQuantity = div.querySelector('input[name="product_quantity[]"]').value;
        const productPrice = div.querySelector('input[name="product_price[]"]').value;
        const productTotalPrice = div.querySelector('input[name="product_total_price[]"]').value;
        totalAmount += parseFloat(productTotalPrice);
        products.push({ productName, productCategory, productQuantity, productPrice, productTotalPrice });
    });

    const supplierData = {
        name: supplierName,
        email: supplierEmail,
        phone: supplierPhone,
        address: supplierAddress,
        products: products
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

        const supplierList = document.getElementById('supplier-list');
        const supplierRow = document.createElement('tr');
        supplierRow.innerHTML = `
            <td>${supplierName}</td>
            <td>${supplierEmail}</td>
            <td>${supplierPhone}</td>
            <td>${supplierAddress}</td>
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
                        ${products.map(product => `
                            <tr>
                                <td>${product.productName}</td>
                                <td>${product.productCategory}</td>
                                <td>${product.productQuantity}</td>
                                <td>${product.productPrice}</td>
                                <td>${product.productTotalPrice}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </td>
        `;
        supplierList.appendChild(supplierRow);

        updateTotalAmount();

        toggleSupplierForm();
        document.getElementById('add-supplier-form').reset();
        document.getElementById('products').innerHTML = '';
    })
    .catch(error => {
        console.error('Error saving supplier:', error);
    });
}

function updateTotalAmount() {
    const totalAmountRow = document.getElementById('total-amount-row');
    if (totalAmountRow) {
        totalAmountRow.innerHTML = `
            <td colspan="4">Total Amount to be Paid</td>
            <td colspan="2">${totalAmount}</td>
        `;
    } else {
        const supplierList = document.getElementById('supplier-list');
        const totalRow = document.createElement('tr');
        totalRow.id = 'total-amount-row';
        totalRow.innerHTML = `
            <td colspan="4">Total Amount to be Paid</td>
            <td colspan="2">${totalAmount}</td>
        `;
        supplierList.appendChild(totalRow);
    }
}