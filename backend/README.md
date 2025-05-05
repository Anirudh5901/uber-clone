# User Registration Endpoint

## Endpoint

`POST /users/register`

## Description

This endpoint allows a new user to register by providing their details. Upon successful registration, a new user record will be created in the database.

## Required Data

The request body must contain the following fields in JSON format:

- `fullName`: An object containing:
  - `firstName`: A string representing the user's first name (required, minimum length: 3 characters).
  - `lastName`: A string representing the user's last name (optional, minimum length: 3 characters).
- `email`: A string representing the user's email address (required, must be unique, minimum length: 5 characters).
- `password`: A string representing the user's password (required).

### Example Request Body

{
"fullName": {
"firstName": "John",
"lastName": "Doe"
},
"email": "john.doe@example.com",
"password": "securepassword123"
}

## Status Codes

- `201 Created`: User registration successful.
- `400 Bad Request`: Validation error, such as missing required fields or invalid data.
- `409 Conflict`: Email already exists in the database.
- `500 Internal Server Error`: An unexpected error occurred on the server.

# Example Response

- `user` (object):
- `fullname` (object). - `firstname`(string): User's first name (minimum 3 characters). - `lastname` (string): User's last name (minimum 3 characters).
- `email` (string): User's email address (must be a valid email).
- `password` (string): User's password (minimum 6 characters).
- `token` (String): JWT Token

# User Login Endpoint

## Endpoint

`POST /users/login`

## Description

This endpoint allows an existing user to log in by providing their email and password. Upon successful authentication, a JWT token is returned.

## Required Data

The request body must contain the following fields in JSON format:

- `email`: A string representing the user's email address (required, must be unique, minimum length: 5 characters).
- `password`: A string representing the user's password (required).

### Example Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

## Status Codes

- `200 OK`: User login successful, token and user details returned.
- `400 Bad Request`: Validation error, such as missing required fields or invalid data.
- `401 Unauthorized`: Invalid email or password.
- `500 Internal Server Error`: An unexpected error occurred on the server.

# Example Response

```json
{
  "token": "jwt-token-string",
  "user": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```
