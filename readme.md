
# 🛠️ SkyTower-BMS Server – REST API & Backend

[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/atlas)
[![Express](https://img.shields.io/badge/Express.js-Backend-blue)](https://expressjs.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Serverless-black)](https://vercel.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635bff)](https://stripe.com/)

---

## 🌟 Overview

**SkyTower-BMS Server** is the backend REST API for the SkyTower Building Management System. It handles all server-side logic: authentication, users, apartments, agreements, announcements, payments, and coupons.

- Built with **Node.js** + **Express**
- Database: **MongoDB Atlas**
- Authentication: **JWT**
- Payments: **Stripe**
- Fully deployable on **Vercel**

---

## 🔗 Key Links

- **Live Server:** https://skytower-server.vercel.app/ 
- **Frontend Repository:** https://github.com/shahrukkabir/skytower-bms/  

---

## ✨ Features

- **User Management** – Create, read, update role (admin/member/user), delete  
- **JWT Authentication** – Protects APIs & validates user sessions  
- **Apartments API** – Fetch apartments, pagination & total count  
- **Agreements API** – User requests + Admin approval/rejection  
- **Coupons API** – Create, update, delete coupons  
- **Announcements** – Admin-controlled building announcements  
- **Payments API** – Stripe payment intent + store payments  
- **Contact Messages** – User-to-admin messaging  
- **CORS Enabled** – Client–server communication  
- **Environment Configured** – All secrets stored securely via `.env`

---

## 🛠️ Tech Stack

- **Node.js**  
- **Express.js**  
- **MongoDB Atlas**  
- **JWT Authorization**  
- **Stripe Payment Gateway**  
- **dotenv**  
- **CORS**

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm (v8+)
- MongoDB Atlas account
- Stripe account

---

### Installation

1. Clone repository:
```bash
git clone https://github.com/shahrukkabir/skytower-bms-server.git
cd skytower-bms-server
```

2. Install dependencies:
```bash
npm install
```

3. Add `.env` file:
```env
DB_USER=yourUser
DB_PASS=yourPassword
ACCESS_TOKEN_SECRET=yourJWTSecret
STRIPE_KEY=yourStripeKey
PORT=5000
```

4. Start server:
```bash
node index.js
```

Server runs at:  
➡️ http://localhost:5000

---

## 📂 Project Structure

```
skytower-bms-server/
├── index.js         # Main Express server + APIs
├── package.json     # Dependencies
├── .env             # Environment variables (ignored in Git)
├── .gitignore
└── vercel.json      # Deployment config (optional)
```

---

## 🗄️ API Endpoints (Important)

### Users
- GET /users  
- POST /users  
- PATCH /users/:id  
- PATCH /usermanage/:email  
- DELETE /users/:id  

### Apartments
- GET /appartmants  
- GET /appartmantsPasition  
- GET /appartmentlength  

### Agreements
- GET /agreements  
- POST /agreements  
- PATCH /agreements/:id  
- DELETE /agreements/:id  

### Coupons
- GET /coupons  
- POST /coupons  
- PUT /coupons/:id  
- DELETE /coupons/:id  

### Announcements
- GET /announcements  
- POST /announcements  
- DELETE /announcements/:id  

### Contact Messages
- GET /contact_message  
- POST /contact_message  
- DELETE /contact_message/:id  

### Payments (Stripe)
- POST /createPaymentIntent  
- GET /payments  
- POST /payments  

---

## 🌐 Deployment

- Deploy on **Vercel** or any Node hosting service.
- Make sure to configure environment variables in deployment panel.

---

## 📬 Contact

[![Email](https://img.shields.io/badge/Email-Contact-ea4335?style=for-the-badge&logo=gmail)](mailto:shahrukkabir01@gmail.com)


---
