// window.onload = function() {
//     fetchReports();
//     fetchUnpaidOrders();
// };

// async function fetchReports() {
//     try {
//         const response = await fetch('/reports');
//         const reports = await response.json();
//         console.log('Fetched reports:', reports); // Debugging log
//         displayReports(reports);
//     } catch (error) {
//         console.error('Error fetching reports:', error);
//     }
// }

// function displayReports(reports) {
//     const totalInventoryAmount = reports.totalInventoryAmount || 0;
//     const totalAmountReceived = reports.totalAmountReceived || 0;
//     const totalOrderedItems = reports.totalOrderedItems || 0;
//     const totalOrderAmount = reports.totalOrderAmount || 0;

//     document.getElementById('totalInventoryAmount').innerText = totalInventoryAmount.toFixed(2);
//     document.getElementById('totalAmountReceived').innerText = totalAmountReceived.toFixed(2);
//     document.getElementById('totalOrderedItems').innerText = totalOrderedItems;
//     document.getElementById('totalOrderAmount').innerText = totalOrderAmount.toFixed(2);
// }

// async function fetchUnpaidOrders() {
//     try {
//         const response = await fetch('/unpaid-orders');
//         const unpaidOrders = await response.json();
//         console.log('Fetched unpaid orders:', unpaidOrders); // Debugging log
//         displayUnpaidOrders(unpaidOrders);
//     } catch (error) {
//         console.error('Error fetching unpaid orders:', error);
//     }
// }

// function displayUnpaidOrders(unpaidOrders) {
//     const unpaidOrdersTableBody = document.getElementById('unpaidOrdersTable').getElementsByTagName('tbody')[0];
//     unpaidOrdersTableBody.innerHTML = ''; // Clear existing rows
//     unpaidOrders.forEach(order => {
//         const newRow = unpaidOrdersTableBody.insertRow();
//         newRow.innerHTML = `
//             <td>${order.productName}</td>
//             <td>${order.category}</td>
//             <td>${order.price}</td>
//             <td>${order.quantity}</td>
//             <td>${(order.price * order.quantity).toFixed(2)}</td>
//             <td><button onclick="deleteUnpaidOrder(${order.id})">Delete</button></td>
//         `;
//     });
// }

// async function deleteUnpaidOrder(orderId) {
//     try {
//         const response = await fetch(`/unpaid-orders/${orderId}`, {
//             method: 'DELETE'
//         });
//         if (response.ok) {
//             console.log('Unpaid order deleted successfully');
//             fetchUnpaidOrders(); // Refresh the unpaid orders list
//         } else {
//             console.error('Failed to delete unpaid order');
//         }
//     } catch (error) {
//         console.error('Error deleting unpaid order:', error);
//     }
// }
//------------------------
// window.onload = function() {
//     fetchReports();
//     fetchUnpaidOrders();
//     fetchPaidOrders();
// };

// async function fetchReports() {
//     try {
//         const response = await fetch('/reports');
//         const reports = await response.json();
//         console.log('Fetched reports:', reports); // Debugging log
//         displayReports(reports);
//     } catch (error) {
//         console.error('Error fetching reports:', error);
//     }
// }

// function displayReports(reports) {
//     const totalInventoryAmount = reports.totalInventoryAmount || 0;
//     const totalAmountReceived = reports.totalAmountReceived || 0;
//     const totalOrderedItems = reports.totalOrderedItems || 0;
//     const totalOrderAmount = reports.totalOrderAmount || 0;

//     document.getElementById('totalInventoryAmount').innerText = totalInventoryAmount.toFixed(2);
//     document.getElementById('totalAmountReceived').innerText = totalAmountReceived.toFixed(2);
//     document.getElementById('totalOrderedItems').innerText = totalOrderedItems;
//     document.getElementById('totalOrderAmount').innerText = totalOrderAmount.toFixed(2);
// }

// async function fetchUnpaidOrders() {
//     try {
//         const response = await fetch('/unpaid-orders');
//         const unpaidOrders = await response.json();
//         console.log('Fetched unpaid orders:', unpaidOrders); // Debugging log
//         displayUnpaidOrders(unpaidOrders);
//     } catch (error) {
//         console.error('Error fetching unpaid orders:', error);
//     }
// }

// function displayUnpaidOrders(unpaidOrders) {
//     const unpaidOrdersTableBody = document.getElementById('unpaidOrdersTable').getElementsByTagName('tbody')[0];
//     unpaidOrdersTableBody.innerHTML = ''; // Clear existing rows
//     unpaidOrders.forEach(order => {
//         const newRow = unpaidOrdersTableBody.insertRow();
//         newRow.innerHTML = `
//             <td>${order.productName}</td>
//             <td>${order.category}</td>
//             <td>${order.price}</td>
//             <td>${order.quantity}</td>
//             <td>${(order.price * order.quantity).toFixed(2)}</td>
//         `;
//     });
// }

// async function fetchPaidOrders() {
//     try {
//         const response = await fetch('/paid-orders');
//         const paidOrders = await response.json();
//         console.log('Fetched paid orders:', paidOrders); // Debugging log
//         displayPaidOrders(paidOrders);
//     } catch (error) {
//         console.error('Error fetching paid orders:', error);
//     }
// }

// function displayPaidOrders(paidOrders) {
//     const paidOrdersTableBody = document.getElementById('paidOrdersTable').getElementsByTagName('tbody')[0];
//     paidOrdersTableBody.innerHTML = ''; // Clear existing rows
//     paidOrders.forEach(order => {
//         const newRow = paidOrdersTableBody.insertRow();
//         newRow.innerHTML = `
//             <td>${order.productName}</td>
//             <td>${order.category}</td>
//             <td>${order.price}</td>
//             <td>${order.quantity}</td>
//             <td>${(order.price * order.quantity).toFixed(2)}</td>
//         `;
//     });
// }

// //------------------------------------
// window.onload = function() {
//     fetchReports();
//     fetchUnpaidOrders();
//     fetchPaidOrders();
// };

// async function fetchReports() {
//     try {
//         const response = await fetch('/reports');
//         const reports = await response.json();
//         console.log('Fetched reports:', reports); // Debugging log
//         displayReports(reports);
//     } catch (error) {
//         console.error('Error fetching reports:', error);
//     }
// }

// function displayReports(reports) {
//     const totalInventoryAmount = reports.totalInventoryAmount || 0;
//     const totalAmountReceived = reports.totalAmountReceived || 0;
//     const totalOrderedItems = reports.totalOrderedItems || 0;
//     const totalOrderAmount = reports.totalOrderAmount || 0;

//     document.getElementById('totalInventoryAmount').innerText = totalInventoryAmount.toFixed(2);
//     document.getElementById('totalAmountReceived').innerText = totalAmountReceived.toFixed(2);
//     document.getElementById('totalOrderedItems').innerText = totalOrderedItems;
//     document.getElementById('totalOrderAmount').innerText = totalOrderAmount.toFixed(2);
// }

// async function fetchUnpaidOrders() {
//     try {
//         const response = await fetch('/unpaid-orders');
//         const unpaidOrders = await response.json();
//         console.log('Fetched unpaid orders:', unpaidOrders); // Debugging log
//         displayUnpaidOrders(unpaidOrders);
//     } catch (error) {
//         console.error('Error fetching unpaid orders:', error);
//     }
// }

// function displayUnpaidOrders(unpaidOrders) {
//     const unpaidOrdersTableBody = document.getElementById('unpaidOrdersTable').getElementsByTagName('tbody')[0];
//     unpaidOrdersTableBody.innerHTML = ''; // Clear existing rows
//     unpaidOrders.forEach(order => {
//         const newRow = unpaidOrdersTableBody.insertRow();
//         newRow.innerHTML = `
//             <td>${order.productName}</td>
//             <td>${order.category}</td>
//             <td>${order.price}</td>
//             <td>${order.quantity}</td>
//             <td>${(order.price * order.quantity).toFixed(2)}</td>
//         `;
//     });
// }

// async function fetchPaidOrders() {
//     try {
//         const response = await fetch('/paid-orders');
//         const paidOrders = await response.json();
//         console.log('Fetched paid orders:', paidOrders); // Debugging log
//         displayPaidOrders(paidOrders);
//     } catch (error) {
//         console.error('Error fetching paid orders:', error);
//     }
// }

// function displayPaidOrders(paidOrders) {
//     const paidOrdersTableBody = document.getElementById('paidOrdersTable').getElementsByTagName('tbody')[0];
//     paidOrdersTableBody.innerHTML = ''; // Clear existing rows
//     paidOrders.forEach(order => {
//         const newRow = paidOrdersTableBody.insertRow();
//         newRow.innerHTML = `
//             <td>${order.productName}</td>
//             <td>${order.category}</td>
//             <td>${order.price}</td>
//             <td>${order.quantity}</td>
//             <td>${(order.price * order.quantity).toFixed(2)}</td>
//         `;
//     });
// }


//--------------------------------
// window.onload = function() {
//     fetchReports();
//     fetchUnpaidOrders();
//     fetchPaidOrders();
// };

// async function fetchReports() {
//     try {
//         const response = await fetch('/reports');
//         const reports = await response.json();
//         console.log('Fetched reports:', reports); // Debugging log
//         displayReports(reports);
//     } catch (error) {
//         console.error('Error fetching reports:', error);
//     }
// }

// function displayReports(reports) {
//     const totalInventoryAmount = reports.totalInventoryAmount || 0;
//     const totalAmountReceived = reports.totalAmountReceived || 0;
//     const totalOrderedItems = reports.totalOrderedItems || 0;
//     const totalOrderAmount = reports.totalOrderAmount || 0;

//     document.getElementById('totalInventoryAmount').innerText = totalInventoryAmount.toFixed(2);
//     document.getElementById('totalAmountReceived').innerText = totalAmountReceived.toFixed(2);
//     document.getElementById('totalOrderedItems').innerText = totalOrderedItems;
//     document.getElementById('totalOrderAmount').innerText = totalOrderAmount.toFixed(2);
// }

// async function fetchUnpaidOrders() {
//     try {
//         const response = await fetch('/unpaid-orders');
//         const unpaidOrders = await response.json();
//         console.log('Fetched unpaid orders:', unpaidOrders); // Debugging log
//         displayUnpaidOrders(unpaidOrders);
//     } catch (error) {
//         console.error('Error fetching unpaid orders:', error);
//     }
// }

// function displayUnpaidOrders(unpaidOrders) {
//     const unpaidOrdersTableBody = document.getElementById('unpaidOrdersTable').getElementsByTagName('tbody')[0];
//     unpaidOrdersTableBody.innerHTML = ''; // Clear existing rows
//     unpaidOrders.forEach(order => {
//         const newRow = unpaidOrdersTableBody.insertRow();
//         newRow.innerHTML = `
//             <td>${order.productName}</td>
//             <td>${order.category}</td>
//             <td>${order.price}</td>
//             <td>${order.quantity}</td>
//             <td>${(order.price * order.quantity).toFixed(2)}</td>
//         `;
//     });
// }

// async function fetchPaidOrders() {
//     try {
//         const response = await fetch('/paid-orders');
//         const paidOrders = await response.json();
//         console.log('Fetched paid orders:', paidOrders); // Debugging log
//         displayPaidOrders(paidOrders);
//     } catch (error) {
//         console.error('Error fetching paid orders:', error);
//     }
// }

// function displayPaidOrders(paidOrders) {
//     const paidOrdersTableBody = document.getElementById('paidOrdersTable').getElementsByTagName('tbody')[0];
//     paidOrdersTableBody.innerHTML = ''; // Clear existing rows
//     paidOrders.forEach(order => {
//         const newRow = paidOrdersTableBody.insertRow();
//         newRow.innerHTML = `
//             <td>${order.productName}</td>
//             <td>${order.category}</td>
//             <td>${order.price}</td>
//             <td>${order.quantity}</td>
//             <td>${(order.price * order.quantity).toFixed(2)}</td>
//         `;
//     });
// }
//-----------------------
// window.onload = function() {
//     fetchReports();
//     fetchUnpaidOrders();
//     fetchPaidOrders();
// };

// async function fetchReports() {
//     try {
//         const response = await fetch('/reports');
//         const reports = await response.json();
//         console.log('Fetched reports:', reports); // Debugging log
//         displayReports(reports);
//     } catch (error) {
//         console.error('Error fetching reports:', error);
//     }
// }

// function displayReports(reports) {
//     const totalInventoryAmount = reports.totalInventoryAmount || 0;
//     const totalAmountReceived = reports.totalAmountReceived || 0;
//     const totalOrderedItems = reports.totalOrderedItems || 0;
//     const totalOrderAmount = reports.totalOrderAmount || 0;

//     document.getElementById('totalInventoryAmount').innerText = totalInventoryAmount.toFixed(2);
//     document.getElementById('totalAmountReceived').innerText = totalAmountReceived.toFixed(2);
//     document.getElementById('totalOrderedItems').innerText = totalOrderedItems;
//     document.getElementById('totalOrderAmount').innerText = totalOrderAmount.toFixed(2);
// }

// async function fetchUnpaidOrders() {
//     try {
//         const response = await fetch('/unpaid-orders');
//         const unpaidOrders = await response.json();
//         console.log('Fetched unpaid orders:', unpaidOrders); // Debugging log
//         displayUnpaidOrders(unpaidOrders);
//     } catch (error) {
//         console.error('Error fetching unpaid orders:', error);
//     }
// }

// function displayUnpaidOrders(unpaidOrders) {
//     const unpaidOrdersTableBody = document.getElementById('unpaidOrdersTable').getElementsByTagName('tbody')[0];
//     unpaidOrdersTableBody.innerHTML = ''; // Clear existing rows
//     unpaidOrders.forEach(order => {
//         const newRow = unpaidOrdersTableBody.insertRow();
//         newRow.innerHTML = `
//             <td>${order.productName}</td>
//             <td>${order.category}</td>
//             <td>${order.price}</td>
//             <td>${order.quantity}</td>
//             <td>${(order.price * order.quantity).toFixed(2)}</td>
//         `;
//     });
// }

// async function fetchPaidOrders() {
//     try {
//         const response = await fetch('/paid-orders');
//         const paidOrders = await response.json();
//         console.log('Fetched paid orders:', paidOrders); // Debugging log
//         displayPaidOrders(paidOrders);
//     } catch (error) {
//         console.error('Error fetching paid orders:', error);
//     }
// }

// function displayPaidOrders(paidOrders) {
//     const paidOrdersTableBody = document.getElementById('paidOrdersTable').getElementsByTagName('tbody')[0];
//     paidOrdersTableBody.innerHTML = ''; // Clear existing rows
//     paidOrders.forEach(order => {
//         const newRow = paidOrdersTableBody.insertRow();
//         newRow.innerHTML = `
//             <td>${order.productName}</td>
//             <td>${order.category}</td>
//             <td>${order.price}</td>
//             <td>${order.quantity}</td>
//             <td>${(order.price * order.quantity).toFixed(2)}</td>
//         `;
//     });
// }


//--------------
// window.onload = function() {
//     fetchReports();
//     fetchUnpaidOrders();
//     fetchPaidOrders();
// };

// async function fetchReports() {
//     try {
//         const response = await fetch('/reports');
//         const reports = await response.json();
//         console.log('Fetched reports:', reports); // Debugging log
//         displayReports(reports);
//     } catch (error) {
//         console.error('Error fetching reports:', error);
//     }
// }

// function displayReports(reports) {
//     const totalInventoryAmount = reports.totalInventoryAmount || 0;
//     const totalAmountReceived = reports.totalAmountReceived || 0;
//     const totalOrderedItems = reports.totalOrderedItems || 0;
//     const totalOrderAmount = reports.totalOrderAmount || 0;

//     document.getElementById('totalInventoryAmount').innerText = totalInventoryAmount.toFixed(2);
//     document.getElementById('totalAmountReceived').innerText = totalAmountReceived.toFixed(2);
//     document.getElementById('totalOrderedItems').innerText = totalOrderedItems;
//     document.getElementById('totalOrderAmount').innerText = totalOrderAmount.toFixed(2);
// }

// async function fetchUnpaidOrders() {
//     try {
//         const response = await fetch('/unpaid-orders');
//         const unpaidOrders = await response.json();
//         console.log('Fetched unpaid orders:', unpaidOrders); // Debugging log
//         displayUnpaidOrders(unpaidOrders);
//     } catch (error) {
//         console.error('Error fetching unpaid orders:', error);
//     }
// }

// function displayUnpaidOrders(unpaidOrders) {
//     const unpaidOrdersTableBody = document.getElementById('unpaidOrdersTable').getElementsByTagName('tbody')[0];
//     unpaidOrdersTableBody.innerHTML = ''; // Clear existing rows
//     unpaidOrders.forEach(order => {
//         const newRow = unpaidOrdersTableBody.insertRow();
//         newRow.innerHTML = `
//             <td>${order.productName}</td>
//             <td>${order.category}</td>
//             <td>${order.price}</td>
//             <td>${order.quantity}</td>
//             <td>${(order.price * order.quantity).toFixed(2)}</td>
//         `;
//     });
// }

// async function fetchPaidOrders() {
//     try {
//         const response = await fetch('/paid-orders');
//         const paidOrders = await response.json();
//         console.log('Fetched paid orders:', paidOrders); // Debugging log
//         displayPaidOrders(paidOrders);
//     } catch (error) {
//         console.error('Error fetching paid orders:', error);
//     }
// }

// function displayPaidOrders(paidOrders) {
//     const paidOrdersTableBody = document.getElementById('paidOrdersTable').getElementsByTagName('tbody')[0];
//     paidOrdersTableBody.innerHTML = ''; // Clear existing rows
//     paidOrders.forEach(order => {
//         const newRow = paidOrdersTableBody.insertRow();
//         newRow.innerHTML = `
//             <td>${order.productName}</td>
//             <td>${order.category}</td>
//             <td>${order.price}</td>
//             <td>${order.quantity}</td>
//             <td>${(order.price * order.quantity).toFixed(2)}</td>
//         `;
//     });
// }


//----------------------
window.onload = function() {
    fetchReports();
};

async function fetchReports() {
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
    const totalInventoryAmount = reports.totalInventoryAmount || 0;
    const totalAmountReceived = reports.totalAmountReceived || 0;
    const totalOrderedItems = reports.totalOrderedItems || 0;
    const totalOrderAmount = reports.totalOrderAmount || 0;

    document.getElementById('totalInventoryAmount').innerText = totalInventoryAmount.toFixed(2);
    document.getElementById('totalAmountReceived').innerText = totalAmountReceived.toFixed(2);
    document.getElementById('totalOrderedItems').innerText = totalOrderedItems;
    document.getElementById('totalOrderAmount').innerText = totalOrderAmount.toFixed(2);
}