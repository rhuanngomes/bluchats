/*
  # Fix User Registration Flow

  1. Changes
    - Consolidate and fix user creation handling
    - Ensure proper profile creation
    - Add missing fields to profiles table
    - Update handle_new_user function
    - Fix email confirmation handling

  2. Security
    - Maintain existing RLS policies
    - Ensure proper access control
*/

-- Drop existing problematic function
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Recreate handle_new_user function with proper error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Create profile with all necessary fields
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    username,
    role,
    status,
    company_name,
    requires_password_change
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'Básico'),
    'active',
    NEW.raw_user_meta_data->>'company_name',
    COALESCE((NEW.raw_user_meta_data->>'requires_password_change')::boolean, false)
  );

  -- Create users table entry
  INSERT INTO public.users (id)
  VALUES (NEW.id);

  -- Set email as confirmed
  NEW.email_confirmed_at = COALESCE(NEW.email_confirmed_at, now());
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Ensure all existing users have confirmed emails
UPDATE auth.users 
SET email_confirmed_at = COALESCE(email_confirmed_at, now()) 
WHERE email_confirmed_at IS NULL;

-- Add any missing columns to profiles table
DO $$ 
BEGIN
  ALTER TABLE public.profiles 
    ADD COLUMN IF NOT EXISTS username text,
    ADD COLUMN IF NOT EXISTS full_name text,
    ADD COLUMN IF NOT EXISTS company_name text,
    ADD COLUMN IF NOT EXISTS requires_password_change boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS last_login timestamptz;
EXCEPTION
  WHEN duplicate_column THEN NULL;
END $$;

-- Create missing indexes
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_company ON profiles(company_name);

-- Ensure proper RLS policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Recreate core policies
CREATE POLICY IF NOT EXISTS "Users can read own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);