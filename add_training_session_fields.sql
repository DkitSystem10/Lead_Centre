-- =====================================================
-- ADD Category and Courses FIELDS TO training_session_applications TABLE
-- Run this in Supabase SQL Editor
-- Using lowercase column names for PostgreSQL compatibility
-- =====================================================

-- First, add category and sub_category columns if they don't exist
ALTER TABLE training_session_applications 
ADD COLUMN IF NOT EXISTS category VARCHAR(255);

ALTER TABLE training_session_applications 
ADD COLUMN IF NOT EXISTS sub_category VARCHAR(255);

-- Add category_name field (for Category display name)
ALTER TABLE training_session_applications 
ADD COLUMN IF NOT EXISTS category_name VARCHAR(255);

-- Add courses field (for Courses/Course name)
ALTER TABLE training_session_applications 
ADD COLUMN IF NOT EXISTS courses VARCHAR(255);

-- Update existing records to copy category value to category_name (if category has a value)
UPDATE training_session_applications 
SET category_name = category 
WHERE category IS NOT NULL AND category != '' AND (category_name IS NULL OR category_name = '');

-- Update existing records to copy sub_category value to courses (if sub_category has a value)
UPDATE training_session_applications 
SET courses = sub_category 
WHERE sub_category IS NOT NULL AND sub_category != '' AND (courses IS NULL OR courses = '');

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_training_session_applications_category_name ON training_session_applications(category_name);
CREATE INDEX IF NOT EXISTS idx_training_session_applications_courses ON training_session_applications(courses);

