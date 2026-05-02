# Wave Mind Talent Hub 🚀

A production-ready AI-powered SaaS application for managing Internship and Full-Time hiring.

## Tech Stack
- **Frontend**: React (Vite) + Tailwind CSS + Lucide Icons + Chart.js
- **Backend**: Node.js + Express + Mongoose
- **Database**: MongoDB
- **File Storage**: Firebase Storage
- **Auth**: JWT (JSON Web Tokens)
- **Email**: Nodemailer

## Core Features
1. **Public Career Portal**: Beautiful job listings with filtering and application tracking.
2. **Social Source Tracking**: Capture application source (?source=linkedin, etc.)
3. **Admin Dashboard**: Real-time stats and hiring funnel analytics.
4. **ATS Pipeline**: Track candidates from 'Applied' to 'Joined' or 'Rejected'.
5. **Interview Management**: Schedule interviews and notify candidates.
6. **AI Offer Letter**: Generate dynamic, professional offer letters.
7. **WhatsApp Integration**: Single-click WhatsApp communication.
8. **Role-based Access**: Admin, HR, and Interviewer roles.

## Getting Started

### Backend Setup
1. `cd backend`
2. `npm install`
3. Create a `.env` file based on the provided template.
4. Run `node seed.js` to initialize the database with an admin user and sample jobs.
5. `npm start` or `node index.js`

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev`

### Default Credentials
- **Email**: `admin@wavemind.com`
- **Password**: `password123`

## Environment Variables (.env)
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY=...
```
