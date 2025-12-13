# BD-DESTINATION Server

**BD-DESTINATION** - BD-DESTINATION is a full-featured backend API for a tourism-based blogging platform that provides detailed information about beautiful and tourist places in Bangladesh. The platform supports role-based content management, secure authentication, post moderation, and review workflows using modern backend technologies.

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
  - Admin can Accept or reject or delete the review. If the admin accepts the review, it becomes active and publicly visible.

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

## 🗂️ Entity Relationship Diagram (ERD)

<p align="center">
  <img src="https://res.cloudinary.com/dp6urj3gj/image/upload/v1765627636/bd-destinationERD_pftztz.png" alt="BD-Destination ER Diagram" width="700"/>
</p>

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
cd bd-destination
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
CLOUDINARY_API="23************"
CLOUDINARY_SECRET="RDJ***************hs"

JWT_SECRET='dsgsfljksljlsjljsltyoshe'
EXPIRES_IN=2592000
REFRESH_TOKEN_SECRET='sdgslsgsdhdeeejlsjlsjlssl'
REFRESH_TOKEN_SECRET_EXPIRES_IN=2592000
```

**Required Environment Variables:**

- `PORT` - Server port number (default: 3000)
- `CONNECTION_STR` - PostgreSQL database connection string
- `CLOUDINARY_API` - A public identifier for your Cloudinary account
- `CLOUDINARY_SECRET` - A private secret key
- `JWT_SECRET` - Secret key for JWT token signing
- `EXPIRES_IN` - give a miliseconds value for JWT expire time (default: 2592000)
- `REFRESH_TOKEN_SECRET` - give a miliseconds value for JWT expire time (default: 2592000)
- `REFRESH_TOKEN_SECRET_EXPIRES_IN` - give a miliseconds value for JWT expire time (default: 2592000)

### 4. Database Setup

The application automatically initializes the database tables on startup. Ensure your PostgreSQL database is running and accessible.

**Database Tables:**

- `users` - User accounts with roles (admin, moderator and user)
- `posts` - Blog Posts
- `reviews` - Post Reviews

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

The server will start on `http://localhost:5173` (or your configured PORT).

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

- **Development:** `http://localhost:5173/api/v1`
- **Production:** `https://bd-destination.vercel.app/api/v1`

### API Endpoints

#### Authentication

- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/refresh-token` - Get access-token from refresh token

#### Users

- `GET /api/v1/user` - Get All user profile (Protected)
- `GET /api/v1/user/:id` - Get user own profile (Protected)
- `PATCH /api/v1/user/:id` - Update user (Protected)
- `PATCH /api/v1/user/status/:id` - Update user status (Protected)

#### Post

- `POST /api/v1/post` - Create Post (Admin & Moderator)
- `GET /api/v1/post/active` - Get all active posts
- `GET /api/v1/post` - Get all posts (Admin only)
- `GET /api/v1/post/:id` - Get Post by ID
- `PATCH /api/v1/post/:id` - Update vehicle (Admin & Moderator)
- `DELETE /api/v1/post/:id` - Delete Post (Admin only)

#### Review

- `POST /api/v1/review` - Create Review (Admin, Moderator & User)
- `PATCH /api/v1/review/update-review` - Update Review (Admin, Moderator & User)
- `PATCH /api/v1/review/change-status` - Change Review Status(Admin only)
- `DELETE /api/v1/review/delete-review` - Delete Review(Admin only)

### Authentication

Most endpoints require authentication. Include the JWT token in the request header:

```
Authorization: <your_jwt_token>
```

---

## 📖 API Documentation

For detailed API documentation, request/response examples, and testing, visit:
**[Postman Documentation](https://documenter.getpostman.com/view/40157327/2sB3dSRpQL)**

---

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Role-based access control (RBAC)
- Input validation using zod and sanitization

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

For support, please visit the [API Documentation](https://documenter.getpostman.com/view/40157327/2sB3dSRpQL) or contact the development team.
