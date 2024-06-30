## Reservation System README

### Overview
This application is a reservation system designed to manage reservations and users. It allows users to create new reservations, check availability, and manage user accounts.

### Features
- **Create Reservation**: Allows users to create new reservations for specific table numbers at designated times.
- **Check Availability**: Ensures that tables are available for booking at specified times.
- **List Reservations**: Provides a paginated list of reservations within a specified date range.
- **User Management**: Allows users to create new accounts and prevents duplicate registrations.

### Technologies Used
- **Node.js**: Backend server environment.
- **Express.js**: Web application framework for Node.js.
- **MySQL**: Database management system used for storing reservations and user data.
- **TypeScript**: Programming language for type-safe development.
- **Joi**: Schema validation library for validating request data.

### Installation
To run the application locally, follow these steps:

1. **Clone the repository**:
git clone <repository-url>
cd reservation-system


2. **Install dependencies**:
npm install


3. **Set Environment Variables**:
Create a `.env` file in the root directory of the project and add the following variables:

PORT
MYSQL_HOST
MYSQL_USER
MYSQL_PASSWORD
MYSQL_DATABASE
ENVIRONMENT

4. **Database Configuration**:
- Set up a MySQL database and configure connection details in `config/database.ts`.

5. **Run the Application**:
npm start

The server will start running at `http://localhost:{PORT}`.

### API Endpoints

#### Create Reservation
- **POST /reservations**
- Creates a new reservation.
- Requires `userEmail`, `tableNumber`, and `reservationTime` in the request body.
- Validates if the user exists and if the table is available for booking.

#### List Reservations
- **GET /reservations**
- Retrieves a list of reservations within a specified date range.
- Requires `reservationDateStart`, `reservationDateEnd`, `currentPage`, and `itemsPerPage` as query parameters.

#### Create User
- **POST /user**
- Creates a new user account.
- Requires `userName` and `usreEmail` in the request body.
- Checks if the user already exists before creating a new account.

### Error Handling
- Errors are handled gracefully and returned with appropriate HTTP status codes.
- Validation errors are handled using Joi for request data validation.
- Custom error messages provide clear feedback to users and developers.


### Contributors
- Giuseppe Visco


