window.onload = function() {
    fetchOrders();
};

async function fetchOrders() {
    try {
        const response = await fetch('/orders');
        const orders = await response.json();
        console.log('Fetched orders:', orders); // Debugging log
        displayOrders(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
    }
}

function displayOrders(orders) {
    const orderTableBody = document.getElementById('orderTable').getElementsByTagName('tbody')[0];
    orderTableBody.innerHTML = ''; // Clear existing rows
    let totalAmount = 0;
    let totalAmountReceived = 0;
    orders.forEach(order => {
        totalAmount += order.price * order.quantity;
        if (order.paid) {
            totalAmountReceived += order.price * order.quantity;
        }
        const newRow = orderTableBody.insertRow();
        newRow.innerHTML = `
            <td>${order.productName}</td>
            <td>${order.category}</td>
            <td>${order.price}</td>
            <td>${order.quantity}</td>
            <td>${(order.price * order.quantity).toFixed(2)}</td>
            <td>${order.paid ? 'Paid' : 'Unpaid'}</td>
            <td>
                <button onclick="markAsPaid(${order.id}, ${order.price * order.quantity})" ${order.paid ? 'disabled' : ''}>Mark as Paid</button>
                <button onclick="updateStatus(${order.id}, ${order.paid})">Update Status</button>
            </td>
        `;
    });
    document.getElementById('totalAmount').innerText = totalAmount.toFixed(2);
    document.getElementById('totalAmountReceived').innerText = totalAmountReceived.toFixed(2);
}

let isPaid = false;

async function markAsPaid(orderId, amount) {
    try {
        const response = await fetch(`/orders/${orderId}/pay`, {
            method: 'POST'
        });
        if (response.ok) {
            console.log('Order marked as paid successfully');
            updateAmounts(amount);
            fetchOrders(); // Refresh the order list
            updateReport();
            isPaid = true;
            alert('Amount is paid');
        } else {
            console.error('Failed to mark order as paid');
        }
    } catch (error) {
        console.error('Error marking order as paid:', error);
    }
}

function updateAmounts(amount) {
    const totalAmountElement = document.getElementById('totalAmount');
    const totalAmountReceivedElement = document.getElementById('totalAmountReceived');

    let totalAmount = parseFloat(totalAmountElement.innerText);
    let totalAmountReceived = parseFloat(totalAmountReceivedElement.innerText);

    totalAmount -= amount;
    totalAmountReceived += amount;

    totalAmountElement.innerText = totalAmount.toFixed(2);
    totalAmountReceivedElement.innerText = totalAmountReceived.toFixed(2);
}

function goToReport() {
    window.location.href = 'report.html';
}

async function updateReport() {
    try {
        const response = await fetch('/reports');
        const reports = await response.json();
        console.log('Fetched reports:', reports); // Debugging log
        displayReports(reports);
    } catch (error) {
        console.error('Error fetching reports:', error);
    }
}

function displayReports(reports) {
    const totalAmountReceived = reports.totalAmountReceived || 0;
    document.getElementById('totalAmountReceived').innerText = totalAmountReceived.toFixed(2);
}

function updateStatus(orderId, isPaid) {
    if (!isPaid) {
        alert('Amount is not paid');
        return;
    }

    alert('Amount is paid');

    const newStatus = prompt('Enter new status:');
    if (newStatus) {
        fetch(`/orders/${orderId}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Status updated successfully:', data);
            fetchOrders(); // Refresh the order list
        })
        .catch(error => {
            console.error('Error updating status:', error);
        });
    }
}