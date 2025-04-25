# hsprajwal-SUPPLY-CHAIN-MANAGEMENT-FOOD-BEVERAGES

Supply chain management in the food and beverage industry is a critical process that ensures products move efficiently from production to consumers while maintaining quality and safety.

## Prerequisites

- **XAMPP**: Install XAMPP to run Apache and MySQL.
- **Node.js**: Ensure Node.js is installed on your system.

## Steps to Set Up

### 1. Use XAMPP
1. Start **Apache** and **MySQL** in XAMPP.
2. Open your browser and go to `localhost/phpmyadmin`.
3. Import the database file `prajwal.sql`:
   - Create a new database manually or use an existing one.
   - Import the `prajwal.sql` file into the database.

### 2. Run the Application
1. Open a terminal.
2. Navigate to the project directory:
   ```bash
   cd supply_chain_management
   ```
3. Start the server:
   ```bash
   node server.js
   ```

### 3. Access the Application
- Open your browser and go to `http://localhost:3000` (or the port specified in your `server.js` file).

## Notes
- Ensure all files and folders are installed and placed in the correct structure.
- Make sure the database connection details in your project match the database you created.

Enjoy managing your supply chain system!
