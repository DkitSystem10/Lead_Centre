# Quick Fix Guide - RLS Errors and Form Submission Issues

## 🔴 IMMEDIATE FIX (Do This First!)

### Step 1: Run the Fixed RLS Policies SQL

1. Open your Supabase Dashboard
2. Go to **SQL Editor**
3. Copy **ALL** contents from `database_rls_policies_fixed.sql`
4. Paste and click **Run**

This will:
- Drop any conflicting policies
- Create new policies that allow form submissions
- Set up storage policies for file uploads

### Step 2: Verify Tables Exist

Run this in SQL Editor to check:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'vendor_applications',
  'b2b_applications', 
  'job_seeker_applications',
  'student_internship_applications',
  'career_guidance_applications',
  'training_session_applications'
);
```

If any tables are missing, run `database_schema.sql` first.

### Step 3: Create Storage Bucket (If Not Done)

1. Go to **Storage** in Supabase Dashboard
2. Click **New bucket**
3. Name: `applications`
4. Make it **Public**
5. Click **Create**

### Step 4: Test a Form

Try submitting any form. It should work now!

## ✅ What Was Fixed

1. **Better Error Handling**: Forms now show clear error messages
2. **File Uploads Optional**: Forms work even if file upload fails
3. **RLS Policies**: Fixed policies that drop conflicts first
4. **Better Error Messages**: You'll see exactly what went wrong

## 🐛 Common Issues & Solutions

### Issue: "401 Unauthorized"
**Solution**: Run `database_rls_policies_fixed.sql` in SQL Editor

### Issue: "Table doesn't exist"
**Solution**: Run `database_schema.sql` in SQL Editor first

### Issue: "Bucket not found"
**Solution**: Create the `applications` bucket in Storage (Step 3 above)

### Issue: "new row violates row-level security policy"
**Solution**: Run `database_rls_policies_fixed.sql` - it drops old policies first

## 📝 Verification

After running the SQL, verify policies exist:

```sql
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename LIKE '%applications%';
```

You should see 6 policies (one for each table).

## 🎯 Next Steps

1. ✅ Run `database_rls_policies_fixed.sql`
2. ✅ Create storage bucket `applications`
3. ✅ Test form submission
4. ✅ Check data in Table Editor

All forms should work now! 🎉

