# CampusConnect 🎓

> A modern, responsive collegiate web application empowering students to discover campus activities, manage event registrations, connect with industry mentors, and explore vibrant student communities.

---

## 🌟 Architecture & Highlights

- **100% Strict TypeScript**: Zero `any` policy with strict type checking enabled across both frontend and backend (`strict: true`, `noImplicitAny: true`, `strictNullChecks: true`).
- **Production MongoDB Authentication**:
  - Secure password hashing via `bcryptjs` with salt rounds.
  - JSON Web Token (JWT) issuance & authorization guards.
  - Mongoose models with validation rules and unique lowercase indexing on email addresses.
  - Rate limiting with `express-rate-limit` & HTTP security headers with `helmet`.
- **Modern Collegiate UI & Design Tokens**:
  - Bento grid layouts, glassmorphic navigation, and tactile card surfaces.
  - Curated typography (*Plus Jakarta Sans* for headers, *Inter* for body).
  - Responsive design across desktop, tablet, and mobile with zero horizontal overflow.
- **Full Coverage of Core Views**:
  1. **Landing Page**: High-impact hero section, live engagement counters, bento feature grid, and campus highlights.
  2. **Events Listing Page**: Instantaneous search, category filter pills, capacity progress indicators, and attendee avatar stacks.
  3. **Event Registration**: Dynamic modal supporting **Individual** and **Team** entries with dynamic member rows and simulated QR code tickets.
  4. **Student Dashboard**: Personalized student welcome banner, engagement metrics, registration schedule, and digital wallet pass viewer.
  5. **Mentor Directory**: Filterable domain directory with verified star ratings, skills pills, and 1-on-1 booking modals.
  6. **Student Groups & Societies**: Category-filtered club directory with member counts, meeting schedules, and interactive join/leave toggles.
  7. **Split-Screen Authentication**: Sign-In and Registration with real-time password strength meter and accessible form controls.

---

## 📁 Repository Structure

```
CampusConnectApp/
├── api/                               # Backend Node.js + Express + TypeScript + MongoDB
│   ├── src/
│   │   ├── config/db.ts               # Mongoose connection management
│   │   ├── controllers/authController.ts # register, login, getMe, updateProfile
│   │   ├── middleware/auth.ts         # JWT bearer verify guard
│   │   ├── middleware/error.ts        # Global error & duplicate key handler
│   │   ├── models/User.ts             # Strongly typed User Mongoose model
│   │   ├── routes/authRoutes.ts       # Express router definitions
│   │   ├── types/                     # Strongly typed interfaces (user, auth, api)
│   │   └── server.ts                  # Express server entry point
│   ├── .env.example
│   ├── .env                           # Config (PORT, MONGO_URI, JWT_SECRET)
│   ├── tsconfig.json                  # Strict TypeScript configuration
│   └── package.json
│
├── web/                               # Frontend React 19 + Vite + TypeScript
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/                # Button, Badge, Modal, AvatarStack
│   │   │   ├── events/                # EventCard, RegistrationModal
│   │   │   ├── groups/                # GroupCard
│   │   │   ├── layout/                # Navbar, Footer
│   │   │   └── mentors/               # MentorCard
│   │   ├── context/AuthContext.tsx    # Typed session & authentication state
│   │   ├── data/                      # Strongly typed mock datasets
│   │   ├── pages/                     # Landing, Auth, Events, Dashboard, Mentors, Groups
│   │   ├── services/api.ts            # Typed Axios instance with JWT interceptor
│   │   ├── styles/index.css           # Master design system & tokens
│   │   ├── types/                     # Strong domain models
│   │   ├── App.tsx                    # View routing & application layout
│   │   └── main.tsx                   # React root entry
│   ├── tsconfig.json
│   ├── tsconfig.app.json              # Strict TypeScript frontend config
│   └── package.json
└── README.md
```

---

## 🚀 Quick Setup Instructions

### 1. Backend (`api`) Setup
```bash
cd api
npm install
npm run typecheck    # Verifies zero TypeScript errors
npm run dev          # Starts Express server on http://localhost:5000
```

### 2. Frontend (`web`) Setup
```bash
cd web
npm install
npm run typecheck    # Verifies zero TypeScript errors
npm run dev          # Starts Vite dev server on http://localhost:5173
```

---

## 🌐 Dedicated Web Page Routes

| Route | Page | Description |
|---|---|---|
| `/` | **Home / Landing** | Hero showcase, quick activity stats, collegiate features, and campus calls-to-action |
| `/events` | **Campus Events** | Search by title/tags, category filter pills, capacity progress indicators, registration modals |
| `/clubs` *(or `/club`)* | **Student Clubs** | Student societies, active membership toggle with live counter updates, and meeting schedules |
| `/mentors` | **Mentor Directory** | Alumni and faculty mentors, domain filter pills, 1-on-1 office hour scheduling |
| `/dashboard` | **Student Dashboard** | Personalized student overview with digital QR ticket passes, scheduled calls, joined groups |
| `/auth` *(or `/login`)* | **Authentication** | Split-screen login & register with real-time password strength and university validation |

---

## 🔒 API Endpoints

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/health` | Service health & database connectivity check | Public |
| `POST` | `/api/auth/register` | Register new student or mentor account | Public |
| `POST` | `/api/auth/login` | Authenticate user & return signed JWT | Public |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | Private (Bearer Token) |
| `PUT` | `/api/auth/profile` | Update user department, year, bio, or interests | Private (Bearer Token) |

---

## ⚡ Task 2: Interactive Features & State Synchronization

- **Event Discovery & Filtering**: Real-time compound query search (by title, description, tags) paired with instant category filtering (*Tech, Career, Social, Sports, Arts*) and a dedicated "Reset All Filters" control.
- **Event Details Modal**: Rich pop-up modal displaying the full event schedule, format, capacity bar, attendee stats, and direct registration action.
- **Individual & Team Registration**: Dynamic form supporting both solo attendees and teams with up to 5 members, mandatory terms agreement checkbox, duplicate registration guard, and instant QR pass generation.
- **Duplicate Registration Protection**: Prevents duplicate submissions for already registered events with real-time feedback and direct ticket lookup.
- **1-on-1 Mentor Office Hour Bookings**: Interactive booking modal with time slot selection, discussion topic submission, and dynamic Google Meet link generation.
- **Student Group Membership Toggle**: Instant join/leave action updating club membership counts and badges in real-time.
- **Synchronized Student Dashboard**: Centralized student cockpit displaying active passes, scheduled mentor office hours, joined clubs, and engagement XP points.
- **State Persistence**: Full state synchronization across page reloads using typed `localStorage` stores (`campusconnect_registrations`, `campusconnect_mentor_sessions`, `campusconnect_joined_groups`).

---

## 🚀 Task 3: Refinement, Mobile Optimization & Testing

- **Registration Status Badges**: Added explicit event status indicators (`OPEN`, `FILLING_FAST`, `CLOSED`, and dynamic `REGISTERED`) with disabled registration buttons on full/closed events.
- **Interactive Empty States**: Curated empty states across search queries, category filters, and empty student dashboard sections with direct call-to-action buttons.
- **Inline Validation & Feedback**: Real-time validation checks for university email format, required student IDs, team names, and mandatory terms agreement before submission.
- **Mobile Responsive Layout**: Verified on 375px mobile viewports with collapsible touch navigation drawer, stacked bento grids, and zero horizontal scroll.
- **State Rehydration**: Fully verified persistence of passes, sessions, and memberships across hard browser reloads.

---

## 🧪 Testing Scenarios Executed

| Testing Scenario | Description | Outcome |
|---|---|---|
| **1. Search Existing vs Nonexistent Event** | Searched for existing hackathons and nonexistent query (`"Quantum Banana 9000"`). | Rendered interactive empty state with *"Clear Filters"* action button. |
| **2. Category Filter & Clear** | Filtered by *"Seminar"* category and tested reset. | Filtered instantly, surfaced *"Registration Closed"* summit badge, and restored cleanly upon reset. |
| **3. Missing Fields Validation** | Submitted event registration with empty student ID and unchecked terms agreement. | Real-time inline validation errors blocked submission and prompted correction. |
| **4. Duplicate Registration Guard** | Attempted to register for an already claimed event pass. | Modal surfaced *"Already Registered"* banner and prevented duplicate registration. |
| **5. Dashboard Synchronization** | Registered for an event pass, booked a mentor session, and joined a club. | All 3 entities updated the dashboard counters and card listings immediately. |
| **6. Browser Refresh / Rehydration** | Executed hard browser refresh on `#dashboard`. | All passes, booked office hours, and joined groups persisted and restored accurately. |
| **7. Mobile Layout Audit** | Tested all pages on 375px mobile viewport. | Verified responsive header, collapsible navigation drawer, and touch-friendly controls. |

---

## ⚠️ Known Limitations & Future Roadmap

1. **Email Dispatch**: Mentor Google Meet links and registration confirmations are currently displayed interactively in-app and saved to local state; production SMTP/SES integration can be connected for email delivery.
2. **Payment Gateway**: Paid events currently simulate free campus RSVP tickets; integration with Stripe or Razorpay can be added for paid ticket tiers.
3. **Real-time Chat**: Group discussions currently display meeting schedules; WebSocket or Firebase integration can be added for live peer messaging.