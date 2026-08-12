# SevaConnect 🌿
### Website & Digital Presence Platform for NGOs
**TYIT Semester 5 — Computer Engineering Project (CEP) | 2026–27**

---

## 📋 Project Overview

SevaConnect is a full-stack MERN web platform that gives NGOs a strong digital presence. It includes:

- **Public Site** — Home, About, Projects, Gallery, Volunteer Registration, Contact
- **Admin Panel** — Protected dashboard with full CRUD for projects, gallery, volunteers, and contacts
- **RESTful API** — Express.js backend with JWT auth, MongoDB (Mongoose), and Helmet security

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite + Tailwind CSS v4 |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose ODM |
| Auth | JWT + bcryptjs |
| Icons | Lucide React |
| Notifications | react-hot-toast |
| SEO | react-helmet-async |
| HTTP Client | Axios |

---

## 📁 Project Structure

```
sevaconnect/
├── client/                    # React frontend (Vite)
│   ├── src/
│   │   ├── components/        # Navbar, Footer, ProjectCard, Lightbox, etc.
│   │   ├── pages/             # Home, About, Projects, Gallery, Volunteer, Contact, Donate
│   │   ├── admin/             # AdminLogin, AdminLayout, Dashboard, ManageX pages
│   │   ├── context/           # AuthContext (admin JWT state)
│   │   ├── api/               # Axios instance + per-resource API functions
│   │   ├── App.jsx            # Root router
│   │   └── main.jsx           # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── .env                   # VITE_API_BASE_URL
│
├── server/                    # Express backend
│   ├── config/db.js           # MongoDB connection
│   ├── models/                # Project, Volunteer, Contact, Admin, GalleryItem
│   ├── controllers/           # Business logic per resource
│   ├── routes/                # Express routers
│   ├── middleware/            # authMiddleware, errorMiddleware
│   ├── seed/seedAdmin.js      # Seeds default admin user
│   ├── server.js              # Express app entry point
│   └── .env                   # MongoDB URI, JWT secret, etc.
│
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js ≥ 18
- MongoDB (local or Atlas URI)

### 1. Clone & Install

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Configure Environment Variables

**Server** (`server/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sevaconnect
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
```

**Client** (`client/.env`):
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Seed the Admin User

```bash
cd server
node seed/seedAdmin.js
```

This creates:
| Field | Value |
|---|---|
| Username | `admin` |
| Password | `Admin@123` |
| Email | `admin@sevaconnect.org` |

> ⚠️ **Change the password after first login!**

### 4. Run the Application

Open **two terminals**:

```bash
# Terminal 1 — Start backend
cd server
npm run dev     # uses nodemon, runs on http://localhost:5000
```

```bash
# Terminal 2 — Start frontend
cd client
npm run dev     # Vite dev server on http://localhost:5173
```

### 5. Access the App

| URL | Description |
|---|---|
| http://localhost:5173 | Public site |
| http://localhost:5173/admin/login | Admin login |
| http://localhost:5000/api/health | API health check |

---

## 🔐 Admin Panel Features

- **Dashboard** — Counts for projects, volunteers, contacts, gallery images; alert badges
- **Projects CRUD** — Create/edit/delete projects; mark as ongoing/completed; feature on homepage
- **Gallery** — Add images by URL, organize into albums, delete
- **Volunteers** — View registrations; update status (new → contacted → active); delete
- **Contacts** — View inquiries; mark as read/responded; reply via email; delete

---

## 🌐 API Endpoints

### Public
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/projects` | All projects (filter: `?category=&status=&featured=`) |
| GET | `/api/projects/:id` | Single project |
| POST | `/api/volunteers` | Submit volunteer registration |
| POST | `/api/contacts` | Submit contact inquiry |
| GET | `/api/gallery` | Gallery images (filter: `?album=`) |
| GET | `/api/gallery/albums` | Distinct album names |
| POST | `/api/auth/login` | Admin login → JWT |

### Protected (requires `Authorization: Bearer <token>`)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/auth/me` | Current admin profile |
| POST | `/api/projects` | Create project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |
| GET | `/api/volunteers` | All volunteers |
| PUT | `/api/volunteers/:id/status` | Update volunteer status |
| DELETE | `/api/volunteers/:id` | Delete volunteer |
| GET | `/api/contacts` | All contact inquiries |
| PUT | `/api/contacts/:id/status` | Update contact status |
| DELETE | `/api/contacts/:id` | Delete contact |
| POST | `/api/gallery` | Add gallery item |
| PUT | `/api/gallery/:id` | Update gallery item |
| DELETE | `/api/gallery/:id` | Delete gallery item |

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary | `#0D7377` (Deep Teal) |
| Accent | `#F5A623` (Warm Amber) |
| Dark | `#1A1A2E` |
| Background | `#F8FAFB` |
| Body Font | Inter |
| Heading Font | Playfair Display |

---

## 👨‍💻 Team

Built for TYIT CEP (Computer Engineering Project) — Academic Year 2026–27

---

*"Seva" means selfless service in Sanskrit — the guiding spirit of this platform.*
