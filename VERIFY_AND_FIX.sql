-- =====================================================
-- COMPLETE FIX - Run this ENTIRE file
-- This will disable RLS and verify everything
-- =====================================================

-- Step 1: Check current RLS status
SELECT 
    tablename,
    CASE WHEN rowsecurity THEN 'ENABLED (needs fixing)' ELSE 'DISABLED (OK)' END as current_status
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename LIKE '%applications%'
ORDER BY tablename;

-- Step 2: Disable RLS on ALL tables
ALTER TABLE vendor_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE b2b_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE job_seeker_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE student_internship_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE career_guidance_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE training_session_applications DISABLE ROW LEVEL SECURITY;

-- Step 3: Verify RLS is now disabled
SELECT 
    tablename,
    CASE WHEN rowsecurity THEN 'STILL ENABLED ❌' ELSE 'DISABLED ✅' END as status_after_fix
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename LIKE '%applications%'
ORDER BY tablename;

-- All should show "DISABLED ✅"
-- If you see "STILL ENABLED ❌", there's a permission issue

-- Step 4: Verify tables exist and are accessible
SELECT 
    'Table exists' as check_item,
    tablename,
    'OK' as status
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
    'vendor_applications',
    'b2b_applications',
    'job_seeker_applications',
    'student_internship_applications',
    'career_guidance_applications',
    'training_session_applications'
)
ORDER BY tablename;

-- You should see 6 rows - one for each table
-- =====================================================

