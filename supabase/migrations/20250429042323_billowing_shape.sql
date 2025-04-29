/*
  # Add Missing Profile Fields

  1. Changes
    - Add new columns to profiles table:
      - `phone` (text) - User's phone number
      - `company_name` (text) - User's company name

  2. Security
    - Update RLS policies to allow users to update their own profile fields
*/

-- Add new columns to profiles table
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS phone text,
  ADD COLUMN IF NOT EXISTS company_name text;

-- Update RLS policies to include new fields
CREATE POLICY "Users can update own profile fields including phone and company"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);