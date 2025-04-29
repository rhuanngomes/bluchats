/*
  # Disable Email Confirmation Requirement
  
  1. Changes
    - Mark existing users as confirmed via email_confirmed_at
    - Disable email confirmation requirement in auth settings
    - Set default confirmed status for new users
*/

-- Update auth.users to mark all existing users as confirmed
UPDATE auth.users
SET email_confirmed_at = COALESCE(email_confirmed_at, now())
WHERE email_confirmed_at IS NULL;

-- Modify auth settings to disable email confirmation requirement
UPDATE auth.config
SET value = jsonb_set(
  value,
  '{mailer, enable_signup_email}',
  'false'::jsonb
);

-- Set default confirmed status for new users
ALTER TABLE auth.users
ALTER COLUMN email_confirmed_at
SET DEFAULT now();