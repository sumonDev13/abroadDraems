-- Remove non-student visa programs
DELETE FROM visa_programs WHERE category != 'student_masters';

-- Add subcategory column for future use
ALTER TABLE visa_programs ADD COLUMN IF NOT EXISTS subcategory TEXT DEFAULT 'masters';
UPDATE visa_programs SET subcategory = 'masters';
