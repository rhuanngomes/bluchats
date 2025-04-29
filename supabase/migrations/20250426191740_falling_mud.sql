/*
  # Add Username Field to Registration

  1. Changes
    - Update handle_new_user function to use provided username instead of generating from email
*/

-- Update handle_new_user function to use provided username
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
    NEW.raw_user_meta_data->>'username',
    'online',
    NEW.raw_user_meta_data->>'company_name'
  );
  RETURN NEW;
END;
$$;