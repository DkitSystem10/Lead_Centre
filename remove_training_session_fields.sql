-- =====================================================
-- REMOVE courses and category_name FIELDS FROM training_session_applications TABLE
-- Run this in Supabase SQL Editor
-- =====================================================

-- Drop courses column if it exists
ALTER TABLE training_session_applications 
DROP COLUMN IF EXISTS courses;

-- Drop category_name column if it exists
ALTER TABLE training_session_applications 
DROP COLUMN IF EXISTS category_name;

-- Drop indexes if they exist
DROP INDEX IF EXISTS idx_training_session_applications_category_name;
DROP INDEX IF EXISTS idx_training_session_applications_courses;

