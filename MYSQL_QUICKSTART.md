# ⚡ MySQL Quick Start

## 🚀 Start Everything
```bash
docker-compose up -d
```

## 🌐 Access Database

### **phpMyAdmin (Browser)** ✅ EASIEST
- **URL:** http://localhost:8080
- **User:** root
- **Pass:** root

### **MySQL Workbench** (Desktop)
- **Host:** localhost (or 127.0.0.1)
- **Port:** 3307
- **User:** root
- **Pass:** root
- **DB:** library_db

### **DBeaver** (Free Alternative)
- Same settings as Workbench above

### **Command Line**
```bash
mysql -h 127.0.0.1 -P 3307 -u root -proot library_db
```

## ✅ Verify Connection

**In phpMyAdmin:**
1. Open http://localhost:8080
2. Login
3. Click "library_db" → should see tables

**In Workbench:**
```sql
SHOW TABLES;
```

## 📋 View Tables
```sql
USE library_db;
SHOW TABLES;           -- Lists: utilisateur, livre, emprunt
SELECT * FROM utilisateur;
SELECT * FROM livre;
SELECT * FROM emprunt;
```

## 🔌 Connection Credentials
```
Host:     localhost
Port:     3307
User:     root
Password: root
Database: library_db
```

## 🐳 Docker Management
```bash
docker-compose ps              # Check status
docker-compose logs mysql      # View MySQL logs
docker-compose restart mysql   # Restart MySQL
docker-compose down            # Stop all services
```

## 📞 Spring Boot Connection
Auto-configured via `application.properties`:
```
URL: jdbc:mysql://mysql:3306/library_db
User: root
Pass: root
```

---
**See `MYSQL_SETUP_GUIDE.md` for full documentation**
