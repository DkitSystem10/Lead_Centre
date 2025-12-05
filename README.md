# Lead Centre

A modern lead management platform built with React.js and Tailwind CSS.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Router
- **Build Tool**: Vite
- **Backend**: Node.js (Express.js) - *Coming in Phase 4*
- **Database**: Supabase - *Coming in Phase 4*

## Project Structure

```
Lead_Centre/
├── src/
│   ├── components/      # Reusable components
│   │   ├── Card.jsx
│   │   ├── FileUpload.jsx
│   │   ├── FormInput.jsx
│   │   ├── FormSelect.jsx
│   │   ├── FormTextarea.jsx
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   └── SuccessPage.jsx
│   ├── pages/          # Page components
│   │   ├── LandingPage.jsx
│   │   ├── VendorPage.jsx
│   │   ├── B2BPage.jsx
│   │   ├── JobSeekerPage.jsx
│   │   ├── StudentInternshipPage.jsx
│   │   ├── TrainingSessionPage.jsx
│   │   ├── CareerGuidancePage.jsx
│   │   └── SuccessPage.jsx
│   ├── routes/         # Route configuration
│   ├── assets/         # Static assets
│   ├── utils/          # Utility functions
│   │   └── validation.js
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles with Tailwind
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Environment Variables Setup

Before running the application, you need to set up Supabase environment variables.

### For Local Development

1. Create a `.env` file in the root directory:
   ```bash
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. Get your Supabase credentials from your Supabase project dashboard:
   - Go to **Settings** → **API**
   - Copy **Project URL** → `VITE_SUPABASE_URL`
   - Copy **anon/public key** → `VITE_SUPABASE_ANON_KEY`

### For Vercel Deployment

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:
   - `VITE_SUPABASE_URL` = `https://your-project-id.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `your-anon-key-here`
4. Select **Production**, **Preview**, and **Development** environments
5. Click **Save** and **Redeploy**

See `VERCEL_DEPLOYMENT.md` for detailed instructions.

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Features

### Phase 1 ✅
- React project setup with Vite
- Tailwind CSS configuration
- Project folder structure
- React Router setup
- Reusable components (Navbar, Card, Layout)

### Phase 2 ✅
- Responsive Landing Page
- 6 category cards (Vendor, B2B, Job Seekers, Student Internship, Training Session, Career Guidance)
- Grid layout (2 columns mobile, 3 columns desktop)
- Hover animations and transitions
- Route placeholders for all categories

### Phase 3 ✅
- **Reusable Form Components**: FormInput, FormSelect, FormTextarea, FileUpload
- **Validation Utilities**: Email, phone, required field validation
- **6 Complete Application Forms**:
  1. **Vendor Form**: Date, Vendor Name, Company details, Email, Phone, Appointment Status, Business Type, File Upload, Remarks
  2. **B2B Form**: Contact Person, Organization details, Business Type, Mode of Business, Website/Email, File Upload, Remarks
  3. **Job Seeker Form**: Personal info, Gender, DOB, Qualification, Department, Experience, Job Type, Resume Upload, Remarks
  4. **Student Internship Form**: Student details, Registration Number, College, Course Type, Department, Internship Domain, Duration, File Upload, Remarks
  5. **Training Session Form**: Trainer info, Topic, Participant details, Assessment (Q/A Shuffle Model), Feedback, Remarks
  6. **Career Guidance Form**: Student info, Studies Preference, Abroad/Local options, Career Interest, Skills, Academic Performance, Hobbies, Study Mode, Support Duration, Mentorship
- **Form Features**:
  - Complete field validation
  - Loading animation on submit
  - Success confirmation page
  - Responsive design
  - Error handling and display

## Routes

- `/` - Landing Page
- `/vendor` - Vendor Application Form
- `/b2b` - B2B Application Form
- `/jobseeker` - Job Seekers Application Form
- `/student-internship` - Student Internship Application Form
- `/training-session` - Training Session Application Form
- `/career-guidance` - Career Guidance Application Form
- `/success` - Success Confirmation Page

## Development

The project uses Vite for fast development and builds. The development server runs on `http://localhost:5173` by default.

## License

MIT
