# 🔍 LOFO: Secure Proof-Based Asset Retrieval

<div align="center">
  <img src="https://img.shields.io/badge/REACT-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/NODE.JS-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MYSQL-00000F?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/TAILWIND_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
</div>

<br />

> **"Lost It? Found It. Prove It."**
> LOFO is a state-of-the-art, full-stack asset recovery engine designed with a **"Glass Brutalist"** aesthetic and a focus on high-fidelity security. Unlike standard lost-and-found boards, LOFO mandates cryptographic proof of ownership for every claim, ensuring system integrity and zero-fraud retrieval.

---

## 🚀 Key Features

| Feature | Description |
| :--- | :--- |
| **🛡️ Verification Vault** | Users must upload visual or documentary evidence (receipts, serial numbers) to initiate a claim. |
| **🕹️ Mission Control** | A high-octane admin dashboard for real-time adjudication of claims and system auditing. |
| **📡 Discovery Feed** | Dynamic, bento-grid based explorer for identifying reported lost and found assets. |
| **🔐 Atomic Resolution** | Proprietary logic that automatically resolves competing claims once ownership is verified. |
| **📊 System Analytics** | Real-time monitoring of recovery rates, queue depths, and operational uptime. |

---

## 🎨 Design Philosophy: Glass Brutalism

The application utilizes a unique **Glass Brutalist** design system:
- **Neo-Brutalist Layouts**: Heavy borders, high contrast, and raw structural elements.
- **Glassmorphism**: Backdrop blurs and translucent surfaces for a modern, premium feel.
- **Tactile Feedback**: Hard shadows and reactive micro-interactions that feel "mechanical."

---

## 🛠️ Architecture

### **The Stack**
- **Frontend**: `React 18` + `Vite` + `Tailwind CSS` + `Framer Motion`
- **Backend**: `Node.js` + `Express` + `JWT`
- **Database**: `MySQL` with advanced triggers for state management.
- **State**: `Zustand` for lightning-fast global state synchronization.

### **Directory Structure**
```text
lofofinal/
├── lofo-app/           # Frontend: Mission Control UI
├── server/             # Backend: REST API & Security Logic
└── database/           # Relational Schema & Recovery Scripts
```

---

## ⚙️ Rapid Deployment

### **1. Core Initialization**
```bash
git clone <repo-url>
cd lofofinal
```

### **2. Database Engine**
1. Create a MySQL database named `lost_found_db`.
2. Import the recovery script: `database/lost_founddb.sql`.

### **3. Backend Services**
```bash
cd server
npm install
# Create .env with DB_HOST, DB_USER, DB_PASSWORD, JWT_SECRET
npm run dev
```

### **4. Frontend Command Center**
```bash
cd lofo-app
npm install
npm run dev
```

---

## 🔐 Security Protocol

1.  **Ingestion**: Asset is reported by a handler.
2.  **Claim Initiation**: Claimant identifies asset and enters the **Verification Vault**.
3.  **Proof Submission**: Evidence is uploaded and encrypted.
4.  **Adjudication**: Admin reviews the "Visual DNA" and documentation.
5.  **Finalization**: Approval triggers an atomic lock, preventing further claims.

---

---

## 👥 The Engineering Team

*   **Gagandeep Singh**
*   **Sandeep Yadav**
*   **Prabhgun Kaur** 

---

## 📜 License
Distributed under the **MIT License**. See `LICENSE` for more information.

<div align="center">
  <sub>Built with precision for the streets. © 2024 LOFO SECURE SYSTEMS</sub>
</div>

