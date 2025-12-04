# Supabase Setup Guide

This guide will help you set up Supabase for the Lead Centre application.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. A Supabase project created

## Step 1: Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Get your Supabase credentials:
   - Go to your Supabase project dashboard
   - Navigate to **Settings** → **API**
   - Copy the following:
     - **Project URL** → `VITE_SUPABASE_URL`
     - **anon/public key** → `VITE_SUPABASE_ANON_KEY`

3. Update your `.env` file with these values

## Step 2: Database Setup

1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Copy and paste the entire contents of `database_schema.sql`
4. Click **Run** to execute the SQL script
5. This will create all 6 tables with proper structure

## Step 3: Storage Bucket Setup

You need to create a storage bucket for file uploads:

1. Go to **Storage** in your Supabase dashboard
2. Click **New bucket**
3. Create a bucket named: `applications`
4. Set it to **Public bucket** (so uploaded files can be accessed)
5. Click **Create bucket**

### Storage Folder Structure

The application will automatically organize files in the following folders:
- `applications/vendor/` - Vendor application files
- `applications/b2b/` - B2B application files
- `applications/job-seekers/` - Job seeker resumes
- `applications/student-internship/` - Student internship files

## Step 4: Row Level Security (RLS) Policies ⚠️ REQUIRED

**IMPORTANT:** Without these policies, you will get a 401 Unauthorized error when submitting forms!

By default, RLS is enabled on all tables. You need to configure policies to allow form submissions.

### Quick Setup (Recommended)

1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Copy and paste the entire contents of `database_rls_policies.sql`
4. Click **Run** to execute

This will create all necessary policies to allow:
- Anonymous users to insert form data (for public form submissions)
- Public file uploads to the storage bucket
- Public access to uploaded files

### Manual Setup (Alternative)

If you prefer to set up policies manually, you can use the SQL from `database_rls_policies.sql` or run individual policies:

```sql
-- Allow anonymous users to insert (for form submissions)
CREATE POLICY "Allow public insert on vendor_applications"
    ON vendor_applications
    FOR INSERT
    TO anon
    WITH CHECK (true);
```

(Repeat for all 6 tables)

### Option 2: Allow Authenticated Users Only

If you want only authenticated users to submit forms:

```sql
CREATE POLICY "Allow authenticated insert" ON vendor_applications
    FOR INSERT
    TO authenticated
    WITH CHECK (true);
```

(Repeat for all tables)

## Step 5: Test the Application

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Fill out a form and submit it
3. Check your Supabase dashboard:
   - **Table Editor** → Verify data was inserted
   - **Storage** → Verify files were uploaded (if applicable)

## Troubleshooting

### Error: "Missing Supabase environment variables"
- Make sure your `.env` file exists and contains `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Restart your development server after adding environment variables

### Error: "new row violates row-level security policy"
- You need to set up RLS policies (see Step 4)
- Make sure the policies allow inserts for the user type you're using

### Error: "The resource already exists"
- The table or bucket already exists
- This is fine, you can skip that step

### File Upload Errors
- Make sure the `applications` bucket exists in Storage
- Verify the bucket is set to **Public**
- Check that storage policies are set up correctly

## Database Tables Created

1. `vendor_applications` - Vendor form submissions
2. `b2b_applications` - B2B form submissions
3. `job_seeker_applications` - Job seeker form submissions
4. `student_internship_applications` - Student internship form submissions
5. `career_guidance_applications` - Career guidance form submissions
6. `training_session_applications` - Training session form submissions

All tables include:
- UUID primary keys
- Automatic timestamps (`created_at`, `updated_at`)
- Proper data types and constraints
- Indexes for performance

## Next Steps

- Configure additional RLS policies for reading/updating data
- Set up email notifications for new submissions (using Supabase Edge Functions)
- Create a dashboard to view submissions
- Add data export functionality

