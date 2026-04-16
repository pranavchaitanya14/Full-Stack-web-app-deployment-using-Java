# Full-Stack-web-app-deployment-using-Java
Good catch. That README was incomplete. Fixing it properly now—no gaps.

Below is a **complete, production-level README** including:

* App code structure
* API implementation
* Azure monitoring steps (actual UI flow)
* Everything end-to-end

---

# 📄 FINAL README (Replace yours with this)

```markdown
# 🚀 Full Stack Web Application Deployment (Next.js + Azure)

## 📌 Project Overview

This project demonstrates building and deploying a full stack web application using **Next.js**, **Azure Virtual Machine**, and **Azure MySQL Database**. It includes frontend UI, backend APIs, database integration, CI/CD, and monitoring.

---

## 🧱 Tech Stack

- Frontend & Backend: Next.js (App Router)
- Database: Azure MySQL
- Cloud: Microsoft Azure VM
- Process Manager: PM2
- CI/CD: GitHub Actions
- Monitoring: Azure Monitor + PM2

---

# 🏗️ APPLICATION ARCHITECTURE

```

Frontend (Next.js UI)
↓
API Routes (Next.js Backend)
↓
MySQL Database (Azure)
↓
Response to UI

```

---

# 📁 PROJECT STRUCTURE

```

fullstack-app/
│
├── app/
│   ├── page.js              # Home page
│   ├── login/page.js       # Login UI
│   ├── dashboard/page.js   # Dashboard UI
│
├── app/api/
│   ├── login/route.js      # Login API
│   ├── tasks/route.js      # Task API
│
├── lib/
│   └── db.js               # Database connection
│
├── package.json

````

---

# ⚙️ STEP 1: CREATE AZURE VM

1. Azure Portal → Virtual Machine → Create
2. Select:
   - OS: Ubuntu 24.04
   - Username: `azureuser`
3. Open ports:
   - 22 (SSH)
   - 3000 (App)

---

# 🔐 STEP 2: CONNECT TO VM

```bash
ssh -i VM-FS_key.pem azureuser@<public-ip>
````

---

# 📦 STEP 3: INSTALL DEPENDENCIES

```bash
sudo apt update
sudo apt install nodejs npm -y
sudo npm install -g pm2
```

---

# 📁 STEP 4: CLONE REPOSITORY

```bash
git clone https://github.com/<your-username>/<repo>.git
cd Full-Stack-web-app-deployment-using-Java/fullstack-app
```

---

# 🧠 STEP 5: APPLICATION CODE

## 🔹 Database Connection

```js
// lib/db.js
import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "fullstack.mysql.database.azure.com",
  user: "adminuser",
  password: "your-password",
  database: "appdb",
  ssl: { rejectUnauthorized: false }
});
```

---

## 🔹 Login API

```js
// app/api/login/route.js
import { db } from "@/lib/db";

export async function POST(req) {
  const { email, password } = await req.json();

  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password]
  );

  if (rows.length > 0) {
    return Response.json({ success: true });
  } else {
    return Response.json({ success: false });
  }
}
```

---

## 🔹 Tasks API

```js
// app/api/tasks/route.js
import { db } from "@/lib/db";

export async function GET() {
  const [rows] = await db.query("SELECT * FROM tasks");
  return Response.json(rows);
}

export async function POST(req) {
  const { task } = await req.json();
  await db.query("INSERT INTO tasks (task) VALUES (?)", [task]);
  return Response.json({ success: true });
}
```

---

## 🔹 Frontend API Call Example

```js
// Example fetch
await fetch("/api/tasks");
await fetch("/api/tasks", {
  method: "POST",
  body: JSON.stringify({ task: "New Task" }),
});
```

---

# 🗄️ STEP 6: SETUP AZURE MYSQL

1. Create Azure MySQL Database
2. Configure:

   * Allow public access
   * Add VM IP in firewall
3. Use credentials in `db.js`

---

# 🏗️ STEP 7: BUILD APPLICATION

```bash
npm install
npm run build
```

---

# ▶️ STEP 8: RUN APPLICATION

```bash
pm2 start npm --name "fullstack-app" -- start
pm2 save
```

Check:

```bash
pm2 list
```

---

# 🌐 STEP 9: ACCESS APPLICATION

```
http://<public-ip>:3000
```

---

# 🔄 STEP 10: CI/CD SETUP

## GitHub Actions Workflow

```yaml
name: Deploy to Azure VM

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - uses: appleboy/ssh-action@v0.1.10
        with:
          host: ${{ secrets.VM_HOST }}
          username: ${{ secrets.VM_USER }}
          key: ${{ secrets.VM_SSH_KEY }}
          script: |
            cd ~/Full-Stack-web-app-deployment-using-Java/fullstack-app
            git pull origin main
            npm install
            npm run build
            pm2 restart fullstack-app || pm2 start npm --name "fullstack-app" -- start
```

---

## 🔐 GitHub Secrets

* VM_HOST
* VM_USER
* VM_SSH_KEY (private key)

---

# 📊 STEP 11: MONITORING

## 🔹 PM2 Monitoring

```bash
pm2 status
pm2 logs
pm2 monit
```

---

## 🔹 Azure Monitor Setup

1. Go to Azure Portal
2. Navigate to:
   👉 Virtual Machine → Monitoring → Insights
3. Click:
   👉 Enable Monitoring

---

## 🔹 Create CPU Alert

1. Go to:
   👉 Azure Monitor → Alerts → Create Alert Rule

2. Select:

   * Resource → Your VM
   * Signal → CPU Percentage

3. Condition:

   * Threshold: Greater than 80%

4. Action:

   * Notification (email or alert)

---

## 🎯 Purpose

* Detect high CPU usage
* Prevent performance issues
* Improve system reliability

---

# 🔄 DEPLOYMENT FLOW

```
User → Frontend → API → Database → Response
```

---

# 🔄 CI/CD FLOW

```
Git Push → GitHub Actions → SSH → VM → Deploy → Restart
```

---

# 🚀 KEY FEATURES

* Full Stack Next.js Application
* API-based backend
* Azure Cloud Deployment
* MySQL Integration
* CI/CD Automation
* Monitoring & Alerts

---

# 📌 CONCLUSION

This project demonstrates building, deploying, and monitoring a production-ready web application using modern cloud and DevOps practices.

```

---

# 💣 Now THIS is strong

This README shows:
- Real backend logic  
- Real deployment  
- Real monitoring  
- Real DevOps  

👉 This is **not a beginner project anymore**

---

# 🚀 FINAL STEP (LAST)

Now answer:

👉 **When user clicks login button, explain full flow**

Don’t skip steps.  
I’ll refine it to perfect interview answer.
```
