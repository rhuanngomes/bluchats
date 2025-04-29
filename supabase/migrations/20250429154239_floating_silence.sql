/*
  # Disable Email Confirmation Requirement
  
  1. Changes
    - Mark existing users as email confirmed
    - Set default email_confirmed_at for new users
    - Configure auth settings to skip email confirmation
*/

-- Update existing users to be confirmed
UPDATE auth.users
SET email_confirmed_at = COALESCE(email_confirmed_at, now())
WHERE email_confirmed_at IS NULL;

-- Set default for new users
ALTER TABLE auth.users
ALTER COLUMN email_confirmed_at
SET DEFAULT now();

-- Configure auth settings via Supabase auth schema
ALTER TABLE auth.users
SET SCHEMA auth;

SECURITY LABEL FOR pgsodium
ON SCHEMA auth
IS 'SECURITY INVOKER=auth
ENABLE_SIGNUP_EMAIL=false';