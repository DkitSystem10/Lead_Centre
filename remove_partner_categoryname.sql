-- =====================================================
-- REMOVE categoryname FIELD FROM partner TABLE
-- Run this in Supabase SQL Editor
-- =====================================================

-- Drop categoryname column if it exists
ALTER TABLE partner 
DROP COLUMN IF EXISTS categoryname;

-- Drop index if it exists
DROP INDEX IF EXISTS idx_partner_categoryname;

