-- =====================================================
-- ADD categoryname FIELD TO APPLICATION TABLES
-- Run this in Supabase SQL Editor
-- =====================================================

-- First, add category column if it doesn't exist (for tables that might not have it)
ALTER TABLE vendor_applications 
ADD COLUMN IF NOT EXISTS category VARCHAR(255);

ALTER TABLE job_seeker_applications 
ADD COLUMN IF NOT EXISTS category VARCHAR(255);

ALTER TABLE student_internship_applications 
ADD COLUMN IF NOT EXISTS category VARCHAR(255);

ALTER TABLE career_guidance_applications 
ADD COLUMN IF NOT EXISTS category VARCHAR(255);

-- Add categoryname field to vendor_applications table
ALTER TABLE vendor_applications 
ADD COLUMN IF NOT EXISTS categoryname VARCHAR(255);

-- Add categoryname field to job_seeker_applications table
ALTER TABLE job_seeker_applications 
ADD COLUMN IF NOT EXISTS categoryname VARCHAR(255);

-- Add categoryname field to student_internship_applications table
ALTER TABLE student_internship_applications 
ADD COLUMN IF NOT EXISTS categoryname VARCHAR(255);

-- Add categoryname field to career_guidance_applications table
ALTER TABLE career_guidance_applications 
ADD COLUMN IF NOT EXISTS categoryname VARCHAR(255);

-- Update existing records to copy category value to categoryname (only if category has a value)
UPDATE vendor_applications 
SET categoryname = category 
WHERE category IS NOT NULL AND category != '' AND (categoryname IS NULL OR categoryname = '');

UPDATE job_seeker_applications 
SET categoryname = category 
WHERE category IS NOT NULL AND category != '' AND (categoryname IS NULL OR categoryname = '');

UPDATE student_internship_applications 
SET categoryname = category 
WHERE category IS NOT NULL AND category != '' AND (categoryname IS NULL OR categoryname = '');

UPDATE career_guidance_applications 
SET categoryname = category 
WHERE category IS NOT NULL AND category != '' AND (categoryname IS NULL OR categoryname = '');

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_vendor_applications_categoryname ON vendor_applications(categoryname);
CREATE INDEX IF NOT EXISTS idx_job_seeker_applications_categoryname ON job_seeker_applications(categoryname);
CREATE INDEX IF NOT EXISTS idx_student_internship_applications_categoryname ON student_internship_applications(categoryname);
CREATE INDEX IF NOT EXISTS idx_career_guidance_applications_categoryname ON career_guidance_applications(categoryname);

