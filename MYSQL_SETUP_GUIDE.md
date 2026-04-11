# MySQL Database Setup Guide

## Overview
MySQL 8.0 is configured in Docker with phpMyAdmin for web-based GUI access and support for desktop MySQL clients.

## 1. Starting MySQL with Docker

### Prerequisites
- Docker installed and running

### Start the Services
```bash
docker-compose up -d
```

### Verify MySQL is Running
```bash
docker-compose ps
```

You should see:
- `mysql` service running on port 3307
- `phpmyadmin` service running on port 8080
- Spring Boot app running on port 8081

---

## 2. Connection Credentials

```
Host: localhost
Port: 3307
Username: root
Password: root
Database: library_db
```

---

## 3. Access Methods

### Option A: phpMyAdmin (Web Browser) ✅ Easiest
1. Open browser: http://localhost:8080
2. Login with:
   - **Username:** root
   - **Password:** root
3. Click "library_db" to view tables and data

**Advantages:** No installation required, works on any device with a browser

---

### Option B: MySQL Workbench (Desktop GUI)

#### Installation
- **Windows:** Download from https://dev.mysql.com/downloads/workbench/
- **Mac:** Download from https://dev.mysql.com/downloads/workbench/
- **Linux:** `sudo apt-get install mysql-workbench`

#### Connection Setup
1. Open MySQL Workbench
2. Click **"New MySQL Connection"** (+)
3. Fill in the form:
   - **Connection Name:** Library DB
   - **Hostname:** 127.0.0.1
   - **Port:** 3307
   - **Username:** root
   - **Password:** root (click "Store in Vault" if desired)
4. Click **"Test Connection"** to verify
5. Click **"OK"**
6. Double-click the connection to open

#### Browse and Manage
- Left panel: Expand "library_db" to see tables (utilisateur, livre, emprunt)
- Right-click table > "Select Rows" to view data
- SQL Editor: Write queries directly

---

### Option C: DBeaver (Free Alternative)

#### Installation
- Download: https://dbeaver.io/download/
- Works on Windows, Mac, and Linux

#### Connection Setup
1. Open DBeaver
2. **Database** → **New Database Connection**
3. Select **MySQL** → **Next**
4. Fill in:
   - **Server Host:** localhost
   - **Port:** 3307
   - **Database:** library_db
   - **Username:** root
   - **Password:** root
   - **Save password locally:** ✓
5. Click **Finish**
6. Connection appears in "Database" panel

#### Browse and Manage
- Expand connection → "Databases" → "library_db"
- Right-click table → "View Data" to see records
- Use "SQL Editor" for custom queries

---

### Option D: Command Line (MySQL Client)

#### Installation
```bash
# Windows (with MySQL)
choco install mysql

# Mac
brew install mysql-client

# Linux
sudo apt-get install mysql-client
```

#### Connect
```bash
mysql -h 127.0.0.1 -P 3307 -u root -proot library_db
```

#### Verify Tables
```sql
SHOW TABLES;
DESCRIBE utilisateur;
DESCRIBE livre;
DESCRIBE emprunt;
```

---

## 4. Verification Steps

### Via phpMyAdmin (Recommended for Beginners)
1. Open http://localhost:8080
2. Login with root/root
3. Click **library_db** in left sidebar
4. You should see 3 tables:
   - `utilisateur` (users)
   - `livre` (books)
   - `emprunt` (borrowings)

### Via MySQL Workbench
1. Open connection "Library DB"
2. In lower panel, run:
```sql
USE library_db;
SHOW TABLES;
SELECT COUNT(*) FROM utilisateur;
SELECT COUNT(*) FROM livre;
SELECT COUNT(*) FROM emprunt;
```

### Via Command Line
```bash
mysql -h 127.0.0.1 -P 3307 -u root -proot -e "USE library_db; SHOW TABLES;"
```

---

## 5. Troubleshooting

### MySQL Container Won't Start
```bash
# Check logs
docker-compose logs mysql

# Restart services
docker-compose down
docker-compose up -d
```

### Can't Connect on Port 3307
- **Windows:** Check if port is blocked by firewall
  ```bash
  netstat -ano | findstr :3307
  ```
- **Already in use:** Change port in docker-compose.yml:
  ```yaml
  ports:
    - "3308:3306"  # Use 3308 instead
  ```

### phpMyAdmin Connection Error
- Ensure MySQL is running first: `docker-compose up -d mysql`
- Then start phpMyAdmin: `docker-compose up -d phpmyadmin`
- Wait 10 seconds for containers to initialize

### Connection Timeout from Client
- Verify MySQL service is healthy:
  ```bash
  docker-compose ps
  ```
- Check if localhost resolves correctly (use 127.0.0.1 instead)

---

## 6. Spring Boot Integration

Your app automatically connects via:
- **URL:** jdbc:mysql://mysql:3306/library_db
- **User:** root
- **Password:** root
- **Auto-create tables:** Enabled (JPA Hibernate)

Start the app:
```bash
# Via Docker
docker-compose up -d app

# Or locally
mvn spring-boot:run
```

---

## 7. Common Tasks

### View All Users
**phpMyAdmin:**
1. Select library_db
2. Click "utilisateur" table
3. Click "Browse" tab

**Workbench:**
```sql
SELECT * FROM utilisateur;
```

### Add Sample Data
**phpMyAdmin:**
1. Click "utilisateur" → "Insert"
2. Fill form and Insert

**Workbench:**
```sql
INSERT INTO utilisateur (nom, email, telephone) VALUES ('John Doe', 'john@example.com', '0123456789');
```

### Export Data
**phpMyAdmin:**
Right-click table → Export → CSV/SQL

**Workbench:**
Right-click table → Export Table Data

---

## Recommended Setup

| Usage | Tool | Complexity |
|-------|------|-----------|
| Quick checks | phpMyAdmin | ⭐ Easy |
| Full development | MySQL Workbench | ⭐⭐ Medium |
| Free alternative | DBeaver | ⭐⭐ Medium |
| Scripting | MySQL CLI | ⭐⭐⭐ Advanced |

**Best for Beginners:** Start with **phpMyAdmin** at http://localhost:8080

---

## Next Steps

1. Start Docker services: `docker-compose up -d`
2. Verify in browser: http://localhost:8080 (phpMyAdmin)
3. Or install Workbench/DBeaver for desktop access
4. Import sample data or run app to auto-populate tables
