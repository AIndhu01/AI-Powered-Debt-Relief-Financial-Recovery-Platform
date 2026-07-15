# 🤖 AI Debt Settlement System

An AI-powered Full Stack Web Application that helps financial institutions and users analyze loan details, predict debt risk, and generate intelligent debt settlement recommendations using Machine Learning and Google Gemini AI.

---

## 📌 Project Overview

The AI Debt Settlement System is designed to simplify debt management by providing an intelligent platform for loan analysis and settlement planning.

The application enables users to:

- Register and Login securely using JWT Authentication
- Manage loan records
- Predict debt risk using Machine Learning
- Generate AI-powered settlement recommendations using Google Gemini AI
- View financial analytics on an interactive dashboard
- Download AI-generated settlement reports as PDF documents

---

## 🚀 Features

### 👤 User Authentication

- User Registration
- Secure Login
- JWT Authentication
- Password Hashing (bcrypt)
- Protected Routes

---

### 💳 Loan Management

- Add Loan
- View Loan History
- Search Loans
- Edit Loan
- Delete Loan

---

### 📊 Dashboard

- Total Loans
- Total Debt
- Monthly Income
- Monthly EMI
- Financial Health Score
- Interactive Charts

---

### 🤖 AI Features

- ML-Based Risk Prediction
- Google Gemini AI Settlement Recommendation
- Negotiation Strategy Generation
- Financial Health Analysis
- Debt Stress Analysis

---

### 📄 Report Generation

- AI Settlement Report
- Download PDF Report

---

### 🎨 Frontend

- Responsive UI
- Sidebar Navigation
- Toast Notifications
- Dashboard Charts
- Profile Page

---

## 🛠 Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router
- React Toastify
- jsPDF
- Chart.js

---

### Backend

- FastAPI
- SQLAlchemy
- SQLite
- JWT Authentication
- Passlib (bcrypt)

---

### Artificial Intelligence

- Machine Learning
- Google Gemini API

---

## 📂 Project Structure

```
AI-Debt-Settlement-System/
│
├── backend/
│   ├── main.py
│   ├── auth.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── ai_model.py
│   ├── gemini_ai.py
│   ├── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── screenshots/
│
├── demo-video/
│
├── README.md
├── LICENSE

```

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs on:

```
http://127.0.0.1:8000
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔑 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /register | Register User |
| POST | /login | Login User |
| POST | /predict | Predict Loan Risk |
| POST | /settlement/{loan_id} | Generate AI Settlement |
| GET | /dashboard | Dashboard Statistics |
| GET | /profile | User Profile |
| GET | /loans | Loan History |
| GET | /loan/{id} | Single Loan |
| PUT | /loan/{id} | Update Loan |
| DELETE | /loan/{id} | Delete Loan |

---

## 🔮 Future Enhancements

- Email Notifications
- Loan Approval Prediction
- Admin Dashboard
- Multi-language Support
- Cloud Deployment
- Credit Score Integration
- AI Chat Assistant

---

## 👨‍💻 Author

**A INDHU**

---

## 📜 License

This project is licensed under the MIT License.

---

⭐ If you found this project useful, please consider giving it a star.# AI-Powered-Debt-Relief-Financial-Recovery-Platform
