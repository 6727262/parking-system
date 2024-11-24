// Function to load parked cars from LocalStorage
function loadParkedCars() {
    const parkedCars = JSON.parse(localStorage.getItem('parkedCars')) || [];
    const tableBody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    parkedCars.forEach(car => {
        addRowToTable(car, tableBody);
    });
}

// Function to add a row to the table
function addRowToTable(car, tableBody) {
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td>${car.name}</td>
        <td>${car.plate}</td>
        <td>${car.color}</td>
        <td>${car.phoneNum}</td>
        <td>${car.entrance}</td>
        <td><button class="remove-btn">Remove</button></td>
    `;

    // Add event listener for remove button
    newRow.querySelector('.remove-btn').addEventListener('click', function() {
        tableBody.deleteRow(newRow.rowIndex - 1);
        updateLocalStorage();
    });
}

// Function to update LocalStorage
function updateLocalStorage() {
    const tableBody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    const parkedCars = [...tableBody.rows].map(row => ({
        name: row.cells[0].innerText,
        plate: row.cells[1].innerText,
        color: row.cells[2].innerText,
        phoneNum: row.cells[3].innerText,
        entrance: row.cells[4].innerText
    }));
    localStorage.setItem('parkedCars', JSON.stringify(parkedCars));
}

// Event listener for the parking button
document.getElementById('btn').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const plate = document.getElementById('pl-num').value;
    const color = document.getElementById('carC').value;
    const phoneNum = document.getElementById('telNum').value;
    const entrance = new Date().toLocaleString(); // Get current date and time

    const car = { name, plate, color, phoneNum, entrance };
    const tableBody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    addRowToTable(car, tableBody);
    updateLocalStorage(); // Update LocalStorage with the new car data

    // Clear input fields after parking
    document.getElementById('parking-form').reset();
});

// Call loadParkedCars on page load
window.onload = loadParkedCars;