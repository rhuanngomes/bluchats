/*
  # Add Company Name Field

  1. Changes
    - Add company_name column to profiles table
    - Update handle_new_user function to store company name
*/

-- Add company_name column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS company_name text;

-- Update handle_new_user function to include company_name
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    username,
    status,
    company_name
  )
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    LOWER(SPLIT_PART(NEW.email, '@', 1)),
    'online',
    NEW.raw_user_meta_data->>'company_name'
  );
  RETURN NEW;
END;
$$;