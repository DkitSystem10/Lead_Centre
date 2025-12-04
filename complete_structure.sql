-- =====================================================
-- COMPLETE DATABASE STRUCTURE FOR LEAD CENTRE
-- Run this ENTIRE file in Supabase SQL Editor
-- This creates all tables and disables RLS
-- =====================================================

-- =====================================================
-- 1. VENDOR APPLICATIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS vendor_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    vendor_name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    company_address TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    appointment_status VARCHAR(10) NOT NULL CHECK (appointment_status IN ('yes', 'no')),
    business_type VARCHAR(50) NOT NULL CHECK (business_type IN ('supplier', 'distributor', 'service-provider', 'manufacturer', 'others')),
    upload_file_url TEXT,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_vendor_applications_email ON vendor_applications(email);
CREATE INDEX IF NOT EXISTS idx_vendor_applications_date ON vendor_applications(date);

-- =====================================================
-- 2. B2B APPLICATIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS b2b_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    contact_person_name VARCHAR(255) NOT NULL,
    organization_name VARCHAR(255) NOT NULL,
    organization_address TEXT NOT NULL,
    business_type VARCHAR(50) NOT NULL CHECK (business_type IN ('technology', 'manufacturing', 'retail', 'services', 'consulting', 'others')),
    mode_of_business VARCHAR(50) NOT NULL CHECK (mode_of_business IN ('freelancer', 'partnership', 'co-worker', 'consultant', 'others')),
    company_website_email VARCHAR(255) NOT NULL,
    upload_file_url TEXT,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_b2b_applications_org_name ON b2b_applications(organization_name);
CREATE INDEX IF NOT EXISTS idx_b2b_applications_date ON b2b_applications(date);

-- =====================================================
-- 3. JOB SEEKER APPLICATIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS job_seeker_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    gender VARCHAR(20) NOT NULL CHECK (gender IN ('male', 'female', 'other', 'prefer-not-to-say')),
    dob DATE NOT NULL,
    age INTEGER NOT NULL CHECK (age > 0 AND age <= 120),
    address TEXT NOT NULL,
    blood_group VARCHAR(10) NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    qualification VARCHAR(20) NOT NULL CHECK (qualification IN ('10th', '12th', 'diploma', 'ug', 'pg', 'phd')),
    department VARCHAR(50) NOT NULL CHECK (department IN ('hr', 'it', 'marketing', 'finance', 'sales', 'production', 'others')),
    years_of_experience VARCHAR(20) NOT NULL CHECK (years_of_experience IN ('fresher', '1-2', '3-5', '5+')),
    preferred_job_type VARCHAR(20) NOT NULL CHECK (preferred_job_type IN ('full-time', 'part-time', 'hybrid', 'remote')),
    upload_resume_url TEXT,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_job_seeker_applications_email ON job_seeker_applications(email);
CREATE INDEX IF NOT EXISTS idx_job_seeker_applications_department ON job_seeker_applications(department);
CREATE INDEX IF NOT EXISTS idx_job_seeker_applications_date ON job_seeker_applications(date);

-- =====================================================
-- 4. STUDENT INTERNSHIP APPLICATIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS student_internship_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    registration_number VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    blood_group VARCHAR(10) NOT NULL,
    dob DATE NOT NULL,
    age INTEGER NOT NULL CHECK (age > 0 AND age <= 120),
    gender VARCHAR(20) NOT NULL CHECK (gender IN ('male', 'female', 'other', 'prefer-not-to-say')),
    college_institution_name VARCHAR(255) NOT NULL,
    course_type VARCHAR(20) NOT NULL CHECK (course_type IN ('ug', 'pg', 'certification')),
    department VARCHAR(50) NOT NULL CHECK (department IN ('computer-science', 'electrical', 'mechanical', 'civil', 'electronics', 'business', 'others')),
    internship_domain VARCHAR(20) NOT NULL CHECK (internship_domain IN ('it', 'non-it', 'others')),
    duration VARCHAR(20) NOT NULL CHECK (duration IN ('3-months', '6-months')),
    upload_file_url TEXT,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_student_internship_applications_email ON student_internship_applications(email);
CREATE INDEX IF NOT EXISTS idx_student_internship_applications_reg_no ON student_internship_applications(registration_number);
CREATE INDEX IF NOT EXISTS idx_student_internship_applications_date ON student_internship_applications(date);

-- =====================================================
-- 5. CAREER GUIDANCE APPLICATIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS career_guidance_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    student_name VARCHAR(255) NOT NULL,
    standard_year VARCHAR(20) NOT NULL CHECK (standard_year IN ('9th', '10th', '11th', '12th', '1st-year', '2nd-year', '3rd-year', '4th-year', 'graduate')),
    date_of_birth DATE NOT NULL,
    age INTEGER NOT NULL CHECK (age > 0 AND age <= 100),
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('male', 'female', 'other')),
    location VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    parent_guardian_name VARCHAR(255) NOT NULL,
    studies_preference VARCHAR(50) NOT NULL CHECK (studies_preference IN ('science', 'commerce', 'arts', 'engineering', 'medical', 'law', 'business', 'others')),
    abroad_local VARCHAR(10) NOT NULL CHECK (abroad_local IN ('local', 'abroad')),
    preferred_country VARCHAR(255),
    city_if_abroad VARCHAR(255),
    preferred_university VARCHAR(255),
    career_interest VARCHAR(255),
    skills_strengths TEXT,
    academic_performance VARCHAR(255),
    hobbies_extracurricular TEXT,
    preferred_mode_of_study VARCHAR(20) NOT NULL CHECK (preferred_mode_of_study IN ('online', 'offline', 'hybrid')),
    career_support_duration VARCHAR(20) NOT NULL CHECK (career_support_duration IN ('1-year', '2-years', '5-years', '15-years')),
    mentorship_required VARCHAR(5) NOT NULL CHECK (mentorship_required IN ('yes', 'no')),
    remarks_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_career_guidance_applications_email ON career_guidance_applications(email);
CREATE INDEX IF NOT EXISTS idx_career_guidance_applications_student_name ON career_guidance_applications(student_name);
CREATE INDEX IF NOT EXISTS idx_career_guidance_applications_date ON career_guidance_applications(date);

-- =====================================================
-- 6. TRAINING SESSION APPLICATIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS training_session_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    trainer_name VARCHAR(255) NOT NULL,
    topic VARCHAR(255) NOT NULL,
    student_reg_no VARCHAR(100) NOT NULL,
    participant_name VARCHAR(255) NOT NULL,
    gender VARCHAR(20) NOT NULL CHECK (gender IN ('male', 'female', 'other', 'prefer-not-to-say')),
    email VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    assessment JSONB,
    feedback TEXT,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_training_session_applications_email ON training_session_applications(email);
CREATE INDEX IF NOT EXISTS idx_training_session_applications_student_reg_no ON training_session_applications(student_reg_no);
CREATE INDEX IF NOT EXISTS idx_training_session_applications_date ON training_session_applications(date);
CREATE INDEX IF NOT EXISTS idx_training_session_applications_topic ON training_session_applications(topic);

-- =====================================================
-- TRIGGERS FOR UPDATED_AT TIMESTAMP
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables
DROP TRIGGER IF EXISTS update_vendor_applications_updated_at ON vendor_applications;
CREATE TRIGGER update_vendor_applications_updated_at
    BEFORE UPDATE ON vendor_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_b2b_applications_updated_at ON b2b_applications;
CREATE TRIGGER update_b2b_applications_updated_at
    BEFORE UPDATE ON b2b_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_job_seeker_applications_updated_at ON job_seeker_applications;
CREATE TRIGGER update_job_seeker_applications_updated_at
    BEFORE UPDATE ON job_seeker_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_student_internship_applications_updated_at ON student_internship_applications;
CREATE TRIGGER update_student_internship_applications_updated_at
    BEFORE UPDATE ON student_internship_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_career_guidance_applications_updated_at ON career_guidance_applications;
CREATE TRIGGER update_career_guidance_applications_updated_at
    BEFORE UPDATE ON career_guidance_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_training_session_applications_updated_at ON training_session_applications;
CREATE TRIGGER update_training_session_applications_updated_at
    BEFORE UPDATE ON training_session_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- DISABLE ROW LEVEL SECURITY (RLS)
-- This allows forms to submit data without RLS errors
-- =====================================================
ALTER TABLE vendor_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE b2b_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE job_seeker_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE student_internship_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE career_guidance_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE training_session_applications DISABLE ROW LEVEL SECURITY;

-- =====================================================
-- VERIFICATION - Check that everything was created
-- =====================================================
SELECT 
    'Tables Created' as check_type,
    tablename,
    CASE WHEN rowsecurity THEN 'RLS Enabled' ELSE 'RLS Disabled ✅' END as rls_status
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename LIKE '%applications%'
ORDER BY tablename;

-- You should see 6 tables, all with "RLS Disabled ✅"
-- =====================================================
-- COMPLETE! All tables created and RLS disabled.
-- Your forms should work now!
-- =====================================================

