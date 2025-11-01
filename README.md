# Express + Sequelize + TypeScript API

docker compose up -d mysql-users mysql-posts rabbitmq

docker compose stop mysql-users mysql-posts rabbitmq

docker compose restart mysql-users mysql-posts rabbitmq redis

-- development

docker compose -f docker-compose.dev.yml up -d
docker compose -f docker-compose.dev.yml down


# start eveything 
docker compose up -d

# View logs (specific service)
docker compose logs -f rabbitmq
docker compose logs -f mysql-users
docker compose logs -f mysql-posts


A production-ready REST API built with Express.js, Sequelize ORM, TypeScript, and MySQL using Docker.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Database Setup](#database-setup)
- [Available Scripts](#available-scripts)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

- ✅ TypeScript for type safety
- ✅ Sequelize ORM for database management
- ✅ MySQL database with Docker
- ✅ RESTful API architecture
- ✅ Environment-based configuration
- ✅ Database migrations & seeders
- ✅ Error handling middleware
- ✅ Input validation
- ✅ Hot reload in development

---

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Docker Desktop** - [Download](https://www.docker.com/products/docker-desktop/)
- **Git** - [Download](https://git-scm.com/)
- **VS Code** (recommended) - [Download](https://code.visualstudio.com/)

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd squlize-express
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` with your preferred settings (default values work out of the box):

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=express_ts_api
DB_USER=root
DB_PASS=example

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 4. Start Docker Desktop

1. Open **Docker Desktop** from your Start Menu
2. Wait for Docker to fully start (whale icon in system tray should be steady)
3. Verify Docker is running:

```bash
docker --version
```

### 5. Start MySQL Database

```bash
docker-compose up -d
```

**First time?** This will download MySQL image (~200MB). Takes 2-5 minutes.

Verify MySQL is running:

```bash
docker ps
```

You should see `squlize-express-mysql` in the list.

### 6. Run Database Migrations

```bash
npm run migrate
```

This creates all database tables.

### 7. (Optional) Add Sample Data

```bash
npm run seed
```

SHOW DATABASES;
USE express_ts_api;
SHOW TABLES;
SELECT * FROM users;


This adds demo users and test data.

### 8. Start Development Server

```bash
npm run dev
```

**🎉 Done!** Your API is running at `http://localhost:3000`

---

## 📁 Project Structure

```
squlize-express/
├── src/
│   ├── config/
│   │   ├── database.ts          # TypeScript DB config
│   │   └── sequelize-config.js  # Sequelize CLI config
│   ├── models/
│   │   ├── index.ts             # Models barrel file
│   │   └── user.model.ts        # User model
│   ├── migrations/
│   │   └── XXXXXX-create-user.js
│   ├── seeders/
│   │   └── XXXXXX-demo-users.js
│   ├── controllers/
│   │   └── user.controller.ts
│   ├── services/
│   │   └── user.service.ts
│   ├── routes/
│   │   └── user.routes.ts
│   ├── middleware/
│   │   ├── error.middleware.ts
│   │   └── asyncHandler.ts
│   ├── validators/
│   │   └── user.validator.ts
│   ├── utils/
│   │   └── logger.ts
│   ├── app.ts                   # Express app setup
│   ├── server.ts                # Server entry point
│   └── index.ts                 # Main entry
├── .env                         # Environment variables (not in Git)
├── .env.example                 # Environment template
├── .sequelizerc                 # Sequelize CLI config
├── docker-compose.yml           # Docker services
├── tsconfig.json                # TypeScript config
├── package.json
└── README.md
```

---

## 🗄️ Database Setup

### MySQL with Docker

This project uses Docker to run MySQL locally. Your data persists between restarts.

#### Start Database
```bash
docker-compose up -d
```

#### Stop Database
```bash
docker-compose down
```
**Note:** This keeps your data. To delete data, use `docker-compose down -v`

#### View Database Logs
```bash
docker logs squlize-express-mysql
```

#### Connect to MySQL Shell
```bash
docker exec -it squlize-express-mysql mysql -u root -pexample
```

Inside MySQL:
```sql
USE express_ts_api;
SHOW TABLES;
SELECT * FROM Users;
exit
```

### Migrations

Migrations manage your database schema changes.

#### Create a New Migration
```bash
npx sequelize-cli migration:generate --name create-posts
```

#### Run Migrations
```bash
npm run migrate
```

#### Undo Last Migration
```bash
npm run migrate:undo
```

#### Undo All Migrations
```bash
npm run migrate:undo:all
```

### Seeders

Seeders add sample/test data to your database.

#### Create a New Seeder
```bash
npx sequelize-cli seed:generate --name demo-posts
```

#### Run All Seeders
```bash
npm run seed
```

#### Undo All Seeders
```bash
npm run seed:undo:all
```

#### Fresh Database (Reset Everything)
```bash
npm run db:reset
```
This undoes all migrations, runs them again, and seeds data.

---

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload
npm run build            # Build for production
npm start                # Start production server

# Database
npm run migrate          # Run all pending migrations
npm run migrate:undo     # Undo last migration
npm run migrate:undo:all # Undo all migrations
npm run seed             # Run all seeders
npm run seed:undo:all    # Undo all seeders
npm run db:reset         # Fresh database (undo → migrate → seed)

# Docker
docker-compose up -d     # Start MySQL
docker-compose down      # Stop MySQL (keeps data)
docker-compose down -v   # Stop MySQL and DELETE data
docker-compose restart   # Restart MySQL
docker-compose logs -f   # Follow logs

# Database Backup
npm run db:backup        # Backup database to SQL file
npm run db:restore       # Restore from backup
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-25T14:30:00.000Z"
}
```

#### Users

##### Get All Users
```http
GET /api/users
```

##### Get User by ID
```http
GET /api/users/:id
```

##### Create User
```http
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

##### Update User
```http
PUT /api/users/:id
Content-Type: application/json

{
  "name": "John Updated"
}
```

##### Delete User
```http
DELETE /api/users/:id
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost              # Database host
DB_PORT=3306                   # Database port
DB_NAME=express_ts_api         # Database name
DB_USER=root                   # Database user
DB_PASS=example                # Database password

# Server Configuration
PORT=3000                      # Server port
NODE_ENV=development           # Environment (development/production)

# JWT (if using authentication)
JWT_SECRET=your-secret-key     # JWT secret key
JWT_EXPIRES_IN=7d              # Token expiration

# Other
LOG_LEVEL=debug                # Logging level
```

**⚠️ Important:** Never commit `.env` to Git. Use `.env.example` as a template.

---

## 🐛 Troubleshooting

### Docker Issues

#### "Cannot connect to Docker daemon"
**Solution:** Start Docker Desktop and wait for it to fully load.

```bash
# Check if Docker is running
docker --version
docker ps
```

#### "Port 3306 already in use"
**Solution:** Another MySQL is running. Either stop it or change port.

```bash
# Option 1: Stop local MySQL
net stop MySQL80

# Option 2: Change port in docker-compose.yml
ports:
  - "3307:3306"  # Use 3307 instead

# Then update .env
DB_PORT=3307
```

#### "MySQL keeps restarting"
**Solution:** Check logs and verify credentials.

```bash
docker logs squlize-express-mysql

# If needed, reset everything
docker-compose down -v
docker-compose up -d
```

### Database Connection Issues

#### "ECONNREFUSED 127.0.0.1:3306"
**Cause:** MySQL container is not running.

**Solution:**
```bash
# Start MySQL
docker-compose up -d

# Verify it's running
docker ps

# Check if healthy
docker inspect squlize-express-mysql | grep Status
```

#### "Access denied for user"
**Cause:** Wrong credentials in `.env`

**Solution:** Check your `.env` matches `docker-compose.yml`:
- Username: `root`
- Password: `example`
- Database: `express_ts_api`

### Migration Issues

#### "Table already exists"
**Solution:** Either drop the table manually or undo migrations:

```bash
npm run migrate:undo
npm run migrate
```

#### "SequelizeMeta table doesn't exist"
**Solution:** Run migrations to create it:

```bash
npm run migrate
```

### Development Issues

#### "Module not found"
**Solution:** Reinstall dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript errors
**Solution:** Check `tsconfig.json` and rebuild:

```bash
npm run build
```

#### Port already in use
**Solution:** Kill the process or change port:

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change PORT in .env
PORT=3001
```

---

## 🤝 Working as a Team

### Setup for New Developers

New team members should:

1. Clone the repository
2. Run `npm install`
3. Copy `.env.example` to `.env`
4. Start Docker: `docker-compose up -d`
5. Run migrations: `npm run migrate`
6. Run seeders: `npm run seed`
7. Start dev server: `npm run dev`

### Sharing Data Between Developers

**Database structure** (tables, columns) is shared via **migrations** (committed to Git).

**Actual data** (rows) is NOT shared automatically. Options:

#### Option 1: Seeders (Recommended)
Use seeders for sample/test data that everyone needs.

```bash
# Everyone runs this after migrations
npm run seed
```

#### Option 2: SQL Dump
Share a database backup for one-time data transfer.

```bash
# Create backup
docker exec squlize-express-mysql mysqldump -u root -pexample express_ts_api > backup.sql

# Share backup.sql via Git or file sharing

# Import backup
docker exec -i squlize-express-mysql mysql -u root -pexample express_ts_api < backup.sql
```

---

## 📚 Additional Resources

- [Sequelize Documentation](https://sequelize.org/docs/v6/)
- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 💬 Support

If you have any questions or run into issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Search existing issues on GitHub
3. Create a new issue with details about your problem

---

**Happy Coding! 🚀**"# express-sequelize-ts-setup" 
#   e x p r e s s - s e q u e l i z e - m i c r o s e r v i c e - t s - s e t u p 
 
 