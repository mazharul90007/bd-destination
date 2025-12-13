# BD-DESTINATION Server

**BD-DESTINATION** - Your complete guide to beautiful places, history, and travel in Bangladesh.

🌐 **Live URL:** [https://bd-destination.vercel.app](https://bd-destination.vercel.app)  
📚 **API Documentation:** [Postman Documentation](https://documenter.getpostman.com/view/40157327/2sB3dSRpQL)

---

## Sample-Credentials

### admin: admin@gmail.com (pass: 123456)

### moderator: moderator@gmail.com (pass: 123456)

### user: user@gmail.com (pass: 123456)

## 🚀 Features

### Authentication & Authorization

- User registration (signup)
- User login (signin) with JWT token generation
- Role-based access control (Admin, Moderator & User)
- Secure password hashing using bcrypt
- JWT-based authentication middleware

### Post Management

- Create Post (Moderator, Admin)
- Get all Posts (Admin only)
- Get all active Posts (Public)
- Get Post by ID (Public-active only, and Admin, Moderator all post)
- Update Post details (Admin( admins can update any post), Moderator (moderator can only update his own post))
- Delete Post (Admin only)
-

### Review Management

- Create a review (Admin, Moderator & Public)
- Delete Reviews (Admin & Moderator):
  - Admin: Can delete any reviews.
  - Moderator & User: Can delete only their own reviews
- Update Reviews (Admin & Moderator):
  - Admin: Can update any reviews.
  - Moderator & User: Can update only their own reviews
- Change Review Status (Admin Only):
  - Admin can Accept or reject or delete the review. if admin accept the the review will be active and published

### User Management

- User profile management
- Role-based permissions
- Get Users details (Admin Only)
- Get User Profile (Admin, Moderator, User):
  - Admin: can get any Users profile data
  - Moderator & User: Moderator and Users can get their own Profile data
- Update User data (Admin, Moderator, User):
  - Admin: Update any Users data
  - Moderator & User: Moderator and Users can update their own Profile

---

## 🛠 Technology Stack

### Backend Framework

- **Node.js** - Runtime environment
- **Express.js** (v5.2.1) - Web framework
- **TypeScript** - Type-safe JavaScript

### Database

- **PostgreSQL** - Relational database
- **prisma** - ORM(Object–Relational Mapping) tool

### Image host

- **Cloudinary** - cloud-based media management service used to upload images

### Authentication, Validation & Security

- **jsonwebtoken** - JWT token generation and verification
- **Zod** - TypeScript-first schema validation library
- **bcrypt** (v6.0.0) - Password hashing

### Development Tools

- **tsx** (v4.21.0) - TypeScript execution
- **dotenv** (v17.2.3) - Environment variable management

### Deployment

- **Vercel** - Serverless deployment platform

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **pnpm** package manager
- **PostgreSQL** database (local or remote)
- **Git**

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd bd-wheel-server
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Or using pnpm:

```bash
pnpm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
PORT=5173
CONNECTION_STR=postgresql://username:password@localhost:5432/database_name
JWT_SECRET=your_jwt_secret_key_here
EXPIRES_IN=2592000
```

**Required Environment Variables:**

- `PORT` - Server port number (default: 3000)
- `CONNECTION_STR` - PostgreSQL database connection string
- `JWT_SECRET` - Secret key for JWT token signing
- `EXPIRES_IN` - give a miliseconds value for JWT expire time (default: 2592000)

### 4. Database Setup

The application automatically initializes the database tables on startup. Ensure your PostgreSQL database is running and accessible.

**Database Tables:**

- `users` - User accounts with roles (admin, customer)
- `vehicles` - Vehicle inventory
- `bookings` - Booking records

### 5. Build the Project

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist` folder.

---

## 🎯 Usage Instructions

### Development Mode

Run the server in development mode with hot-reload:

```bash
npm run dev
```

The server will start on `http://localhost:5000` (or your configured PORT).

### Production Mode

1. Build the project:

```bash
npm run build
```

2. Start the server:

```bash
node dist/server.js
```

### API Base URL

- **Development:** `http://localhost:3000/api/v1`
- **Production:** `https://bd-wheel-server.vercel.app/api/v1`

### API Endpoints

#### Authentication

- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/signin` - User login

#### Users

- `GET /api/v1/users` - Get user profile (Protected)
- `PATCH /api/v1/users/:id` - Update user (Protected)
- `DELETE /api/v1/users/:id` - delete user (protected)

#### Vehicles

- `POST /api/v1/vehicles` - Create vehicle (Admin only)
- `GET /api/v1/vehicles` - Get all vehicles
- `GET /api/v1/vehicles/:id` - Get vehicle by ID
- `PATCH /api/v1/vehicles/:id` - Update vehicle (Admin only)
- `DELETE /api/v1/vehicles/:id` - Delete vehicle (Admin only)

#### Bookings

- `POST /api/v1/bookings` - Create booking (Admin & Customer)
- `GET /api/v1/bookings` - Get bookings (Admin: all, Customer: own)
- `PATCH /api/v1/bookings/:id` - Update bookings status

### Authentication

Most endpoints require authentication. Include the JWT token in the request header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 📖 API Documentation

For detailed API documentation, request/response examples, and testing, visit:
**[Postman Documentation](https://documenter.getpostman.com/view/40157327/2sB3dQuovj)**

---

## 🏗 Project Structure

---

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Role-based access control (RBAC)
- Input validation and sanitization
- SQL injection protection via parameterized queries

---

## 📝 License

ISC

---

## 👤 Author

Mazharul Islam Sourabh

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

## 📞 Support

For support, please visit the [API Documentation](https://documenter.getpostman.com/view/40157327/2sB3dQuovj) or contact the development team.
