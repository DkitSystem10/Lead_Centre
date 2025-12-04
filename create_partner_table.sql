-- =====================================================
-- CREATE PARTNER TABLE
-- Run this in Supabase SQL Editor
-- Based on Partners form frontend analysis
-- =====================================================

CREATE TABLE IF NOT EXISTS partner (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    category VARCHAR(255) NOT NULL,
    categoryname VARCHAR(255),
    contact_person_name VARCHAR(255) NOT NULL,
    organization_name VARCHAR(255) NOT NULL,
    organization_address TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    upload_file_url TEXT,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_partner_email ON partner(email);
CREATE INDEX IF NOT EXISTS idx_partner_organization_name ON partner(organization_name);
CREATE INDEX IF NOT EXISTS idx_partner_date ON partner(date);
CREATE INDEX IF NOT EXISTS idx_partner_category ON partner(category);
CREATE INDEX IF NOT EXISTS idx_partner_categoryname ON partner(categoryname);

-- Create function for updated_at timestamp if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at timestamp
DROP TRIGGER IF EXISTS update_partner_updated_at ON partner;
CREATE TRIGGER update_partner_updated_at
    BEFORE UPDATE ON partner
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Disable RLS (Row Level Security) for easier access
-- If you need RLS, you can enable it later with appropriate policies
ALTER TABLE partner ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust as needed for your security requirements)
DROP POLICY IF EXISTS "Allow all operations on partner" ON partner;
CREATE POLICY "Allow all operations on partner" ON partner
    FOR ALL
    USING (true)
    WITH CHECK (true);

