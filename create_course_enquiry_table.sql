-- =====================================================
-- CREATE course_enquiry_registrations TABLE
-- Run this in Supabase SQL Editor
-- This replaces the training_session_applications table
-- =====================================================

-- Drop the old training_session_applications table if it exists
DROP TABLE IF EXISTS training_session_applications CASCADE;

-- Create new course_enquiry_registrations table
CREATE TABLE course_enquiry_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    category VARCHAR(255) NOT NULL,
    sub_category VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    date_of_birth DATE NOT NULL,
    age INTEGER NOT NULL,
    address TEXT NOT NULL,
    course_enquiry TEXT NOT NULL,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_course_enquiry_registrations_email ON course_enquiry_registrations(email);
CREATE INDEX idx_course_enquiry_registrations_phone_number ON course_enquiry_registrations(phone_number);
CREATE INDEX idx_course_enquiry_registrations_category ON course_enquiry_registrations(category);
CREATE INDEX idx_course_enquiry_registrations_sub_category ON course_enquiry_registrations(sub_category);
CREATE INDEX idx_course_enquiry_registrations_date ON course_enquiry_registrations(date);
CREATE INDEX idx_course_enquiry_registrations_date_of_birth ON course_enquiry_registrations(date_of_birth);

-- Trigger for updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_course_enquiry_registrations_updated_at ON course_enquiry_registrations;
CREATE TRIGGER update_course_enquiry_registrations_updated_at
    BEFORE UPDATE ON course_enquiry_registrations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies
ALTER TABLE course_enquiry_registrations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert (for public form submissions)
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON course_enquiry_registrations;
CREATE POLICY "Enable insert for anonymous users" ON course_enquiry_registrations
FOR INSERT TO anon
WITH CHECK (true);

-- Allow authenticated users to read
DROP POLICY IF EXISTS "Enable read for authenticated users" ON course_enquiry_registrations;
CREATE POLICY "Enable read for authenticated users" ON course_enquiry_registrations
FOR SELECT TO authenticated
USING (true);

-- Allow authenticated users to insert
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON course_enquiry_registrations;
CREATE POLICY "Enable insert for authenticated users" ON course_enquiry_registrations
FOR INSERT TO authenticated
WITH CHECK (true);

