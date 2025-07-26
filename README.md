# 📦 Inventory Management System (IMS) - Backend

A backend REST API for managing inventory in a small business. Built using **Node.js**, **Express**, and **MongoDB Atlas**, with **JWT authentication** and cookie-based login.

---

## ⚙️ Features

- ✅ User registration and login (JWT, stored in cookies)
- ✅ Add products
- ✅ Update product quantity
- ✅ Get all products with pagination
- ✅ Authentication middleware
- ✅ Environment-based config
- ✅ Python test script (as provided in assignment)
- ✅ OpenAPI (Swagger) documentation at `/api-docs`

---

## ⚙️ Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas
- **Auth**: JWT + Cookies
- **Docs**: Swagger (OpenAPI YAML)
- **Testing**: Postman, Python test script

---

## 📁 Project Structure

```
ims-backend/
├── controllers/         # Logic for auth & product
├── middlewares/         # JWT auth middleware
├── models/              # Mongoose schemas
├── index.js             # Main app with all routes and Server entry point
├── openapi.yaml         # Swagger API documentation
├── .env                 # Environment variables
├── test_api.py          # Python test script (assignment)
├── ims_postman_collection.json  # Postman collection
├── README.md
```

---

## 🛠️ Setup Instructions

### 🔹 Prerequisites

- Node.js v14+
- MongoDB Atlas account
- Python 3.6+ (for testing script)
- `requests` Python module

---

### 🔹 1. Clone the Repo

```bash
git clone https://github.com/ashutosh-3474/Inventory-Management.git
cd ims-backend
```

---

### 🔹 2. Install Dependencies

```bash
npm install
```

---

### 🔹 3. Create `.env` File

```env
PORT=8080
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ims
JWT_SECRET=your_jwt_secret
```

> Replace `<username>` and `<password>` with your MongoDB Atlas credentials.

---

### 🔹 4. Run the Server

```bash
npm run dev     # Development mode using nodemon
# OR
npm start       # Production mode
```

Server will run at: `http://localhost:8080`

---

## 🔐 API Endpoints

> All product routes require login (auth cookie).

### 🔹 Auth

- `POST /register`  — Create user
- `POST /login`     — Login and set JWT cookie
- `POST /logout`    — Clear the auth cookie

### 🔹 Products (Require Auth)

- `POST /products`              — Add a new product
- `PUT /products/:id/quantity`  — Update product quantity
- `GET /products`               — Get paginated product list

---

## 🧪 Testing

### 🔹 1. Install Python & Requests

```bash
pip install requests
```

### 🔹 2. Run Test Script

Make sure your server is running at `http://localhost:8080`

```bash
python test_api.py
```

---

## 📤 Postman Collection

Import the included file `ims_postman_collection.json` into Postman to test all endpoints.

---

## 📘 API Documentation (Swagger UI)

Swagger docs available at:
```
http://localhost:8080/api-docs
```

The documentation is based on the `openapi.yaml` file.

---

## 🧹 Notes

- JWT is stored in cookies (`HttpOnly`, `Secure`)
- Auth required for all `/products/*` routes
- Token can also be passed via `Authorization: Bearer <token>` (optional)
- AI tools is used to generate the syntax of the codes

---

## 👨‍💻 Author

Ashutosh Mishra  
📧 [ashutosh.2201062cs@iiitbh.ac.in](mailto:ashutosh.2201062cs@iiitbh.ac.in)
