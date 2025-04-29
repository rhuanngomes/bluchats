/*
  # Add Additional Profile Fields

  1. Changes
    - Add new columns to profiles table:
      - `phone` (text) - User's phone number
      - `status` (text) - User's current status
      - `company_name` (text) - User's company name
      - `role` (text) - User's role in the company

  2. Security
    - Existing RLS policies will automatically apply to new columns
*/

-- Add new columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS status text DEFAULT 'online',
ADD COLUMN IF NOT EXISTS company_name text,
ADD COLUMN IF NOT EXISTS role text;