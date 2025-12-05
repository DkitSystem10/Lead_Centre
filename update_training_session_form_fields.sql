-- =====================================================
-- UPDATE training_session_applications TABLE FOR NEW FORM FIELDS
-- Run this in Supabase SQL Editor
-- =====================================================

-- Add new columns for the updated form structure
ALTER TABLE training_session_applications
ADD COLUMN IF NOT EXISTS name VARCHAR(255);

ALTER TABLE training_session_applications
ADD COLUMN IF NOT EXISTS phone_number VARCHAR(20);

ALTER TABLE training_session_applications
ADD COLUMN IF NOT EXISTS date_of_birth DATE;

ALTER TABLE training_session_applications
ADD COLUMN IF NOT EXISTS age INTEGER;

ALTER TABLE training_session_applications
ADD COLUMN IF NOT EXISTS course_enquiry TEXT;

-- Keep existing columns for backward compatibility (they can be nullable now)
-- Make old columns nullable since they're no longer required
ALTER TABLE training_session_applications
ALTER COLUMN trainer_name DROP NOT NULL;

ALTER TABLE training_session_applications
ALTER COLUMN topic DROP NOT NULL;

ALTER TABLE training_session_applications
ALTER COLUMN student_reg_no DROP NOT NULL;

ALTER TABLE training_session_applications
ALTER COLUMN participant_name DROP NOT NULL;

ALTER TABLE training_session_applications
ALTER COLUMN gender DROP NOT NULL;

-- Add indexes for new columns
CREATE INDEX IF NOT EXISTS idx_training_session_applications_name ON training_session_applications(name);
CREATE INDEX IF NOT EXISTS idx_training_session_applications_phone_number ON training_session_applications(phone_number);
CREATE INDEX IF NOT EXISTS idx_training_session_applications_date_of_birth ON training_session_applications(date_of_birth);
CREATE INDEX IF NOT EXISTS idx_training_session_applications_age ON training_session_applications(age);
CREATE INDEX IF NOT EXISTS idx_training_session_applications_course_enquiry ON training_session_applications(course_enquiry);

