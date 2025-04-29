/*
  # Add Profile Fields

  1. Changes
    - Add new columns to profiles table:
      - `username` (text) - User's username
      - `role` (text) - User's role/position
      - `bio` (text) - User's biography
      - `status` (text) - User's current status (online, busy, offline)

  2. Security
    - Update RLS policies to allow users to update their own profile fields
*/

-- Add new columns to profiles table
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS username text,
  ADD COLUMN IF NOT EXISTS role text,
  ADD COLUMN IF NOT EXISTS bio text,
  ADD COLUMN IF NOT EXISTS status text DEFAULT 'online';

-- Create unique index for username
CREATE UNIQUE INDEX IF NOT EXISTS profiles_username_key ON public.profiles (username);

-- Update RLS policies to include new fields
CREATE POLICY "Users can update own profile fields"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Function to handle username generation on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    username,
    status
  )
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    LOWER(SPLIT_PART(new.email, '@', 1)), -- Generate username from email
    'online'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;