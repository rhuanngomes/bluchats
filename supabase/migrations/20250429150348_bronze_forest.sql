/*
  # Enhanced User Management

  1. New Types
    - user_role enum: Básico, Admin, Gerente
    - user_status enum: active, inactive, restricted
  
  2. Profile Enhancements
    - Added role and status columns
    - Added last_login tracking
    - Added password change requirement flag
  
  3. Security
    - Added admin check function
    - Updated RLS policies
    - Enhanced user creation handling
*/

-- Create role enum
CREATE TYPE user_role AS ENUM ('Básico', 'Admin', 'Gerente');

-- Create status enum
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'restricted');

-- Add new columns to profiles table
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'Básico',
  ADD COLUMN IF NOT EXISTS status user_status DEFAULT 'active',
  ADD COLUMN IF NOT EXISTS last_login timestamptz,
  ADD COLUMN IF NOT EXISTS requires_password_change boolean DEFAULT false;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'Admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    username,
    role,
    status,
    phone,
    requires_password_change
  )
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'username',
    (NEW.raw_user_meta_data->>'role')::user_role,
    COALESCE((NEW.raw_user_meta_data->>'status')::user_status, 'active'),
    NEW.raw_user_meta_data->>'phone',
    COALESCE((NEW.raw_user_meta_data->>'requires_password_change')::boolean, false)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update last login
CREATE OR REPLACE FUNCTION update_last_login()
RETURNS trigger AS $$
BEGIN
  UPDATE profiles
  SET last_login = now()
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for last login update
CREATE TRIGGER on_auth_sign_in
  AFTER INSERT ON auth.sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_last_login();

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "New users can create their profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile fields" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile fields including phone and company" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;

-- Update RLS policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow admins to manage all profiles
CREATE POLICY "Admins can manage all profiles"
  ON public.profiles
  FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Allow users to view their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON profiles(status);
CREATE INDEX IF NOT EXISTS idx_profiles_last_login ON profiles(last_login DESC);