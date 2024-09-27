### API Documentation - User Management API

---

## Purpose of the API

This API is designed to handle basic user management operations for any application. It provides endpoints to register new users, log them in, and allow them to view their profile. It ensures that passwords are securely stored, users' data is protected, and only authenticated users can access their profile.

---

## Features

1. **User Registration**: Register a new user by providing a username, email, and password.
2. **User Login**: Log in an existing user and generate a JSON Web Token (JWT) for session management.
3. **User Profile**: Allow authenticated users to view their profile details.
4. **User Profile Edit**: Allow authenticated users to edit their profile details.
5. **User Profile Delete**: Allow authenticated users to Delete their profile.

---

## Internal Working

1. **User Registration**:

   - Accepts `username`, `email`, and `password` from the user.
   - Checks if the email already exists in the database.
   - If unique, it hashes the password using `bcrypt` and saves the user details in the database.
   - Returns a success message and user ID.

2. **User Login**:

   - Accepts `email` and `password` for login.
   - Verifies if the user exists and if the provided password matches the hashed password in the database.
   - If authentication is successful, it generates a JWT and returns it in the response.

3. **User Profile**:

   - Protected route that requires a valid JWT.
   - Allows authenticated users to access their own profile information.

4. **User Profile Edit**:

   - Protected route that requires a valid JWT.
   - Allows authenticated users to edit their own profile information.

5. **User Profile Delete**:
   - Protected route that requires a valid JWT.
   - Allows authenticated users to delete their own profile.

---

## Packages Used

- **express**: Web framework for building the API endpoints.
- **mongoose**: MongoDB ODM (Object Data Modeling) library for database management.
- **bcrypt**: Library for hashing passwords securely.
- **jsonwebtoken**: Used to generate and verify JWTs for user authentication.
- **dotenv**: Manages environment variables from a `.env` file.
- **nodemon**: Development tool that automatically restarts the server on code changes.

---

## How to Run

### Prerequisites

- **Node.js** and **npm** installed.
- **MongoDB** running locally or remotely.

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/IAmKushagraSharma/user-management-express-api.git
   cd user-management-api
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up the environment variables**:
   Create a `.env` file in the root directory of your project and add the following variables:

   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the server**:
   To run the server, use the following command:

   ```bash
   npm run dev
   ```

   This will start the server with **nodemon** in development mode. The server will auto-reload when any changes are made.

5. **API Endpoints**:

   - **User Registration**:

     - `POST /api/users/register`
     - Request body:

       ```json
       {
         "username": "your_username",
         "email": "your_email@example.com",
         "password": "your_password"
       }
       ```

   - **User Login**:

     - `POST /api/users/login`
     - Request body:

       ```json
       {
         "email": "your_email@example.com",
         "password": "your_password"
       }
       ```

   - **User Profile**:
     - `GET /api/users/profile`
     - Authorization: Bearer token (JWT)

> You can look at more details at `https://localhost:3000` when you run it locally.

---

## File Structure

```plaintext
.
├── app.js                  # Main app initialization
├── config
│   └── db.js               # MongoDB connection configuration
├── controllers
│   └── userController.js    # User registration, login, and profile logic
├── middlewares
│   └── authMiddleware.js   # JWT authentication middleware
├── models
│   └── userModel.js        # User schema model
├── routes
│   └── userRoutes.js       # API route definitions
├── public
│   └── index.html          # API documentation page
├── server.js               # Server startup
├── .env                    # Environment variables
├── package.json            # Dependencies and scripts
└── README.md               # API documentation
```

---

## Environment Variables

The API uses two main environment variables:

- **MONGO_URI**: The connection string for MongoDB.
- **JWT_SECRET**: A secret key used for signing JWTs.

These variables should be stored in a `.env` file in the root directory.

---

## How Passwords Are Secured

- The API uses `bcrypt` to hash user passwords before storing them in the database.
- When logging in, the provided password is compared with the hashed password stored in the database to ensure security.

---

## How JWT Works

- **JWT** (JSON Web Token) is used to manage user sessions.
- When a user logs in, the API generates a JWT that contains the user's ID. This token is returned to the client.
- For accessing protected routes (like the profile page), the client must send this token in the `Authorization` header (Bearer token).

---

## Conclusion

This API provides a secure and efficient way to manage user authentication and profiles. It's built with simplicity and security in mind, making it suitable for most web applications.
