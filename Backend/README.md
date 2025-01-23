# User Registration API Documentation

## Register User
Endpoint to register a new user in the system.

### Endpoint
```
POST /users/register
```

### Request Body
| Field       | Type     | Required | Description                    |
|-------------|----------|----------|--------------------------------|
| name        | string   | Yes      | User's full name              |
| email       | string   | Yes      | User's email address          |
| password    | string   | Yes      | User's password (min 6 chars) |
| phoneNumber | string   | Yes      | User's phone number           |

### Response Status Codes
| Status Code | Description                                          |
|-------------|------------------------------------------------------|
| 201         | User successfully created                            |
| 400         | Bad request (invalid input or missing required fields)|
| 409         | Conflict (email already exists)                      |
| 500         | Internal server error                                |

### Example 
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "phoneNumber": "+1234567890"
}
```

### Example Success Response
```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "userId": "12345",
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}
```

### Example Error Response
```json
{
  "status": "error",
  "message": "Email already exists"
}
```
